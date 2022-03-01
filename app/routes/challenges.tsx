import type { LoaderFunction } from "remix";
import { Outlet, Link, useLoaderData, useNavigate } from "remix";

import type { Challenge } from "@prisma/client";
import { db } from "~/utils/db.server";

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
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div>
          <h1>
            <Link
              to="/"
              title="UI Challenges"
              aria-label="UI Challenges"
            >
              Challenges
            </Link>
          </h1>
        </div>
      </header>
      <main>
        <div>
          <div>
            <Link to=".">Get a random challenge</Link>
            <label htmlFor="challenges">
              Challenges
              <select
                name="challenges"
                id="challenges"
                onChange={(e) => navigate(`./${e.target.value}`, { replace: true })}
              >
                {challenges.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>{challenge.title}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChallengesRoute;
