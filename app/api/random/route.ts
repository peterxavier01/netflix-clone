import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function GET() {
  try {
    await serverAuth();

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
