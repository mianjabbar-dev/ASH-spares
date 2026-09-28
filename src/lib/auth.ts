import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface AdminSession {
  id: string;
  username: string;
  name?: string | null;
  isLoggedIn: boolean;
}

export interface SessionData {
  admin?: AdminSession;
}

const sessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "auto_parts_admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AdminSession | null> {
  const admin = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!admin || !admin.isActive) {
    return null;
  }

  const valid = await verifyPassword(password, admin.password);
  if (!valid) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
    name: admin.name,
    isLoggedIn: true,
  };
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session.admin?.isLoggedIn) {
    throw new Error("Unauthorized");
  }
  return session.admin;
}
