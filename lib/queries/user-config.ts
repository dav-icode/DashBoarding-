"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getUserData() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  if (!session.user) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
}
