"use client";

import { useRouter } from "next/navigation";

import PageContent from "./_components/PageContent";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Auth = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) router.push("/");

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            width={800}
            height={800}
            className="h-auto w-40 object-contain"
            alt="Logo"
            priority
          />
        </nav>
        <div className="flex justify-center">
          <PageContent />
        </div>
      </div>
    </div>
  );
};

export default Auth;
