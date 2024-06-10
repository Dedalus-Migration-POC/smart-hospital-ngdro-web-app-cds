export enum CookieKey {
  accessToken = 'access_token',
  refreshToken = 'refresh_token',
  tfaToken = 'tfa_token',
  xsrf = 'XSRF-TOKEN',
}

const Cookie = (): string[] => document.cookie.split(';').filter(Boolean);
const Cookies = (): { [key: string]: string } =>
  Cookie()
    .filter(Boolean)
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      return {
        ...acc,
        [key]: value,
      };
    }, {});

export const CookieUtils = {
  check: (key: CookieKey) => {
    return !!Cookies()[key];
  },
  get: (key: CookieKey): string | null => {
    return Cookies()[key];
  },
  remove: (key: CookieKey): void => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
};
