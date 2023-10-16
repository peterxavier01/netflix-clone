import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoritedMovies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
