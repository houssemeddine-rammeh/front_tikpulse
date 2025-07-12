/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

// No TypeScript declarations needed in JS file
clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();