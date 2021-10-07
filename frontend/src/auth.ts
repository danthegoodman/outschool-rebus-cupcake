export function getUserData(): {email: string, picture: string} {
  const cookies = document.cookie?.split('; ');
  const jwtCookie = cookies.find(it => it.startsWith('JWT='));

  // This will only be null in development mode if not-authed
  // or if something has gone horribly wrong in production.
  if(!jwtCookie) return null as any

  const {email, picture} = JSON.parse(atob(jwtCookie.split('.')[1]));
  return {email, picture};
}
