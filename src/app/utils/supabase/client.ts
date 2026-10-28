import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

let supabaseClient: any = null;

export function createClient() {
  if (!supabaseClient) {
    try {
      supabaseClient = createSupabaseClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
            storageKey: 'focuspod-auth'
          }
        }
      );
      
      // Wrap auth methods to suppress errors
      const originalGetSession = supabaseClient.auth.getSession.bind(supabaseClient.auth);
      const originalSignInWithPassword = supabaseClient.auth.signInWithPassword.bind(supabaseClient.auth);
      const originalSignOut = supabaseClient.auth.signOut.bind(supabaseClient.auth);
      
      supabaseClient.auth.getSession = async () => {
        try {
          return await originalGetSession();
        } catch (error) {
          // Silently return empty session
          return { data: { session: null }, error: null };
        }
      };
      
      supabaseClient.auth.signInWithPassword = async (credentials: any) => {
        try {
          return await originalSignInWithPassword(credentials);
        } catch (error) {
          throw error; // Re-throw for proper error handling in UI
        }
      };
      
      supabaseClient.auth.signOut = async () => {
        try {
          return await originalSignOut();
        } catch (error) {
          // Silently succeed
          return { error: null };
        }
      };
      
    } catch (error) {
      // Silently skip - using demo mode
    }
  }
  return supabaseClient;
}