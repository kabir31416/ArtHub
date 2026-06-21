import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    
    baseURL: "http://localhost:3000"
})

const Login = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signIn, signUp, useSession } = createAuthClient()