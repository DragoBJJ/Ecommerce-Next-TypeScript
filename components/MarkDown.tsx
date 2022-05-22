import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

export const MarkDownNext = ({
  children
}: {
  children: MDXRemoteSerializeResult<Record<string, unknown>>;
}) => {
  const domain = process.env.LOCAL_DOMAIN;
  return (
    <MDXRemote
      {...children}
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
    ></MDXRemote>
  );
};

{
  /* <article className=" w-auto h-auto prose lg">
            <ReactMarkdown>
              {`[link do produktu ${product.id}](/products/${product.id})`}
            </ReactMarkdown>
          </article> */
}
