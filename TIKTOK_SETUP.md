# TikTok OAuth Setup Guide

## 🎯 Overview
This guide helps you set up TikTok OAuth authentication for your TikPluse application.

## 🔧 Prerequisites
1. A TikTok for Developers account
2. A registered TikTok app with OAuth permissions
3. Access to your app's client credentials

## 📋 Step-by-Step Setup

### 1. Create a TikTok for Developers Account
1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Sign up or log in with your TikTok account
3. Complete the developer verification process

### 2. Create a New App
1. In the developer dashboard, click "Create an app"
2. Fill in your app details:
   - **App name**: TikPluse
   - **Category**: Business Tools
   - **Description**: Creator management platform
3. Select the required permissions:
   - `user.info.basic` (required for login)

### 3. Configure OAuth Settings
1. In your app settings, go to "Login Kit"
2. Set the redirect URI to: `http://localhost:3000/auth/tiktok/callback`
3. For production, add your production domain: `https://yourdomain.com/auth/tiktok/callback`

### 4. Get Your Credentials
After app approval, you'll receive:
- **Client Key** (public)
- **Client Secret** (private - keep secure!)

### 5. Configure Environment Variables
Create a `.env` file in your project root:

```bash
# TikTok OAuth Configuration
REACT_APP_TIKTOK_CLIENT_KEY=your_client_key_here
REACT_APP_TIKTOK_CLIENT_SECRET=your_client_secret_here
REACT_APP_TIKTOK_REDIRECT_URI=http://localhost:3000/auth/tiktok/callback

# Backend API Configuration
REACT_APP_API_BASE_URL=http://127.0.0.1:3002
```

⚠️ **Important**: Never commit your `.env` file to version control!

### 6. Test the Integration
1. Restart your React development server: `npm start`
2. Go to the login page
3. Click "Continue with TikTok"
4. You should be redirected to TikTok's OAuth flow

## 🔒 Security Considerations

### Production Setup
For production deployment:

1. **Use HTTPS**: TikTok requires HTTPS for production apps
2. **Environment Variables**: Use secure environment variable management
3. **Domain Verification**: Add your production domain to TikTok app settings
4. **Rate Limiting**: Implement rate limiting for OAuth endpoints

### Backend Integration
To make TikTok login fully functional, update your backend to:

1. **Add TikTok OAuth endpoint**:
```javascript
POST /api/v1/auth/tiktok
Body: {
  tikTokId: string,
  username: string,
  displayName: string,
  avatarUrl: string,
  unionId: string
}
```

2. **Handle user creation/login**:
   - Check if user exists by `tikTokId`
   - Create new user if doesn't exist
   - Return JWT token and user data

## 🧪 Testing

### Mock Mode (Current Implementation)
The current setup includes a mock implementation that:
- Creates temporary users with TikTok data
- Works without real TikTok API calls
- Perfect for development and testing

### Real TikTok Integration
To enable real TikTok OAuth:
1. Set up proper environment variables
2. Ensure your backend handles TikTok OAuth properly
3. Test with real TikTok accounts

## 🐛 Troubleshooting

### Common Issues

**"Invalid client_key" Error**
- Check your `REACT_APP_TIKTOK_CLIENT_KEY` in `.env`
- Ensure the key matches your TikTok app settings

**"Redirect URI mismatch" Error**
- Verify the redirect URI in TikTok app settings
- Check `REACT_APP_TIKTOK_REDIRECT_URI` matches exactly

**OAuth Flow Doesn't Complete**
- Check browser console for JavaScript errors
- Verify network requests in browser dev tools
- Ensure backend endpoint is running

### Debug Mode
Enable debug logging by adding to your `.env`:
```bash
REACT_APP_DEBUG_TIKTOK=true
```

## 📱 User Experience

### Login Flow
1. User clicks "Continue with TikTok"
2. Redirects to TikTok OAuth page
3. User authorizes the app
4. Returns to your app with auth code
5. App exchanges code for user data
6. User is logged in and redirected to dashboard

### Fallback Options
- Email/password login still available
- Demo user accounts for testing
- Graceful error handling for OAuth failures

## 🚀 Next Steps

Once TikTok OAuth is working:
1. **User Profile Enhancement**: Display TikTok avatars and usernames
2. **Analytics Integration**: Fetch TikTok analytics (if permissions allow)
3. **Creator Verification**: Verify creators using TikTok account data
4. **Social Features**: Enable TikTok-based creator discovery

## 📞 Support

If you need help:
1. Check the [TikTok for Developers documentation](https://developers.tiktok.com/doc/)
2. Review the implementation in `src/services/tiktokAuth.ts`
3. Check the console logs for detailed error messages

Happy coding! 🎉 