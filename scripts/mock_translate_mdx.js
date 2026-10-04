const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Not available? We can just write a quick recursive function.

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const baseDirs = ['career', 'docs', 'faq', 'legal', 'resources', 'security', 'support'];
const langs = ['ar', 'de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'ms', 'nl', 'pt', 'sv', 'th', 'zh', 'ru'];

baseDirs.forEach(bdir => {
  const srcDir = path.join(process.cwd(), 'src', 'content', bdir);
  if (!fs.existsSync(srcDir)) return;

  walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.mdx')) return;
    const relPath = path.relative(srcDir, filePath);
    
    langs.forEach(lang => {
      const targetPath = path.join(process.cwd(), 'src', 'content', lang, bdir, relPath);
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Mock translation
        content = content.replace(/title:\s*"(.*?)"/, `title: "[${lang.toUpperCase()}] $1"`);
        content = content.replace(/^#\s+(.*)/gm, `# [${lang.toUpperCase()}] $1`);
        
        fs.writeFileSync(targetPath, content);
      }
    });
  });
});
console.log('Mock translation complete.');
