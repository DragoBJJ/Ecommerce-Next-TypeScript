import { ReactChild, ReactNode } from "react";

interface GridTemplateProps {
  children: ReactChild;
}

export const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <div className="grid grid-cols-12 p-6 min-h-screen w-screen place-x-center">
      {children}
    </div>
  );
};
