import { translate } from '@vitalets/google-translate-api';

async function test() {
  try {
    const res = await translate('Hello world', { to: 'es' });
    console.log("Translation:", res.text);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
