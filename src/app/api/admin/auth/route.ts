import { NextRequest, NextResponse } from "next/server";
import { getSession, authenticateAdmin } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;
    const admin = await authenticateAdmin(username, password);

    if (!admin) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const session = await getSession();
    session.admin = admin;
    await session.save();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (session.admin?.isLoggedIn) {
      return NextResponse.json({ authenticated: true, admin: session.admin });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
