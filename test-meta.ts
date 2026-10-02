import { generateMetadata } from './src/app/(public)/services/[slug]/page';

async function test() {
  const meta = await generateMetadata({ params: Promise.resolve({ slug: 'augmented-reality-development' }) });
  console.log(meta.title);
}

test().catch(console.error);
