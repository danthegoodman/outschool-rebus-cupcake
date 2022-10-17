export type UserData = {email:string, picture: string};
let userData: UserData | undefined;

export function getUserData(): UserData {
  if(userData) return userData;

  const cookies = document.cookie?.split('; ');
  const jwtCookie = cookies.find(it => it.startsWith('JWT='));

  // This will only be null in development mode if not-authed
  // or if something has gone horribly wrong in production.
  if(!jwtCookie) return null as any

  const {email, picture} = JSON.parse(atob(jwtCookie.split('.')[1]));
  userData = {email, picture};
  return userData;
}

export function isUserAdmin(): boolean {
  const email = getUserData()?.email;
  return email === "danny@outschool.com" || email === "ana.simmons@outschool.com"
}
