import { ReactChild, ReactNode } from "react";

interface GridTemplateProps {
  children: ReactNode;
}

export const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <div className="grid grid-cols-12 p-10 border-2 border-red-500">
      {children}
    </div>
  );
};
