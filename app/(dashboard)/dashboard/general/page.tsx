'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';
import { Suspense } from 'react';
import {
  countryOptions,
  localeOptions,
  timezoneOptions
} from '@/lib/family/options';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ActionState = {
  name?: string;
  email?: string;
  country?: string;
  timezone?: string;
  locale?: string;
  error?: string;
  success?: string;
};

type AccountFormProps = {
  state: ActionState;
  nameValue?: string;
  emailValue?: string;
  countryValue?: string;
  timezoneValue?: string;
  localeValue?: string;
};

const selectClassName =
  'mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm';

function AccountForm({
  state,
  nameValue = '',
  emailValue = '',
  countryValue = 'US',
  timezoneValue = 'America/Los_Angeles',
  localeValue = 'en-US'
}: AccountFormProps) {
  return (
    <>
      <div>
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          defaultValue={state.name || nameValue}
          required
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={state.email || emailValue}
          required
        />
      </div>
      <div>
        <Label htmlFor="country" className="mb-2">
          Country
        </Label>
        <select
          id="country"
          name="country"
          className={selectClassName}
          defaultValue={state.country || countryValue}
          required
        >
          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="timezone" className="mb-2">
          Timezone
        </Label>
        <select
          id="timezone"
          name="timezone"
          className={selectClassName}
          defaultValue={state.timezone || timezoneValue}
          required
        >
          {timezoneOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="locale" className="mb-2">
          Preferred Language
        </Label>
        <select
          id="locale"
          name="locale"
          className={selectClassName}
          defaultValue={state.locale || localeValue}
          required
        >
          {localeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm text-gray-700">
        This dashboard is only for parents or guardians aged 18 and older.
      </div>
    </>
  );
}

function AccountFormWithData({ state }: { state: ActionState }) {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  return (
    <AccountForm
      state={state}
      nameValue={user?.name ?? ''}
      emailValue={user?.email ?? ''}
      countryValue={user?.country ?? 'US'}
      timezoneValue={user?.timezone ?? 'America/Los_Angeles'}
      localeValue={user?.locale ?? 'en-US'}
    />
  );
}

export default function GeneralPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    {}
  );

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Parent Account
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Parent Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={formAction}>
            <Suspense fallback={<AccountForm state={state} />}>
              <AccountFormWithData state={state} />
            </Suspense>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-500 text-sm">{state.success}</p>
            )}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
