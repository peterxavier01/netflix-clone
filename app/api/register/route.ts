import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json("Email taken", { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
