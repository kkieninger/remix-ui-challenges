import type { LoaderFunction } from "remix";
import { useLoaderData, useCatch, useParams } from "remix";

import type { Challenge } from "@prisma/client";
import { db } from "~/utils/db.server";

import { Stopwatch } from "~/components";

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
      <Stopwatch expiration={randomChallenge?.timeAllotted} />
      <div>
        <p>Here's a random challenge:</p>
        <p>{randomChallenge?.title}</p>
        <p>{randomChallenge?.description}</p>
        <p>
          {`${Number(randomChallenge?.timeAllotted) / 60} minutes`}
        </p>

        <p>To implement, navigate to <code>~/app/routes/challenges/index.tsx</code> to begin.</p>
      </div>

      <div>
        {/* @TODO - Implement */}

      </div>
    </div>
  )
}

export default ChallengeIndexRoute;
