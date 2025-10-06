
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/lib/firebase/error-emitter';

// This is an invisible component that listens for permission errors
// and throws them so that the Next.js development error overlay can catch
// and display them. This is for development-time debugging ONLY.
export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: Error) => {
        // We throw the error here to make it visible in the Next.js dev overlay.
        // This provides a much better debugging experience for security rules.
        throw error;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}

    