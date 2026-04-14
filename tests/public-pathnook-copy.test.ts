import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const filesToCheck = [
  '../app/(dashboard)/pricing/page.tsx',
  '../app/(dashboard)/sample-report/page.tsx',
  '../app/contact/page.tsx',
  '../app/legal/privacy/page.tsx',
  '../app/legal/terms/page.tsx',
  '../app/legal/refunds/page.tsx',
  '../app/help/page.tsx',
  '../app/faq/page.tsx',
] as const;

test('public pages use Pathnook and Freemius language without legacy placeholders', () => {
  for (const relativePath of filesToCheck) {
    const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8');

    assert.equal(source.includes('FamilyEducation'), false, `${relativePath} should not mention FamilyEducation`);
    assert.equal(source.includes('Creem'), false, `${relativePath} should not mention Creem`);
    assert.equal(source.includes('active billing provider'), false, `${relativePath} should not mention active billing provider`);
    assert.equal(source.includes('will start working'), false, `${relativePath} should not contain unfinished login copy`);
  }
});
