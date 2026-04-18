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
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  let firebaseApp: FirebaseApp;

  try {
    // 1. Attempt to initialize via Firebase App Hosting automatic environment variables
    firebaseApp = initializeApp();
  } catch (e) {
    // 2. Fallback to manual configuration
    const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== "";
    
    // During production build, we log a warning but don't crash the whole process
    if (!isConfigValid && process.env.NODE_ENV === "production") {
      console.warn("Firebase configuration is missing or invalid. Deployment may fail at runtime if Firebase is accessed.");
    }
    
    firebaseApp = initializeApp(firebaseConfig);
  }

  return getSdks(firebaseApp);
}

/**
 * Safely retrieves SDK instances. If initialization fails (e.g. invalid-api-key),
 * it returns nulls to be handled by the FirebaseProvider.
 */
export function getSdks(firebaseApp: FirebaseApp) {
  try {
    return {
      firebaseApp,
      auth: getAuth(firebaseApp),
      firestore: getFirestore(firebaseApp)
    };
  } catch (err) {
    // This often happens during build/export if environment variables are missing
    if (process.env.NODE_ENV === 'production') {
      console.warn("Firebase SDK initialization failed (likely due to missing build-time secrets).", err);
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
