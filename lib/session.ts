import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getCurrentSchoolId() {
  const session = await getServerSession(authOptions);
  return session?.user?.schoolId;
}
