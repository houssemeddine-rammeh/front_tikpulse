import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { TIKTOK_CLIENT_SECRET } from '../config/api';

// TikTok OAuth Configuration
export const TIKTOK_CONFIG = {
  CLIENT_KEY: "your-tiktok-client-key",
  REDIRECT_URI: "http://localhost:3000/auth/tiktok/callback",
  SCOPE: "user.info.basic",
  RESPONSE_TYPE: "code",
  AUTH_URL: "https://www.tiktok.com/v2/auth/authorize/",
};

class TikTokAuthService {
  static instance;

  static getInstance() {
    if (!TikTokAuthService.instance) {
      TikTokAuthService.instance = new TikTokAuthService();
    }
    return TikTokAuthService.instance;
  }

  /**
   * Generate TikTok OAuth URL for login
   */
  generateAuthUrl() {
    const state = uuidv4();
    const csrfToken = uuidv4();

    // Store state and CSRF token in cookies for validation
    Cookies.set("tiktok_oauth_state", state, { expires: 1 }); // 1 day
    Cookies.set("tiktok_csrf_token", csrfToken, { expires: 1 });

    const params = new URLSearchParams({
      client_key: TIKTOK_CONFIG.CLIENT_KEY,
      redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
      scope: TIKTOK_CONFIG.SCOPE,
      response_type: TIKTOK_CONFIG.RESPONSE_TYPE,
      state: state,
    });

    return `${TIKTOK_CONFIG.AUTH_URL}?${params.toString()}`;
  }

  /**
   * Handle the OAuth callback from TikTok
   */
  async handleCallback(code, state) {
    try {
      // Verify state parameter
      const storedState = Cookies.get("tiktok_oauth_state");
      if (!storedState || storedState !== state) {
        throw new Error("Invalid state parameter");
      }

      // Exchange code for access token
      const tokenResponse = await this.exchangeCodeForToken(code);

      // Get user information
      const userInfo = await this.getUserInfo(tokenResponse.access_token);

      // Clean up cookies
      Cookies.remove("tiktok_oauth_state");
      Cookies.remove("tiktok_csrf_token");

      // Store tokens securely
      this.storeTokens(tokenResponse);

      return userInfo;
    } catch (error) {
      console.error("TikTok OAuth callback error:", error);
      throw error;
    }
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code) {
    const response = await fetch(
      "https://open.tiktokapis.com/v2/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        body: new URLSearchParams({
          client_key: TIKTOK_CONFIG.CLIENT_KEY,
          client_secret: TIKTOK_CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(
        `TikTok API Error: ${data.error_description || data.error}`
      );
    }

    return data;
  }

  /**
   * Get user information using access token
   */
  async getUserInfo(accessToken) {
    const response = await fetch("https://open.tiktokapis.com/v2/user/info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`User info fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`TikTok API Error: ${data.error.message || data.error}`);
    }

    return data.data.user;
  }

  /**
   * Store tokens securely (you might want to encrypt these)
   */
  storeTokens(tokens) {
    localStorage.setItem("tiktok_access_token", tokens.access_token);
    localStorage.setItem("tiktok_refresh_token", tokens.refresh_token);
    localStorage.setItem(
      "tiktok_token_expires",
      (Date.now() + tokens.expires_in * 1000).toString()
    );
  }

  /**
   * Get stored access token
   */
  getAccessToken() {
    const token = localStorage.getItem("tiktok_access_token");
    const expires = localStorage.getItem("tiktok_token_expires");

    if (!token || !expires) {
      return null;
    }

    if (Date.now() > parseInt(expires)) {
      this.clearTokens();
      return null;
    }

    return token;
  }

  /**
   * Clear stored tokens
   */
  clearTokens() {
    localStorage.removeItem("tiktok_access_token");
    localStorage.removeItem("tiktok_refresh_token");
    localStorage.removeItem("tiktok_token_expires");
  }

  /**
   * Check if user is authenticated with TikTok
   */
  isAuthenticated() {
    return this.getAccessToken() !== null;
  }
}

export default TikTokAuthService;
