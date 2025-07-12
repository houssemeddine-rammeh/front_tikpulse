import { useRegisterSW } from "virtual:pwa-register/react";
import { Snackbar, Paper, Typography, Button, Box } from "@mui/material";

function PWABadge() {
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          /** @type {ServiceWorker} */
          const sw = e.target;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <Snackbar
      open={offlineReady || needRefresh}
      onClose={close}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          borderRadius: 2,
          minWidth: 300,
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">
          {offlineReady
            ? "App ready to work offline"
            : "New content available, click reload to update."}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {needRefresh && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </Button>
          )}
          <Button variant="outlined" onClick={close}>
            Close
          </Button>
        </Box>
      </Paper>
    </Snackbar>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param period {number}
 * @param swUrl {string}
 * @param r {ServiceWorkerRegistration}
 */
function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
