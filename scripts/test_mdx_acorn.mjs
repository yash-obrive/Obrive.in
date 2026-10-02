import { compile } from '@mdx-js/mdx';

async function check() {
  const mdx = `<div title="Test & test"></div>`;
  try {
    await compile(mdx, { jsx: true, development: false });
    console.log("SUCCESS!");
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
check();
