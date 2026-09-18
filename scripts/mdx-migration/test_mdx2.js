import { compile } from '@mdx-js/mdx';

async function run() {
  const mdx = `
<TheImpactTable
  columns={[
    { key: "feature", header: "Feature", width: "20%", bold: true }
  ]}
  data={[
    { feature: "Accessibility" }
  ]}
/>
  `;
  try {
    const result = await compile(mdx, { development: false });
    console.log(result.value);
  } catch(e) {
    console.error(e);
  }
}
run();
