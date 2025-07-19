// TikTokAuthService.js
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { TIKTOK_CLIENT_SECRET } from "../config/api"; // ⚠️ Don't expose secrets in frontend production

// TikTok OAuth Configuration
export const TIKTOK_CONFIG = {
  CLIENT_KEY: "sbaw5rww8nk7v6lzej",
  REDIRECT_URI: "http://localhost:5000/auth/tiktok/callback",
  SCOPE: "user.info.basic",
  RESPONSE_TYPE: "code",
  AUTH_URL: "https://www.tiktok.com/v2/auth/authorize/",
};

class TikTokAuthService {
  static instance = null;

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

    Cookies.set("tiktok_oauth_state", state, { expires: 1 });
    Cookies.set("tiktok_csrf_token", csrfToken, { expires: 1 });

    const params = new URLSearchParams({
      client_key: "sbaw5rww8nk7v6lzej",
      redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
      scope: TIKTOK_CONFIG.SCOPE,
      response_type: TIKTOK_CONFIG.RESPONSE_TYPE,
      state,
    });

    return `${TIKTOK_CONFIG.AUTH_URL}?${params.toString()}`;
  }

  /**
   * Handle the OAuth callback from TikTok
   */
  async handleCallback(code, state) {
    try {
      const storedState = Cookies.get("tiktok_oauth_state");
      if (!storedState || storedState !== state) {
        throw new Error("Invalid state parameter");
      }

      const tokenResponse = await this.exchangeCodeForToken(code);
      const userInfo = await this.getUserInfo(tokenResponse.access_token);

      Cookies.remove("tiktok_oauth_state");
      Cookies.remove("tiktok_csrf_token");

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
    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams({
        client_key: "sbaw5rww8nk7v6lzej",
        client_secret: "7FPJnExX8VIbZ9QY3wJ9OLxRYMIT69mI", // ⚠️ Don't use in frontend production
        code,
        grant_type: "authorization_code",
        redirect_uri: TIKTOK_CONFIG.REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`TikTok API Error: ${data.error_description || data.error}`);
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

    return data.data?.user || null;
  }

  /**
   * Store tokens securely
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

    if (!token || !expires || Date.now() > parseInt(expires, 10)) {
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

// Export a singleton instance directly
export const tiktokAuthService = TikTokAuthService.getInstance();
export default TikTokAuthService;
