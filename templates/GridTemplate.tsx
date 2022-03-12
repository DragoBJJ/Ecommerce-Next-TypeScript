import { ReactChild, ReactNode } from "react";

interface GridTemplateProps {
  children: ReactNode;
}

export const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <div className="grid grid-cols-12 p-4 h-screen w-screen">{children}</div>
  );
};
