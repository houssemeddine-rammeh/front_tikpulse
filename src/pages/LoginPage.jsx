import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Stack,
  Divider,
  Alert,
  IconButton,
  Card,
  CardContent,
  Fade,
  Slide,
  useTheme,
  alpha,
  InputAdornment,
  keyframes,
  CircularProgress,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  TrendingUp,
  Groups,
  Analytics,
  Star,
  PlayArrow,
  VideoCall,
  Security,
  Group,
  VerifiedUser,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn, clearError } from "../features/authSlice";
import TikTokAuthService from "../services/tiktokAuth";

const LoginPage = () => {
  const { user, token, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedDemo, setSelectedDemo] = useState(null);

  // Clear any previous errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // If user is already authenticated, redirect
  useEffect(() => {
    if (token && user) {
      switch (user.role) {
        case "creator":
          navigate("/creator/dashboard");
          break;
        case "manager":
        case "sub_manager":
          navigate("/manager/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [token, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(resultAction)) {
        console.log("User logged in:", resultAction.payload);
        // Navigation will be handled by useEffect above
      } else {
        setFormError(resultAction.payload || "Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      setFormError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTikTokLogin = () => {
    try {
      const tikTokAuthService = TikTokAuthService.getInstance();
      const authUrl = tikTokAuthService.generateAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error("TikTok OAuth initialization error:", error);
      setFormError("Failed to initialize TikTok login");
    }
  };

  const demoUsers = [
    {
      role: "super_admin",
      email: "superadmin@example.com",
      password: "password",
      label: "Super Admin Console",
      icon: <Security />,
      color: "#9f7aea",
    },
    {
      role: "admin",
      email: "admin@example.com",
      password: "password",
      label: "Admin Dashboard",
      icon: <Analytics />,
      color: "#e53e3e",
    },
    {
      role: "manager",
      email: "manager@example.com",
      password: "password",
      label: "Manager Portal",
      icon: <Groups />,
      color: "#3182ce",
    },
    {
      role: "creator",
      email: "creator@example.com",
      password: "password",
      label: "Creator Studio",
      icon: <Star />,
      color: "#38a169",
    },
  ];

  const selectDemoUser = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setSelectedDemo(demoUser.role);
  };

  const features = [
    {
      icon: <TrendingUp />,
      title: "Analytics",
      desc: "Real-time performance tracking",
    },
    {
      icon: <Groups />,
      title: "Team Management",
      desc: "Collaborate with creators",
    },
    {
      icon: <PlayArrow />,
      title: "Content Planning",
      desc: "Schedule and organize content",
    },
  ];

  // Define the float animation using Material-UI keyframes
  const floatAnimation = keyframes`
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
    }
    50% { 
      transform: translateY(-20px) rotate(5deg); 
    }
  `;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          animation: `${floatAnimation} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          left: "-15%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          animation: `${floatAnimation} 8s ease-in-out infinite reverse`,
        }}
      />
      {console.log(import.meta.env.VITE_API_URL)}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            py: 4,
          }}
        >
          {/* Left Side - Branding & Features */}
          <Fade in timeout={1000}>
            <Box
              sx={{
                flex: 1,
                pr: { xs: 0, md: 4 },
                display: { xs: "none", md: "block" },
              }}
            >
              <Box sx={{ color: "white", mb: 6 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: "linear-gradient(45deg, #fff, #f0f8ff)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TikPluse
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ opacity: 0.9, mb: 1, fontWeight: 300 }}
                >
                  Creator Management Platform
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.8, fontSize: "1.1rem" }}
                >
                  Empowering creators, streamlining success
                </Typography>
              </Box>

              <Stack spacing={3}>
                {features.map((feature, index) => (
                  <Slide
                    key={index}
                    direction="right"
                    in
                    timeout={1000 + index * 200}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        opacity: 0.9,
                      }}
                    >
                      <Box
                        sx={{
                          mr: 3,
                          p: 2,
                          borderRadius: 2,
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Slide>
                ))}
              </Stack>
            </Box>
          </Fade>

          {/* Right Side - Login Form */}
          <Fade in timeout={1200}>
            <Box sx={{ flex: { xs: 1, md: 0.6 } }}>
              <Paper
                elevation={24}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.15)",
                }}
              >
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      mb: 3,
                      boxShadow: "0 16px 32px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <Typography variant="h3" sx={{ color: "white" }}>
                      🚀
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#2d3748",
                      mb: 1,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sign in to your account to continue
                  </Typography>
                </Box>

                {/* Error Alert */}
                {(error || formError) && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error || formError}
                  </Alert>
                )}

                {/* TikTok Login */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleTikTokLogin}
                  startIcon={<VideoCall />}
                  sx={{
                    mb: 3,
                    py: 2,
                    background: "linear-gradient(45deg, #ff0050, #ff4081)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(255, 0, 80, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #e60048, #f50057)",
                      boxShadow: "0 12px 32px rgba(255, 0, 80, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Continue with TikTok
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      px: 2,
                      fontWeight: 500,
                    }}
                  >
                    OR
                  </Typography>
                </Divider>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address / TikTok ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 3,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 3,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #5a6fd8, #6b4190)",
                        boxShadow: "0 12px 32px rgba(102, 126, 234, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: "#e2e8f0",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                {/* Footer */}
                <Box sx={{ textAlign: "center", mt: 4, pt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Need help? Contact your team administrator
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
