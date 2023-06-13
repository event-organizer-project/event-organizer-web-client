import { UserManager } from 'oidc-client';
import { storeUserError, storeUser, setAuthHeader } from '../store/authSlice'
import UserProfileService from './userProfileService'

export class AuthService {

  config = {
    authority: process.env.REACT_APP_IDENTITY_SERVER_URL,
    client_id: "eventorganizer",
    redirect_uri: `${process.env.REACT_APP_WEB_CLIENT_URL}/signin-oidc`,
    response_type: "id_token token",
    scope: "openid profile eventorganizerapi",
    post_logout_redirect_uri: `${process.env.REACT_APP_WEB_CLIENT_URL}/signout-oidc`,
    automaticSilentRenew: true,
    loadUserInfo: true
  };

  constructor() {
    this.userManager = new UserManager(this.config)
    this.userProfileService = new UserProfileService();
  }

  async loadUserFromStorage(store) {
    try {
      let user = await this.userManager.getUser()
      if (!user) {
        console.log("Oops")
        return store.dispatch(storeUserError())
      }

      let token = user.access_token;
      setAuthHeader(token);

      var userProfile = await this.userProfileService.getCurrentUserProfile();
      store.dispatch(storeUser(userProfile))
    } catch (e) {
      console.error("loadUserFromStorage: ", e)
      store.dispatch(storeUserError())
    }
  }

  signinRedirect() {
    return this.userManager.signinRedirect()
  }

  signinRedirectCallback() {
    return this.userManager.signinRedirectCallback()
  }

  signoutRedirect() {
    this.userManager.clearStaleState()
    this.userManager.removeUser()
    return this.userManager.signoutRedirect()
  }

  signoutRedirectCallback() {
    this.userManager.clearStaleState()
    this.userManager.removeUser()
    return this.userManager.signoutRedirectCallback()
  }

  getUserManager() {
    return this.userManager;
  }
}

const authService = new AuthService();

export default authService;
