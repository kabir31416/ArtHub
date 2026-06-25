import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"


export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [jwtClient]
})

const Login = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export const { signIn, signUp, useSession } = createAuthClient()