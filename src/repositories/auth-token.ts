import {
  CookieValueTypes,
  getCookie,
  setCookie,
  deleteCookie,
} from "cookies-next";

export class AuthToken {
  static readonly key = "auth_token";
  static get() {
    return getCookie(AuthToken.key) as CookieValueTypes;
  }
  static set(token: string) {
    // 29 days
    setCookie(AuthToken.key, token, { maxAge: 60 * 60 * 24 * 29 });
    return token;
  }
  static remove() {
    deleteCookie(AuthToken.key);
  }
}
