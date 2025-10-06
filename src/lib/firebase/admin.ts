
import { getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let app: App;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp();
} else {
  app = getApps()[0];
}

db = getFirestore(app);

export { db };
