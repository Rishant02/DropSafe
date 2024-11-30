import { getCurrentUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user: currentUser });
};
