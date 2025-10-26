import { Session } from "inspector/promises";
import { redirect } from "next/navigation";

export default function Home() {
  if (!Session) {
    redirect("/Login");
  }

  redirect("/dashboard");
}
