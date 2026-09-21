const fs = require('fs');

const files = fs.readdirSync('src/content/resources').filter(f => f.endsWith('.mdx')).map(f => 'src/content/resources/' + f);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  const tableRegex = /<TheImpactTable([^>]*)>([\s\S]*?)<\/TheImpactTable>/g;
  
  content = content.replace(tableRegex, (match, tableProps, children) => {
    if (!children.includes('<ImpactTableMetric')) return match;

    const metricRegex = /<ImpactTableMetric\s+metric=\{([^}]+)\}\s+beforeObrive=\{([^}]+)\}\s+afterObrive=\{([^}]+)\}\s*\/>/g;
    let metricsObj = [];
    
    let m;
    while ((m = metricRegex.exec(children)) !== null) {
      metricsObj.push(`{ metric: ${m[1]}, beforeObrive: ${m[2]}, afterObrive: ${m[3]} }`);
    }
    
    // Also try without curly braces in props? Usually it has them in my MDX files.
    
    if (metricsObj.length > 0) {
      return `<TheImpactTable${tableProps}\n  metrics={[\n    ${metricsObj.join(',\n    ')}\n  ]}\n/>`;
    }
    return match;
  });
  
  fs.writeFileSync(file, content, 'utf8');
}
