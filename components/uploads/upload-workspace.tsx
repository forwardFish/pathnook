'use client';

import { ChangeEvent, DragEvent, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PDFDocument } from 'pdf-lib';
import { AlertCircle, FileUp, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { uploadSourceTypeOptions } from '@/lib/family/options';
import type { PageQualityFlags } from '@/lib/family/types';

type DraftPage = {
  pageNumber: number;
  previewLabel: string;
  qualityFlags: PageQualityFlags;
  previewUrl: string | null;
};

type DraftFile = {
  id: string;
  file: File;
  previewKind: 'image' | 'pdf';
  pageCount: number;
  pages: DraftPage[];
};

type Props = {
  childId: number;
  childNickname: string;
};

function buildFileId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`;
}

async function analyzeImageQuality(previewUrl: string) {
  const image = new Image();
  image.src = previewUrl;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement('canvas');
  const sampleWidth = 180;
  const sampleHeight = Math.max(1, Math.round((image.height / image.width) * sampleWidth));
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const context = canvas.getContext('2d');

  if (!context) {
    return {
      blurry: false,
      rotated: image.width > image.height,
      dark: false,
      lowContrast: false,
      width: image.width,
      height: image.height,
    } satisfies PageQualityFlags;
  }

  context.drawImage(image, 0, 0, sampleWidth, sampleHeight);
  const { data } = context.getImageData(0, 0, sampleWidth, sampleHeight);

  let brightnessTotal = 0;
  let luminanceSquares = 0;
  let contrastAccumulator = 0;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    brightnessTotal += luminance;
    luminanceSquares += luminance * luminance;

    if (index >= 8) {
      const prevLuminance =
        0.2126 * data[index - 4] + 0.7152 * data[index - 3] + 0.0722 * data[index - 2];
      contrastAccumulator += Math.abs(luminance - prevLuminance);
    }
  }

  const pixelCount = data.length / 4;
  const averageBrightness = brightnessTotal / pixelCount;
  const variance = Math.max(
    0,
    luminanceSquares / pixelCount - averageBrightness * averageBrightness
  );
  const averageContrast = contrastAccumulator / pixelCount;

  return {
    blurry: averageContrast < 14,
    rotated: image.width > image.height,
    dark: averageBrightness < 92,
    lowContrast: variance < 900,
    width: image.width,
    height: image.height,
  } satisfies PageQualityFlags;
}

async function buildDraftFile(file: File): Promise<DraftFile> {
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pageCount = pdf.getPageCount();
    return {
      id: buildFileId(file),
      file,
      previewKind: 'pdf',
      pageCount,
      pages: Array.from({ length: pageCount }, (_, pageIndex) => ({
        pageNumber: pageIndex + 1,
        previewLabel: `PDF page ${pageIndex + 1}`,
        qualityFlags: {
          blurry: false,
          rotated: false,
          dark: false,
          lowContrast: false,
        },
        previewUrl: null,
      })),
    };
  }

  const previewUrl = URL.createObjectURL(file);
  const qualityFlags = await analyzeImageQuality(previewUrl);
  return {
    id: buildFileId(file),
    file,
    previewKind: 'image',
    pageCount: 1,
    pages: [
      {
        pageNumber: 1,
        previewLabel: file.name,
        qualityFlags,
        previewUrl,
      },
    ],
  };
}

function issueChips(flags: PageQualityFlags) {
  return [
    flags.blurry ? 'Blurry' : null,
    flags.rotated ? 'Rotated' : null,
    flags.dark ? 'Dark' : null,
    flags.lowContrast ? 'Low contrast' : null,
  ].filter(Boolean) as string[];
}

export function UploadWorkspace({ childId, childNickname }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [draftFiles, setDraftFiles] = useState<DraftFile[]>([]);
  const [sourceType, setSourceType] = useState('quiz');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const totalPages = draftFiles.reduce((sum, draftFile) => sum + draftFile.pageCount, 0);
  const isPageCountInvalid = totalPages < 5 || totalPages > 10;

  async function handleSelectedFiles(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }

    setError('');

    try {
      const nextDrafts = await Promise.all(Array.from(files).map((file) => buildDraftFile(file)));
      setDraftFiles((current) => [...current, ...nextDrafts]);
    } catch {
      setError('We could not prepare one of the selected files. Try a different image or PDF.');
    }
  }

  function removeDraftFile(fileId: string) {
    setDraftFiles((current) => {
      const target = current.find((item) => item.id === fileId);
      target?.pages.forEach((page) => {
        if (page.previewUrl) {
          URL.revokeObjectURL(page.previewUrl);
        }
      });
      return current.filter((item) => item.id !== fileId);
    });
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleSelectedFiles(event.target.files);
    event.target.value = '';
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleSelectedFiles(event.dataTransfer.files);
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function submitUpload() {
    if (draftFiles.length === 0) {
      setError('Select at least one file before continuing.');
      return;
    }

    if (isPageCountInvalid) {
      setError('The total page count must be between 5 and 10.');
      return;
    }

    setError('');

    startTransition(async () => {
      const formData = new FormData();
      formData.append('childId', String(childId));
      formData.append('sourceType', sourceType);
      formData.append('notes', notes);
      formData.append(
        'pageDrafts',
        JSON.stringify(
          draftFiles.map((draftFile) => ({
            previewKind: draftFile.previewKind,
            pageCount: draftFile.pageCount,
            pages: draftFile.pages.map((page) => ({
              pageNumber: page.pageNumber,
              previewLabel: page.previewLabel,
              qualityFlags: page.qualityFlags,
            })),
          }))
        )
      );

      draftFiles.forEach((draftFile) => {
        formData.append('files', draftFile.file);
      });

      const uploadResponse = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });
      const uploadPayload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setError(uploadPayload.error || 'Upload creation failed.');
        return;
      }

      const submitResponse = await fetch(`/api/uploads/${uploadPayload.upload.id}/submit`, {
        method: 'POST',
      });
      const submitPayload = await submitResponse.json();

      if (!submitResponse.ok) {
        setError(submitPayload.error || 'Run creation failed.');
        return;
      }

      router.push(`/dashboard/runs/${submitPayload.runId}`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload 5-10 pages for {childNickname}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div
            className="rounded-3xl border border-dashed border-orange-300 bg-orange-50/70 p-8 text-center"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <FileUp className="mx-auto h-10 w-10 text-orange-500" />
            <p className="mt-4 text-base font-medium text-gray-900">
              Drag worksheets, quiz pages, or a PDF here
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Images and PDFs are supported. We recommend bright, upright, single-page photos.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => inputRef.current?.click()}
            >
              Choose Files
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="hidden"
              onChange={onInputChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-[0.9fr,1.1fr]">
            <div>
              <Label htmlFor="sourceType" className="mb-2 block">
                Source type
              </Label>
              <select
                id="sourceType"
                value={sourceType}
                onChange={(event) => setSourceType(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {uploadSourceTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="notes" className="mb-2 block">
                Optional context
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Example: Unit test on fractions, timed quiz, corrections included."
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Page count gate</p>
                <p className="text-sm text-gray-600">
                  Total pages detected: <span className="font-semibold">{totalPages}</span>
                </p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isPageCountInvalid ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {isPageCountInvalid ? 'Needs 5-10 pages' : 'Ready for diagnosis'}
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {draftFiles.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-gray-600">
              No files selected yet. Once files are attached, this page will show previews, page
              count, and quality warnings before you generate a diagnosis.
            </CardContent>
          </Card>
        ) : (
          draftFiles.map((draftFile) => (
            <Card key={draftFile.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base">{draftFile.file.name}</CardTitle>
                  <p className="mt-1 text-sm text-gray-600">
                    {draftFile.previewKind === 'pdf' ? 'PDF' : 'Image'} · {draftFile.pageCount}{' '}
                    page{draftFile.pageCount === 1 ? '' : 's'} ·{' '}
                    {(draftFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-gray-500"
                  onClick={() => removeDraftFile(draftFile.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {draftFile.pages.map((page) => {
                  const chips = issueChips(page.qualityFlags);
                  return (
                    <div
                      key={`${draftFile.id}-${page.pageNumber}`}
                      className="rounded-2xl border border-gray-200 p-4"
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
                        {page.previewUrl ? (
                          <img
                            src={page.previewUrl}
                            alt={page.previewLabel}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#fff7ed_0%,#ffedd5_48%,#ffffff_100%)] p-6 text-center text-sm text-gray-700">
                            {page.previewLabel}
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-sm font-medium text-gray-900">{page.previewLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {chips.length > 0 ? (
                          chips.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800"
                            >
                              {chip}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                            Quality looks OK
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <AlertCircle className="mt-0.5 h-4 w-4 text-orange-500" />
            <p>
              If the upload is unusually dark, blurry, or rotated, the run may move into{' '}
              <span className="font-semibold text-gray-900">Needs Review</span> instead of
              producing a full report immediately.
            </p>
          </div>
          <Button type="button" onClick={submitUpload} disabled={isPending || isPageCountInvalid}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating run...
              </>
            ) : (
              'Generate Diagnosis'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
