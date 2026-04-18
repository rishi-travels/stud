'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

/**
 * Initializes Firebase with safe checks for environment variables.
 * Prevents crashes during build-time pre-rendering if keys are missing.
 */
export function initializeFirebase() {
  // 1. Check if an app is already initialized
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // 2. Determine if we have a valid configuration to attempt initialization
  const hasConfig = !!(firebaseConfig.apiKey && firebaseConfig.apiKey !== "");

  try {
    let app: FirebaseApp;
    
    if (!hasConfig) {
      // If no config, try parameterless init (only works in Firebase App Hosting environments)
      try {
        app = initializeApp();
      } catch (e) {
        // Build-time fallback: Return null SDKs if no config is available
        return {
          firebaseApp: null as any,
          auth: null as any,
          firestore: null as any
        };
      }
    } else {
      app = initializeApp(firebaseConfig);
    }

    return getSdks(app);
  } catch (err) {
    // Graceful failure for build-time or invalid configuration
    return {
      firebaseApp: null as any,
      auth: null as any,
      firestore: null as any
    };
  }
}

/**
 * Safely retrieves SDK instances. 
 * Firebase SDKs like getAuth() will throw if the API key is invalid/missing.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  try {
    return {
      firebaseApp,
      auth: getAuth(firebaseApp),
      firestore: getFirestore(firebaseApp)
    };
  } catch (err) {
    // This catches 'auth/invalid-api-key' specifically
    if (process.env.NODE_ENV === 'production') {
      console.warn("Firebase SDK initialization failed (likely due to missing/invalid build-time secrets).", err);
    }
    return {
      firebaseApp,
      auth: null as any,
      firestore: null as any
    };
  }
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
