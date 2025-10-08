import { initFirebase } from './firebase';

// Kick off Firebase initialization on the client
initFirebase().catch(() => {
  // Swallow errors to avoid breaking the page if Firebase is unavailable
});
