'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Paperclip, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ACCEPTED_TYPES = '.pdf,.zip,image/*';

export function HeroIntakeComposer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const helperLabel = useMemo(() => {
    if (files.length === 0) {
      return 'Homework, tests, corrections · PDF, photo, or ZIP';
    }
    if (files.length === 1) {
      return files[0].name;
    }
    return `${files.length} files selected`;
  }, [files]);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files || []);
    setFiles(nextFiles);
  }

  function handleAnalyze() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('pathnook.heroDraft', notes);
      window.sessionStorage.setItem(
        'pathnook.heroFiles',
        JSON.stringify(files.map((file) => file.name))
      );
    }
    router.push('/sign-up?redirect=dashboard');
  }

  return (
    <div className="rounded-[1.7rem] border border-[#dfe4ec] bg-[#fcfcfe] px-6 py-7 sm:px-8 sm:py-8">
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        className="min-h-[150px] w-full resize-none rounded-[1.45rem] border border-[#dfe4ec] bg-white px-5 py-5 font-mono text-[1rem] leading-[2] tracking-[0.01em] text-[#334155] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition focus:border-[var(--pn-violet)] focus:ring-4 focus:ring-[rgba(124,58,237,0.10)] sm:text-[1.08rem]"
        placeholder="My child understands the ideas in class, but still breaks down on mixed schoolwork. I want to know the real bottleneck and what we should focus on this week."
      />

      <div className="mt-8 border-t border-[#e4e7ee] pt-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={openFilePicker}
              className="flex items-center gap-4 rounded-[1.35rem] border border-[var(--pn-soft-border)] bg-[linear-gradient(180deg,#f2efff_0%,#f8f7ff_100%)] px-5 py-5 text-left shadow-[0_12px_30px_rgba(124,58,237,0.08)] transition hover:-translate-y-0.5"
            >
              <div className="grid h-16 w-16 place-items-center rounded-[1.15rem] bg-white text-[var(--pn-violet)] shadow-[0_10px_24px_rgba(124,58,237,0.14)]">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[1.02rem] font-black tracking-[-0.02em] text-[#111827]">
                  Upload Files
                </p>
                <p className="mt-1 text-sm leading-7 text-[var(--pn-muted)] sm:text-base">
                  {helperLabel}
                </p>
              </div>
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--pn-soft-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--pn-violet)]"
              >
                <Paperclip className="h-4 w-4" />
                Attach image or PDF
              </button>
              {files.length > 0 ? (
                <span className="inline-flex items-center rounded-full bg-[var(--pn-soft)] px-4 py-2 text-sm font-semibold text-[var(--pn-muted-2)]">
                  {files.length} file{files.length === 1 ? '' : 's'} ready
                </span>
              ) : null}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_TYPES}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Button
            type="button"
            size="lg"
            className="h-14 rounded-[1.2rem] px-8 text-[1.05rem]"
            onClick={handleAnalyze}
          >
            Analyze &amp; Get Plan
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
