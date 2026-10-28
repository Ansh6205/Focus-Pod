/**
 * Global error suppression for production demo mode
 * Prevents console spam and provides graceful fallbacks
 */

// Suppress fetch errors globally
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    return await originalFetch(...args);
  } catch (error) {
    // Silently fail - safeFetch wrapper will handle this
    throw error;
  }
};

// Suppress console errors in production
if (process.env.NODE_ENV === 'production') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    // Filter out known network errors
    const message = args[0]?.toString() || '';
    if (
      message.includes('Failed to fetch') ||
      message.includes('NetworkError') ||
      message.includes('ERR_CONNECTION_REFUSED') ||
      message.includes('AuthRetryableFetchError')
    ) {
      return; // Suppress
    }
    originalError(...args);
  };
}

export function initErrorSuppression() {
  // Already initialized above
  return true;
}
