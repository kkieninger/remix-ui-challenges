import type { ReactElement } from "react";

const Solution = ({ children, path }: { children?: ReactElement | ReactElement[]; path: string; }) => (
  <div className="rounded bg-black min-h-[600px] p-4 mt-6">
    <p className="flex items-center mb-2">
      <code className="text-white normal-case">{path}</code>
      {/* <span className="animate-blink inline-block h-[22px] w-[12px] bg-[#606060] ml-2"></span> */}
    </p>
    {children}
  </div>
);

export default Solution;
