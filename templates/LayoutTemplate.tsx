import { Footer } from "../components/Footer";
import { Header } from "../components/Header/Header";
import { ReactNode } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { UseClientContext } from "../components/context/ClientContext";
import { NavPayment } from "../components/NavPayment";

interface LayoutTemplateProps {
  children: ReactNode;
}

export const LayoutTemplate = ({ children }: LayoutTemplateProps) => {
  const { orderID } = UseClientContext();
  return (
    <div className="flex flex-col w-screen  min-h-screen">
      <NextSeo title="E-commerce" description="Algorytm Luhna" />
      <Header />
      <div className="flex flex-grow ">{children}</div>
      <Footer />
    </div>
  );
};
