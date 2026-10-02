const fs = require('fs');
const translate = require('translate-google');

const en = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));
const esPath = 'src/dictionaries/es.json';
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const missingKeys = Object.keys(en).filter(k => es[k] === undefined);

console.log(`Total missing keys: ${missingKeys.length}`);

async function run() {
  const chunkSize = 50;
  let translatedCount = 0;

  for (let i = 0; i < missingKeys.length; i += chunkSize) {
    const chunk = missingKeys.slice(i, i + chunkSize);
    const objToTranslate = {};
    chunk.forEach(k => {
      objToTranslate[k] = en[k];
    });

    try {
      const result = await translate(objToTranslate, {from: 'en', to: 'es'});
      
      // Post process to preserve AR, VR, AI, Obrive
      for (const k of chunk) {
        if (result[k]) {
          let translatedText = result[k];
          // Simple replacements to fix known terms that might get translated
          translatedText = translatedText.replace(/\bRA\b/g, 'AR');
          translatedText = translatedText.replace(/\bRV\b/g, 'VR');
          translatedText = translatedText.replace(/\bRM\b/g, 'MR');
          translatedText = translatedText.replace(/\bIA\b/g, 'AI');
          
          es[k] = translatedText;
        } else {
          es[k] = en[k]; // fallback
        }
      }

      translatedCount += chunk.length;
      console.log(`Translated ${translatedCount} / ${missingKeys.length}`);
      
      // Write progressively to not lose data
      fs.writeFileSync(esPath, JSON.stringify(es, null, 2));

      // sleep to avoid rate limits
      await new Promise(r => setTimeout(r, 1500));

    } catch (err) {
      console.error(`Error translating chunk at index ${i}`, err);
      // fallback to original if API fails
      for (const k of chunk) {
        es[k] = en[k];
      }
      fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
      // wait a bit longer on error
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  console.log('Done!');
}

run();
