import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { without } from "lodash";

import { authOptions } from "../auth/[...nextauth]/route";

import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const { movieId } = await req.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email");
    }

    const updatedFavoriteIds = without(user.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
