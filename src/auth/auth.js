import { createAuth0 } from "@auth0/auth0-vue";

const auth0 = createAuth0({
  domain: "jqp.us.auth0.com",
  clientId: "6JGsd37CQYrJ9jPtsQKHBjv0df5ieUef",
  redirectUri: window.location.origin,
});

export function login() {
  auth0.loginWithRedirect();
}

export function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

export function isAuthenticated(auth0) {
  return auth0.isAuthenticated();
}

export function getUser() {
  return auth0.user;
}
