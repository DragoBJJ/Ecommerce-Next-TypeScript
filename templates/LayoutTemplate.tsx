import { GridTemplate } from "./GridTemplate";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { ReactChild, ReactNode } from "react";

interface LayoutTemplateProps {
  children: ReactNode;
}

export const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
  return (
    <>
      <Header />
      <main className="bg-sky-900 flex-grow mx-auto">
        <GridTemplate>{children}</GridTemplate>
      </main>
      <Footer />
    </>
  );
};
