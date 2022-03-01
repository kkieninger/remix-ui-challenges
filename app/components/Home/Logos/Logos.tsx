import RemixLogo from "./components/RemixLogo";
import TailwindLogo from "./components/TailwindLogo";
import PrismaLogo from "./components/PrismaLogo";

const Logos = () => (
  <>
    <p className="font-light mb-1 text-sm">Built with:</p>
    <div className="flex justify-center items-center mb-1">
      <RemixLogo />
      <TailwindLogo />
      <PrismaLogo />
    </div>
  </>
);

export default Logos;
