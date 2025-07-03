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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    // Check if the Notification API is supported by the browser
    console.log("***************s", user)

    if ("Notification" in window && user?.user?._id) {
      console.log("***************s")
      if (
        Notification.permission === "default" ||
        Notification.permission === "denied"
      ) {
        setShowPrompt(true);
      }
    } else {
      console.warn("Notifications are not supported in this browser.");
    }
  }, [user, user?.user?._id]);

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
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
          console.log("Notification permission granted.");
          // Wait for service worker to be ready
          const registration = await navigator.serviceWorker.ready;
          if (!registration.pushManager) {
            console.warn("Push notifications not supported");
            setShowPrompt(false);
            return;
          }

          // Subscribe user
          const subscription = await registration?.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BCmbR_RBLSDogp8ICcsirbM7ogetsCAu-VmiiYisBVhGD4uS_DPS9pEcD_60SKRy8aOc-k056jf9lZWhlVfYwtY"
            ),
          });

          // Send subscription to backend
          dispatch(
            subscribeToNotifications({
              subscription: JSON.stringify(subscription),
              id: user?.user?._id,
            })
          );

          console.log("User subscribed:", subscription);

          setShowPrompt(false);
        } else {
          console.warn("Notification permission denied.");
          setShowPrompt(false);
        }
      });
    } else {
      // iOS doesn't support notifications in the browser, suggest adding to home screen
      console.warn(
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
