declare module "*.mdx" {
  const component: (
    props: React.PropsWithChildren<Record<string, any>>
  ) => JSX.Element;

  export default component;
}
