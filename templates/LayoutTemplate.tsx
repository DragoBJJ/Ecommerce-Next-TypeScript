import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { ReactNode } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

interface LayoutTemplateProps {
  children: ReactNode;
}

export const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo title="E-commerce" description="Algorytm Luhna" />
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
