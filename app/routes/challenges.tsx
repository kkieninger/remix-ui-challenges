import type { LoaderFunction } from "remix";
import { Outlet, Link, useLoaderData } from "remix";

import type { Challenge } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Layout } from "~/components";

type LoaderData = { challenges: Challenge[] };

export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    challenges: await db.challenge.findMany({
      orderBy: { title: "asc" },
    }),
  };

  return data;
}

const ChallengesRoute = () => {
  const { challenges } = useLoaderData<LoaderData>();

  return (
    <Layout challenges={challenges}>
      <div>
        <header>
          <div className="flex justify-end mb-4">
            <Link
              to="/"
              title="UI Challenges"
              aria-label="UI Challenges"
              className="text-sky-500 hover:text-sky-300 transition ease-in ml-4"
            >
              home
            </Link>
            <Link
              to="/about"
              title="UI Challenges"
              aria-label="UI Challenges"
              className="text-sky-500 hover:text-sky-300 transition ease-in ml-4"
            >
              about
            </Link>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Layout>
  );
}

export default ChallengesRoute;
