import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { extractIdFromUrl } from "@/libs/extractFromUrl";

export async function GET(req: NextRequest) {
  try {
    await serverAuth();

    const url = req.url;
    const movieId = extractIdFromUrl(url);

    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!movieId) {
      throw new Error("Missing Id");
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
