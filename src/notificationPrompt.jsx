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
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const PUBLIC_VAPID_KEY =
    "BISJ4IiiIxkE0BVgbqgOZTYJQHN4PUSLvPYZ2KrS5R3yyW9BO3ABLsuw9AK2b4yYn9BeKhD7bke5ejq_yF0_Exs";

  useEffect(() => {
    if ("Notification" in window && user?._id) {
      if (
        Notification.permission === "default" ||
        Notification.permission === "denied"
      ) {
        setShowPrompt(true);
      }
    } else {
      console.warn("Notifications are not supported in this browser.");
    }
  }, [user]);

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

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(async (permission) => {
        if (permission === "granted") {
          try {
            const registration = await navigator.serviceWorker.ready;
            if (!registration.pushManager) {
              setErrorMessage("Push notifications are not supported.");
              setShowPrompt(false);
              return;
            }

            const subscription = await registration?.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
            });

            await dispatch(
              subscribeToNotifications({
                subscription: JSON.stringify(subscription),
                id: user?._id,
              })
            ).unwrap();

            console.log("Subscription successfully sent to backend.");
            setShowPrompt(false);
          } catch (error) {
            setErrorMessage(
              "Failed to send subscription to backend. Please try again."
            );
            console.error("Error:", error);
          }
        } else {
          setErrorMessage("Notification permission denied.");
          setShowPrompt(false);
        }
      });
    } else {
      setErrorMessage(
        "Notifications are not supported in this browser. Please install the app to get notifications."
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

        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 2, fontSize: "0.85rem" }}
          >
            {errorMessage}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button variant="outlined" onClick={() => setShowPrompt(false)}>
            Not now
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={requestNotificationPermission}
          >
            Enable
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationPrompt;
