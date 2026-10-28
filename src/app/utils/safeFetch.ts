/**
 * Safe fetch wrapper that suppresses all network errors
 * Returns null on failure instead of throwing
 */
export async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    // Completely suppress all fetch errors
    return null;
  }
}

/**
 * Check if backend is available (silent check)
 */
let backendAvailable: boolean | null = null;

export async function isBackendAvailable(projectId: string, publicAnonKey: string): Promise<boolean> {
  if (backendAvailable !== null) {
    return backendAvailable;
  }
  
  try {
    const response = await safeFetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-36dd771d/health`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );
    
    backendAvailable = response !== null && response.ok;
    return backendAvailable;
  } catch {
    backendAvailable = false;
    return false;
  }
}

export function resetBackendCheck() {
  backendAvailable = null;
}
