import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const FIFTEEN_MINUTES = 900;
const THIRTY_MINUTES = 1800;
const FORTY_FIVE_MINUTES = 2700;
const SIXTY_MINUTES = 3600;

const getChallenges = () => (
  [
    {
      title: "Like Button",
      description: `Implement a like button in React. The button should be able to toggle between "like" and "unlike" statuses`,
      timeAllotted: FIFTEEN_MINUTES,
    },
    {
      title: "Authenticated Content",
      description: `Simulate an authenticated user flow in React.`,
      timeAllotted: THIRTY_MINUTES,
    },
    {
      title: "Stopwatch",
      description: `Implement the stopwatch on this page in React. How you wish to format the time is up to you, but the stopwatch should be able to start, stop, and reset time. Bonus points for implementing a UI that displays that a sort of "time limit" has been reached. No peeking ;)`,
      timeAllotted: SIXTY_MINUTES,
    },
    {
      title: "Sign Up Form",
      description: `Implement a sign up form that creates a user to an API on form submission. Submit your requests to POST https://jsonplaceholder.typicode.com/posts. The form should be completely semantic and accessible following HTML5 principles.`,
      timeAllotted: FORTY_FIVE_MINUTES,
    },
    {
      title: "To-Do App",
      description: `Create a simple to-do app. Your application should be able to add to-do items, delete to-do items, and select / deselect to-do items.`,
      timeAllotted: FORTY_FIVE_MINUTES,
    },
  ]
);

const seed = async () => {
  await Promise.all(
    getChallenges().map(challenge => db.challenge.create({ data: challenge }))
  )
}

seed();
