import type { MetaFunction } from "remix";
import { LoaderFunction, useLoaderData, useCatch, useParams } from "remix";

import type { Challenge } from "@prisma/client";
import { db } from "~/utils/db.server";

import { Stopwatch, Solution } from "~/components";

type LoaderData = { challenge: Challenge | null };

export const meta: MetaFunction = ({ data }: { data?: LoaderData }) => {
  if (!data) {
    return {
      title: "No Challenge",
      description: "404 - No challenge found"
    }
  }

  return {
    title: `UI Challenge - ${data.challenge?.title}`,
    description: `UI Challenge - ${data.challenge?.title}`,
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const data: LoaderData = {
    challenge: await db.challenge.findUnique({
      where: { id: Number(params.challengeId) || 0 },
    })
  }

  if (!data.challenge) {
    throw new Response("404 - Challenge Not Found", { status: 404 });
  }

  return data;
};

export const CatchBoundary = () => {
  const caught = useCatch();
  const params = useParams();

  if (caught.status === 404) {
    return (
      <div>
        <h1>{`404: Challenge ${params.challengeId} not found`}</h1>
        <iframe
          src="https://giphy.com/embed/joV1k1sNOT5xC"
          width="480"
          height="272"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`);
}

export const ErrorBoundary = () => {
  const { challengeId } = useParams();

  return (
    <div>
      {`Sorry, but there was an error loading challenge ID: ${challengeId}`}
    </div>
  )
}

const ChallengeRoute = () => {
  const { challenge } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-thin">
          challenge.{' '}
          <span className="font-normal">
            {challenge?.title}
          </span>
        </h2>
        <Stopwatch expiration={challenge?.timeAllotted} />
      </div>
      <div>
        {/* <h2 className="text-4xl font-normal"></h2> */}
        <p className="mb-2 font-semibold text-sky-300">Here's a challenge for you:</p>
        <p className="mb-2">{challenge?.description}</p>
      </div>

      <Solution path={`~/app/routes/challenges/$challengeId.tsx`}>
        {/* @TODO - Implement */}
      </Solution>
    </div>
  )
}

export default ChallengeRoute;
