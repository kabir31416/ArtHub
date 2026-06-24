
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";


import { redirect } from "next/navigation";

export default async function RoleLayout({
  children,
  params,
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const userRole = session.user.role;
  const routeRole = params.role;

  if (userRole !== routeRole) {
    redirect(`/dashboard/${userRole}`);
  }

  return children;
}