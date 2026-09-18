import { compile } from '@mdx-js/mdx';

async function run() {
  const mdx = `
<TestComponent items={[ { prop: <StyledText>Test</StyledText> } ]} />
  `;
  try {
    const result = await compile(mdx, { development: false });
    console.log(result.value);
  } catch(e) {
    console.error("COMPILER ERROR:", e.message);
  }
}
run();
