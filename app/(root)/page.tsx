import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import PageContent from "./_components/PageContent";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  return <PageContent />;
};

export default Home;
