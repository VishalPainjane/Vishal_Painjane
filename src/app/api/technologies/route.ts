import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const techs = await prisma.technology.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(techs);
  } catch (error) {
    console.error("Failed to fetch technologies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, icon } = body;

    if (!name || !icon) {
        return NextResponse.json({ error: "Name and Icon are required" }, { status: 400 });
    }

    const tech = await prisma.technology.create({
      data: {
        name,
        icon,
      },
    });

    revalidateTag("technologies", "default");

    return NextResponse.json(tech, { status: 201 });
  } catch (error) {
    console.error("Failed to create technology:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
