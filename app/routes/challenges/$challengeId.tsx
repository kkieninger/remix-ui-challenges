import type { MetaFunction } from "remix";
import { LoaderFunction, useLoaderData, useCatch, useParams } from "remix";

import type { Challenge } from "@prisma/client";
import { db } from "~/utils/db.server";

import { Stopwatch } from "~/components";

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
      <Stopwatch expiration={challenge?.timeAllotted} />
      <div>
        <p>Here's a random challenge:</p>
        <p>{challenge?.title}</p>
        <p>{challenge?.description}</p>
        <p>
          {`${Number(challenge?.timeAllotted) / 60} minutes`}
        </p>

        <p>To implement, navigate to <code>~/app/routes/challenges/$challengeId.tsx</code> to begin.</p>
      </div>

      <div>
        {/* @TODO - Implement */}

      </div>
    </div>
  )
}

export default ChallengeRoute;
