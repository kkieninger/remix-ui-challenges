 import { Link } from "remix";

const Index = () => (
  <div>
    <h1>
      UI Challenges
    </h1>
    <nav>
      <ul>
        <li>
          <Link to="challenges">See challenges</Link>
        </li>
      </ul>
    </nav>
  </div>
);


export default Index;
