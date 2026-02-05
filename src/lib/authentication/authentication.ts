import { createClient } from "../supabase/client";

export async function signInWithEmail(email: string) {
    const supabase = createClient();
    
    const {data, error} = await supabase.auth.signInWithOtp({
        email: email
    });
}

export async function signInWithGoogle() {
    const supabase = createClient();
    
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/authentication/callback?provider=google'
        }
    });
}

export async function signInWithGitHub() {
    const supabase = createClient();
    
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/authentication/callback?provider=github'
        }
    });
}

export async function authenticateWithOTP(token_hash: string): Promise<{ success: boolean, errorCode?: string }> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token_hash,
        type: "email"
    });

    return { success: !Boolean(error), errorCode: error?.code };
}

export async function authenticateWithOAuth(code: string): Promise<{ success: boolean }> {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log(error);

    return { success: !Boolean(error) };
}



