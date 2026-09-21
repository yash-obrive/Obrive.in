const blogs = require('./src/data/blogs.json');
for (const blog of blogs) {
  for (const section of blog.sections) {
    if (section.title.toLowerCase().includes('metric') || section.title.toLowerCase().includes('impact') || section.title.toLowerCase().includes('table')) {
      console.log(`Blog: ${blog.title} -> Section: ${section.title}`);
      console.log(section.content.slice(0, 2));
    }
  }
}
