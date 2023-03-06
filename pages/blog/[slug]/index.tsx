import { useRouter } from "next/router";
import { ReactElement } from "react";
import BlogLayout from "../../../layout/BlogLayout";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { markdownComponents } from "../../../components/markdown-components";
import prisma from "../../../lib/prisma";

const Page = ({ source }:  { source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>> }) => {
  return (<MDXRemote components={markdownComponents} {...source } />);
}

export async function getStaticProps(context: any) {
  const slug = context.params.slug;
  const source = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
    select: {
      markdown: true,
    },
  })
  const mdxSource = await serialize(source?.markdown || 'This Blog Post Does Not Exist');
  return { props: { source: mdxSource }};
}

export async function getStaticPaths() {
  const paths = await prisma.post.findMany({
    where: { 
      published: true
    },
    select: {
      slug: true,
    },
  });

  return {
    paths: paths.map((path) => { return {params: { slug: path.slug }}}),
    fallback: false,
  }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <BlogLayout>
      {page}
    </BlogLayout>
  )
}
export default Page;