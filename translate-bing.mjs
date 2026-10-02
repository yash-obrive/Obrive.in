import fs from 'fs';
import { translate } from 'bing-translate-api';

const en = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/dictionaries/zh.json', 'utf8'));

const keys = Object.keys(en);
let modified = false;

async function processKeys() {
    let count = 0;
    const missingKeys = keys.filter(k => !zh.hasOwnProperty(k));
    console.log(`Found ${missingKeys.length} missing keys.`);
    
    const batchSize = 5;
    for (let i = 0; i < missingKeys.length; i += batchSize) {
        const batch = missingKeys.slice(i, i + batchSize);
        await Promise.all(batch.map(async (key) => {
            const originalText = en[key];
            if (!originalText.trim()) {
                zh[key] = originalText;
                return;
            }
            try {
                const res = await translate(originalText, null, 'zh-Hans');
                let finalTxt = res.translation;
                
                finalTxt = finalTxt.replace(/人工智能/g, 'AI');
                finalTxt = finalTxt.replace(/增强现实/g, 'AR');
                finalTxt = finalTxt.replace(/虚拟现实/g, 'VR');
                finalTxt = finalTxt.replace(/混合现实/g, 'MR');
                
                zh[key] = finalTxt;
                modified = true;
                count++;
            } catch (err) {
                console.error(`Error translating key: ${key} -> ${err.message}`);
            }
        }));
        
        if (modified) {
            fs.writeFileSync('src/dictionaries/zh.json', JSON.stringify(zh, null, 2) + '\n');
        }
        
        console.log(`Translated ${Math.min(i + batch.length, missingKeys.length)}/${missingKeys.length}`);
        await new Promise(r => setTimeout(r, 500)); 
    }
    console.log(`Done. Translated ${count} keys.`);
}

processKeys();
