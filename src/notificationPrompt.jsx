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
import { useSelector, useDispatch } from "react-redux";
import { subscribeToNotifications } from "./features/authSlice";

const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    // Check if the Notification API is supported by the browser

    if ("Notification" in window && user?.user?._id) {
      if (
        Notification.permission === "default" ||
        Notification.permission === "denied"
      ) {
        setShowPrompt(true);
      }
    } else {
      setError("Notifications not supported in this browser");
    }
  }, [user, user?.user?._id]);

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Add this to your notification prompt component
  const checkNotificationSupport = async () => {
    // Check for service worker support first
    if (!("serviceWorker" in navigator)) {
      setError("Service workers not supported - update your browser");
      return false;
    }

    // Check for push manager support
    if (!("PushManager" in window)) {
      setError("Push notifications not supported in this browser");
      return false;
    }

    // Check for Notification permission
    if (Notification.permission === "denied") {
      setError(
        "Notifications were blocked. Please enable them in browser settings."
      );
      return false;
    }

    return true;
  };

  const requestNotificationPermission = async () => {
    const isSupported = await checkNotificationSupport();
    if (!isSupported) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission not granted");
      }

      const registration = await navigator.serviceWorker.ready;
      if (!registration.pushManager) {
        throw new Error("PushManager not available");
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BISJ4IiiIxkE0BVgbqgOZTYJQHN4PUSLvPYZ2KrS5R3yyW9BO3ABLsuw9AK2b4yYn9BeKhD7bke5ejq_yF0_Exs"
        ),
      });

      // Send subscription to backend
      dispatch(
        subscribeToNotifications({
          subscription: JSON.stringify(subscription),
          id: user?.user?._id,
        })
      );

      setShowPrompt(false);
    } catch (error) {
      console.error("Notification error:", error);
      setError(
        error.message.includes("not supported")
          ? "Please install the app for notifications"
          : "Failed to enable notifications"
      );
      setShowPrompt(false);
    }
  };

  return (
    <Modal
      open={showPrompt}
      onClose={() => setShowPrompt(false)}
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
          <Typography variant="h6">Enable Notifications</Typography>
          <IconButton onClick={() => setShowPrompt(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body1" color="textSecondary">
          Stay updated with important notifications.
        </Typography>

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button variant="outlined" onClick={() => setShowPrompt(false)}>
            Not now
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => requestNotificationPermission()}
          >
            Enable
          </Button>
        </Box>
        <span color="red">
          {error && (
            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>
          )}
        </span>
      </Box>
    </Modal>
  );
};

export default NotificationPrompt;
