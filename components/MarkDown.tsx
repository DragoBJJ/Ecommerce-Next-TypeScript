import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkDownResult } from "../utils/type";
import ReactMarkdown from "react-markdown";
import { ReactChild, ReactNode } from "react";

export const MarkDownNext = ({ children }: { children: string }) => {
  const domain = process.env.LOCAL_DOMAIN;
  console.log("DOMAIN", domain);
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) return <a {...props}></a>;

          if (domain && !href.includes(domain) && href.startsWith("/")) {
            return <a href={href} rel="noopener noreferrer" {...props}></a>;
          }

          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

{
  /* <article className=" w-auto h-auto prose lg">
            <ReactMarkdown>
              {`[link do produktu ${product.id}](/products/${product.id})`}
            </ReactMarkdown>
          </article> */
}
