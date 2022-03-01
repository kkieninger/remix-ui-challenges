 import { Link } from "remix";
 import { Logos } from "~/components";

const Index = () => (
  <div className="flex justify-center flex-col items-center min-h-screen pb-60">
    <h1 className="mb-5 text-7xl">
      UI Challenges
    </h1>
    <p className="text-md mb-8">
      A set of simple UI exercises designed to be completed in under an hour
    </p>
    <nav className="mb-4">
      <ul>
        <li>
          <Link
            to="challenges"
            className="text-slate-400 text-xl transition-all ease-in hover:text-slate-500 mb-6 block"
          >
            See challenges
          </Link>
        </li>
      </ul>
    </nav>
    <Logos />
  </div>
);


export default Index;
