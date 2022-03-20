import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkDownResult } from "../utils/type";
import ReactMarkdown from "react-markdown";

export const MarkDownNext = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) return <a {...props}></a>;

          if (!href.includes("NASZA_DOMENA")) {
            return <a rel="noopener noreferrer" {...props}></a>;
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
