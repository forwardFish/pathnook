'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { FamilyLogoStatic } from '@/components/branding/family-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { countryOptions } from '@/lib/family/options';
import { FAMILY_EDU_SUPPORT_EMAIL } from '@/lib/family/config';

function getOauthErrorMessage(errorCode?: string) {
  switch (errorCode) {
    case 'google_not_configured':
      return 'Google sign-in is unavailable right now. Please try again later or use email and password.';
    case 'google_session_missing':
    case 'google_session_invalid':
    case 'google_state_invalid':
      return 'Google sign-in expired or could not be verified. Please try again.';
    case 'google_access_denied':
      return 'Google sign-in was canceled before completion.';
    case 'google_sign_in_failed':
      return 'Google sign-in failed. Please try again or use email and password.';
    default:
      return '';
  }
}

const selectClassName =
  'mt-1 flex h-10 w-full rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500';

export function Login({
  mode = 'signin',
  redirectTo,
  priceId,
  inviteId,
  oauthError,
  googleAuthAvailable
}: {
  mode?: 'signin' | 'signup';
  redirectTo?: string;
  priceId?: string;
  inviteId?: string;
  oauthError?: string;
  googleAuthAvailable?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  const googleHref = `/api/auth/google/start?mode=${mode}${
    redirectTo ? `&redirect=${encodeURIComponent(redirectTo)}` : ''
  }${priceId ? `&priceId=${encodeURIComponent(priceId)}` : ''}${
    inviteId ? `&inviteId=${encodeURIComponent(inviteId)}` : ''
  }`;
  const oauthErrorMessage = getOauthErrorMessage(oauthError);

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <FamilyLogoStatic size="lg" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'signin'
            ? 'Sign in to continue your Pathnook household workflow.'
            : 'Start with Google or create your account'}
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          {mode === 'signin'
            ? 'Google sign-in is the fastest path. Email and password remain available if you prefer a standard sign-in.'
            : 'Google sign-in is recommended for the fastest setup. Email and password remain available for parent, guardian, or other authorized adult use. Children may not create accounts directly.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {googleAuthAvailable ? (
          <div className="mb-6 space-y-3">
            <a
              href={googleHref}
              className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 shadow-xs transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <GoogleIcon />
              {mode === 'signin' ? 'Sign in with Google' : 'Continue with Google'}
            </a>
            <p className="text-center text-xs text-gray-500">
              Use your Google account to sign in or create an account in one step.
            </p>
          </div>
        ) : null}

        <form className="space-y-6" action={formAction}>
          <input type="hidden" name="redirect" value={redirectTo || ''} />
          <input type="hidden" name="priceId" value={priceId || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    defaultValue={state.name}
                    maxLength={100}
                    className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="How should we address you?"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </Label>
                <select
                  id="country"
                  name="country"
                  defaultValue={(state.country as string) || 'US'}
                  className={selectClassName}
                  required
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-3 rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="is18PlusConfirmed"
                  defaultChecked={Boolean(state.is18PlusConfirmed)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span>
                  I confirm that I am at least 18 years old and I am creating
                  this account for parent, guardian, or other authorized adult use.
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  defaultChecked={Boolean(state.acceptTerms)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span>
                  I agree to the Pathnook Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>
          )}

          {state?.error ? (
            <div className="text-red-500 text-sm">{state.error}</div>
          ) : null}
          {!state?.error && oauthErrorMessage ? (
            <div className="text-red-500 text-sm">{oauthErrorMessage}</div>
          ) : null}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign in'
              ) : (
                'Sign up'
              )}
            </Button>
          </div>

          {mode === 'signin' ? (
            <div className="text-center text-sm text-gray-600">
              <a
                href={`mailto:${FAMILY_EDU_SUPPORT_EMAIL}?subject=Pathnook password recovery`}
                className="font-medium text-orange-700 underline-offset-4 hover:underline"
              >
                Need help recovering your password?
              </a>
            </div>
          ) : null}
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                {googleAuthAvailable ? 'Or continue with email' : ''}
                {mode === 'signin'
                  ? (googleAuthAvailable ? '' : 'New to our platform?')
                  : (googleAuthAvailable ? '' : 'Already have an account?')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                redirectTo ? `?redirect=${redirectTo}` : ''
              }${priceId ? `&priceId=${priceId}` : ''}${
                inviteId ? `&inviteId=${inviteId}` : ''
              }`}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {mode === 'signin'
                ? 'Create an account'
                : 'Sign in to existing account'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.805 12.23c0-.68-.061-1.334-.174-1.962H12v3.713h5.499a4.704 4.704 0 0 1-2.04 3.087v2.565h3.302c1.933-1.78 3.044-4.403 3.044-7.403Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.078-.915 6.771-2.477l-3.302-2.565c-.915.614-2.085.977-3.469.977-2.668 0-4.928-1.803-5.735-4.227H2.85v2.646A9.998 9.998 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.265 13.708A5.996 5.996 0 0 1 5.944 12c0-.593.102-1.169.321-1.708V7.646H2.85A9.998 9.998 0 0 0 2 12c0 1.613.385 3.14 1.069 4.354l3.196-2.646Z"
        fill="#FBBC04"
      />
      <path
        d="M12 6.065c1.502 0 2.85.516 3.911 1.53l2.932-2.932C17.073 3.016 14.754 2 12 2a9.998 9.998 0 0 0-9.15 5.646l3.415 2.646C7.072 7.868 9.332 6.065 12 6.065Z"
        fill="#EA4335"
      />
    </svg>
  );
}
