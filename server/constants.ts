export const isDevelopment = Deno.env.get('DENO_DEPLOYMENT_ID') === undefined;
export const isProduction = !isDevelopment;

export const OAUTH_CLIENT_ID = isProduction
  ? '417603469316-q9li958ocalq9p6llak9scnfu92n7lg5.apps.googleusercontent.com'
  : '417603469316-gvl12js9npg0dug5oaga33tks5c67fmb.apps.googleusercontent.com';

export const OAUTH_SECRET = isProduction
  ? assertEnv('OAUTH_SECRET')
  : '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';

export const JWT_SECRET = isProduction
  ? assertEnv('JWT_SECRET')
  : 'development'

function assertEnv(key:string): string{
  const value = Deno.env.get(key);
  if(!value) {
    throw new Error(`Missing env-var: ${key}`)
  }
  return value;
}
