import { compile } from "@mdx-js/mdx";

async function run() {
  const mdx = `
<MyComponent
  title={<>Hello <span>world</span></>}
/>
  `;
  try {
    const result = await compile(mdx, { development: false });
    console.log(result.value);
  } catch (e) {
    console.error(e);
  }
}
run();
