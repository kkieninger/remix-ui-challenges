import type { Challenge } from "@prisma/client";
import type { ReactElement } from "react";

import Sidebar from "../Sidebar";

interface Props {
  children?: ReactElement | ReactElement[];
  challenges: Challenge[];
}

const Layout = ({ children, challenges }: Props) => {
  return (
    <div className="md:grid md:gap-4 md:grid-cols-12 min-h-screen">
      <div className="md:col-span-3 bg-slate-800 py-4 px-5">
        <Sidebar challenges={challenges} />
      </div>
      <div className="md:col-span-9 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
