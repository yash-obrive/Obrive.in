const blogCard = require("./src/constants/pages/resources/blog-card");
const all = blogCard.BlogCardContent;
const slugCounts = {};
for (const item of all) {
  if (!slugCounts[item.slug]) slugCounts[item.slug] = [];
  slugCounts[item.slug].push(item.type);
}
for (const [slug, types] of Object.entries(slugCounts)) {
  if (types.length > 1) {
    console.log(`DUPLICATE: ${slug} -> ${types.join(", ")}`);
  }
}
