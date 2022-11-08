import { checkLogin } from "./check-login";
import { login } from "./login";
import { logout } from "./logout";
import Masa from "../masa";
import { getSession } from "./get-session";

export const session = (masa: Masa) => ({
  checkLogin: () => checkLogin(masa),
  sessionLogout: () => masa.client.sessionLogout(),
  login: () => login(masa),
  logout: () => logout(masa),
  getSession: () => getSession(masa),
});
