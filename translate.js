const fs = require('fs');

async function translate(text, retries = 3) {
  if (!text || text.trim() === '') return text;
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ja&dt=t`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `q=${encodeURIComponent(text)}`
    });
    if (!res.ok) {
      if (res.status === 429 && retries > 0) {
        await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
        return translate(text, retries - 1);
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const json = await res.json();
    let translated = '';
    if (json && json[0]) {
      for (const item of json[0]) {
        if (item[0]) translated += item[0];
      }
    }
    // Basic terminology checks
    translated = translated.replace(/オブライブ/g, 'Obrive');
    translated = translated.replace(/オブライヴ/g, 'Obrive');
    return translated || text;
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
      return translate(text, retries - 1);
    }
    console.error('Failed to translate:', text.substring(0, 30), err.message);
    return text; // Fallback to english
  }
}

async function main() {
  const enPath = 'src/dictionaries/en.json';
  const jaPath = 'src/dictionaries/ja.json';
  
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const ja = JSON.parse(fs.readFileSync(jaPath, 'utf8'));
  
  const keysToTranslate = [];
  for (const key of Object.keys(en)) {
    if (!(key in ja)) {
      keysToTranslate.push(key);
    }
  }
  
  console.log(`Found ${keysToTranslate.length} missing keys to translate.`);
  
  const CONCURRENCY = 15;
  let active = 0;
  let index = 0;
  let completed = 0;
  
  const results = {};
  
  await new Promise((resolve) => {
    function next() {
      if (index >= keysToTranslate.length) {
        if (active === 0) resolve();
        return;
      }
      
      while (active < CONCURRENCY && index < keysToTranslate.length) {
        const i = index++;
        const key = keysToTranslate[i];
        active++;
        
        translate(en[key]).then(translated => {
          results[key] = translated;
          completed++;
          active--;
          if (completed % 100 === 0) {
            console.log(`Translated ${completed}/${keysToTranslate.length}`);
            // Periodic save just in case
            const tempJa = { ...ja, ...results };
            // Ensure order matches en.json
            const orderedTempJa = {};
            for (const k of Object.keys(en)) {
              if (k in tempJa) {
                orderedTempJa[k] = tempJa[k];
              }
            }
            fs.writeFileSync(jaPath, JSON.stringify(orderedTempJa, null, 2) + '\n');
          }
          next();
        });
      }
    }
    next();
  });
  
  const finalJa = { ...ja, ...results };
  const orderedJa = {};
  for (const k of Object.keys(en)) {
    if (k in finalJa) {
      orderedJa[k] = finalJa[k];
    }
  }
  
  fs.writeFileSync(jaPath, JSON.stringify(orderedJa, null, 2) + '\n');
  console.log('Translation complete and written to ja.json');
}

main().catch(console.error);
