import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  switch (user.role) {
    case "admin":
      redirect("/dashboard/admin");

    case "user":
      redirect("/dashboard/user");

    case "artist":
      redirect("/dashboard/artist");

    default:
      redirect("/");
  }
}