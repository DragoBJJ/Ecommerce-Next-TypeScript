import { GridTemplate } from "./GridTemplate";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { ReactNode } from "react";

interface LayoutTemplateProps {
  children: ReactNode;
}

export const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-grow flex-col min-w-screen  min-h-screen  border-2 border-red-400">
        {children}
      </div>
      <Footer />
    </>
  );
};
