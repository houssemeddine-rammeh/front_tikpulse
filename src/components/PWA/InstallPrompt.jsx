import { useState, useEffect } from "react";
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PWAInstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("installPromptDismissed");

    // Check if the app is already installed
    const checkStandalone = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    setIsStandalone(checkStandalone());

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iOS);
    if (checkStandalone() || isDismissed === "true") return;

    // Android: handle beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);

      // Delay showing the modal for better UX
      setTimeout(() => setIsVisible(true), 1500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if app was just installed
    window.addEventListener("appinstalled", () => {
      setIsVisible(false);
      setIsStandalone(true);
    });

    // iOS fallback: show modal after delay
    if (iOS) {
      setTimeout(() => setIsVisible(true), 1500);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      setIsVisible(false);
      return;
    }

    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setInstallPromptEvent(null);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("installPromptDismissed", "true");
  };

  if (isStandalone || !isVisible) return null;

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">
            {isIOS ? "Install DashTracer" : "Add DashTracer to your home screen"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" color="textSecondary">
          {isIOS
            ? "For the best experience, install this app on your device:"
            : "Install this application on your home screen for quick access and a better experience."}
        </Typography>

        {isIOS && (
          <Box mt={2}>
            <Typography variant="body2">
              1. Tap the <strong>Share</strong> button <br />
              2. Select <strong>"Add to Home Screen"</strong> <br />
              3. Tap <strong>"Add"</strong> in the top right corner
            </Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button variant="outlined" onClick={handleClose}>
            Not now
          </Button>
          {!isIOS && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleInstallClick}
            >
              Install
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PWAInstallPrompt;
