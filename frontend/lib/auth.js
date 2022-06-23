import Router from "next/router";
import nookies from "nookies";

export const setToken = (data, ctx = null) => {
  if (typeof window === "undefined") return
  nookies.set(ctx, "id", data.user.id);
  nookies.set(ctx, "username", data.user.username);
  nookies.set(ctx, "jwt", data.jwt);
  if (nookies.get( ctx, "jwt" ) !== undefined) {
    Router.reload();
  }
}

export const unsetToken = (ctx = null) => {
  if (typeof window === "undefined") return
  
  nookies.destroy(ctx, "id");
  nookies.destroy(ctx, "username");
  nookies.destroy(ctx, "jwt");

  Router.reload();
} 

export const getUserFromCookies = (ctx = null) => {
  const cookies = nookies.get(ctx);
  return cookies.username;
}
export const getIdFromCookies = (ctx = null) => {
  const cookies = nookies.get(ctx);
  return cookies.id;
}
export const getTokenFromCookies = (ctx = null) => {
  const cookies = nookies.get(ctx);
  return cookies.jwt;
}