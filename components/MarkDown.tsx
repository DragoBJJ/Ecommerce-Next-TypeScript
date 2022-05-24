import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const MarkDownNext = ({ children }: { children: string }) => {
  const domain = process.env.LOCAL_DOMAIN;
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
