import type { MDXComponents } from "mdx/types";
import { prose } from "@/components/prose/elements";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...prose, ...components };
}
