import { compileMDX } from "next-mdx-remote/rsc";
import React from "react";
import { renderToString } from "react-dom/server";

const mdxSource = `
<TestComponent items={[{ description: <>Hello</> }]} />
`;
const components = {
  TestComponent: (props) => {
    console.log("Props items length:", props.items?.length);
    console.log("description:", props.items?.[0]?.description);
    return React.createElement("div", null, "Test");
  },
};
async function test() {
  const { content } = await compileMDX({ source: mdxSource, components });
  const html = renderToString(content);
  console.log("HTML:", html);
}
test();
