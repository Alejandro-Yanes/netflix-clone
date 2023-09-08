import useCurrentUser from "@/hooks/getCurrentUser";
import type { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="font-bold">Netflix Clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Log Out
      </button>
    </>
  );
}
