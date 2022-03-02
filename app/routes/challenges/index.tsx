import type { LoaderFunction } from "remix";
import { useLoaderData, useCatch, useParams } from "remix";

import type { Challenge } from "@prisma/client";
import { db } from "~/utils/db.server";

import { Stopwatch, Solution } from "~/components";

type LoaderData = { randomChallenge: Challenge };

export const loader: LoaderFunction = async () => {
  const count = await db.challenge.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomChallenge] = await db.challenge.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  if (!randomChallenge) {
    throw new Response("404 - Challenge Not Found", { status: 404 });
  }

  return { randomChallenge };
};

export const CatchBoundary = () => {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return (
      <div>
        <h1>{`404: Challenge ${params.challengeId} not found`}</h1>
      </div>
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`);
}

export const ErrorBoundary = () => {
  return (
    <div>
      Something went wrong.
    </div>
  );
}

const ChallengeIndexRoute = () => {
  const { randomChallenge } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-thin">
          challenge.{' '}
          <span className="font-normal">
            {randomChallenge.title}
          </span>
        </h2>
        <Stopwatch expiration={randomChallenge?.timeAllotted} />
      </div>
      <div>
        {/* <h2 className="text-4xl font-normal"></h2> */}
        <p className="mb-2 font-semibold text-sky-300">Here's a random challenge for you:</p>
        <p className="mb-2">{randomChallenge?.description}</p>
      </div>

      <Solution path={`~/app/routes/challenges/index.tsx`}>
        {/* @TODO - Implement */}
      </Solution>
    </div>
  )
}

export default ChallengeIndexRoute;
