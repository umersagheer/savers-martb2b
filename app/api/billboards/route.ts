import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await getServerSession();
  try {
    const body = await req.json();

    const { title, image } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!image || !title) {
      return new NextResponse("All fields Required", { status: 400 });
    }

    const billboard = await prisma.billboard.create({
      data: {
        title,
        image,
      },
    });

    revalidatePath("/");

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const billboard = await prisma.billboard.findMany();
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
