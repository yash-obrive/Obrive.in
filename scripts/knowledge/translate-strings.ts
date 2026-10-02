import fs from 'fs';
import path from 'path';

const translations: Record<string, Record<string, string>> = {
  ar: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "حلول الواقع المعزز والواقع الافتراضي والواقع المختلط والحوسبة المكانية | أوبرايف",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "شركة تقنيات غامرة رائدة في بنغالور تقدم حلول الواقع المعزز والواقع الافتراضي والواقع المختلط والتصور ثلاثي الأبعاد والحوسبة المكانية للتحول الرقمي للمؤسسات.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "أوبرايف – حلول الواقع المعزز والواقع الافتراضي والواقع المختلط والحوسبة المكانية",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "شركة تقنيات غامرة في بنغالور تقدم حلول الواقع المعزز والواقع الافتراضي والواقع المختلط والتصور ثلاثي الأبعاد.",
    "Frequently Asked Questions": "الأسئلة المتداولة"
  },
  es: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Soluciones de AR, VR, MR y Computación Espacial | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Compañía líder en tecnología inmersiva en Bangalore que ofrece soluciones de AR, VR, MR, visualización 3D y computación espacial para la transformación digital empresarial.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Soluciones de AR, VR, MR y Computación Espacial",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Compañía de tecnología inmersiva en Bangalore que ofrece soluciones de AR, VR, MR y visualización 3D.",
    "Frequently Asked Questions": "Preguntas Frecuentes"
  },
  pt: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Soluções de AR, VR, MR e Computação Espacial | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Líder em tecnologia imersiva em Bangalore, fornecendo soluções de AR, VR, MR, visualização 3D e computação espacial para transformação digital empresarial.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Soluções de AR, VR, MR e Computação Espacial",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Empresa de tecnologia imersiva em Bangalore fornecendo soluções de AR, VR, MR e visualização 3D.",
    "Frequently Asked Questions": "Perguntas Frequentes"
  },
  fr: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Solutions AR, VR, MR et Informatique Spatiale | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Entreprise leader en technologie immersive à Bangalore offrant des solutions AR, VR, MR, de visualisation 3D et d'informatique spatiale pour la transformation numérique des entreprises.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Solutions AR, VR, MR et Informatique Spatiale",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Entreprise de technologie immersive à Bangalore offrant des solutions AR, VR, MR et de visualisation 3D.",
    "Frequently Asked Questions": "Foire aux questions"
  },
  de: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR, VR, MR & Spatial Computing Lösungen | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Führendes Immersive-Technology-Unternehmen in Bangalore, das AR-, VR-, MR-, 3D-Visualisierungs- und Spatial-Computing-Lösungen für die digitale Transformation von Unternehmen liefert.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR, VR, MR & Spatial Computing Lösungen",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Immersive-Technology-Unternehmen in Bangalore, das AR-, VR-, MR- und 3D-Visualisierungslösungen liefert.",
    "Frequently Asked Questions": "Häufig gestellte Fragen"
  },
  nl: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR, VR, MR & Spatial Computing Oplossingen | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Toonaangevend immersief technologiebedrijf in Bangalore dat AR, VR, MR, 3D-visualisatie en spatial computing-oplossingen levert voor digitale bedrijfstransformatie.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR, VR, MR & Spatial Computing Oplossingen",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Immersief technologiebedrijf in Bangalore dat AR, VR, MR en 3D-visualisatieoplossingen levert.",
    "Frequently Asked Questions": "Veelgestelde Vragen"
  },
  sv: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR, VR, MR & Spatial Computing Lösningar | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Ledande företag inom immersiv teknik i Bangalore som levererar AR, VR, MR, 3D-visualisering och spatial computing-lösningar för företags digitala transformation.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR, VR, MR & Spatial Computing Lösningar",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Immersivt teknikföretag i Bangalore som levererar AR, VR, MR och 3D-visualiseringslösningar.",
    "Frequently Asked Questions": "Vanliga Frågor"
  },
  it: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Soluzioni AR, VR, MR e Informatica Spaziale | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Azienda leader in tecnologia immersiva a Bangalore che offre soluzioni AR, VR, MR, visualizzazione 3D e informatica spaziale per la trasformazione digitale aziendale.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Soluzioni AR, VR, MR e Informatica Spaziale",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Azienda di tecnologia immersiva a Bangalore che offre soluzioni AR, VR, MR e visualizzazione 3D.",
    "Frequently Asked Questions": "Domande Frequenti"
  },
  zh: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR, VR, MR 及空间计算解决方案 | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "班加罗尔领先的沉浸式技术公司，为企业数字化转型提供 AR、VR、MR、3D 可视化和空间计算解决方案。",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR, VR, MR 及空间计算解决方案",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "班加罗尔沉浸式技术公司，提供 AR、VR、MR 和 3D 可视化解决方案。",
    "Frequently Asked Questions": "常见问题解答"
  },
  ja: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR、VR、MR および 空間コンピューティング ソリューション | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "企業のデジタル トランスフォーメーション向けに AR、VR、MR、3D ビジュアライゼーション、空間コンピューティング ソリューションを提供するバンガロールの主要な没入型テクノロジー企業。",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR、VR、MR および 空間コンピューティング ソリューション",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "バンガロールの没入型テクノロジー企業であり、AR、VR、MR、および 3D ビジュアライゼーション ソリューションを提供しています。",
    "Frequently Asked Questions": "よくある質問"
  },
  ko: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "AR, VR, MR 및 공간 컴퓨팅 솔루션 | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "기업의 디지털 혁신을 위해 AR, VR, MR, 3D 시각화 및 공간 컴퓨팅 솔루션을 제공하는 방갈로르의 선도적인 몰입형 기술 회사.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – AR, VR, MR 및 공간 컴퓨팅 솔루션",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "방갈로르에 위치한 몰입형 기술 회사로 AR, VR, MR 및 3D 시각화 솔루션을 제공합니다.",
    "Frequently Asked Questions": "자주 묻는 질문"
  },
  ms: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Penyelesaian AR, VR, MR & Pengkomputeran Spatial | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Syarikat teknologi imersif terkemuka di Bangalore yang menyampaikan penyelesaian AR, VR, MR, visualisasi 3D dan pengkomputeran spatial untuk transformasi digital perusahaan.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Penyelesaian AR, VR, MR & Pengkomputeran Spatial",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Syarikat teknologi imersif di Bangalore yang menyampaikan penyelesaian AR, VR, MR dan visualisasi 3D.",
    "Frequently Asked Questions": "Soalan Lazim"
  },
  id: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "Solusi AR, VR, MR & Komputasi Spasial | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "Perusahaan teknologi imersif terkemuka di Bangalore yang memberikan solusi AR, VR, MR, visualisasi 3D, dan komputasi spasial untuk transformasi digital perusahaan.",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – Solusi AR, VR, MR & Komputasi Spasial",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "Perusahaan teknologi imersif di Bangalore yang memberikan solusi AR, VR, MR, dan visualisasi 3D.",
    "Frequently Asked Questions": "Pertanyaan yang Sering Diajukan"
  },
  th: {
    "AR, VR, MR & Spatial Computing Solutions | Obrive": "โซลูชัน AR, VR, MR และ Spatial Computing | Obrive",
    "Leading immersive technology company in Bangalore delivering AR, VR, MR, 3D visualization and spatial computing solutions for enterprise digital transformation.": "บริษัทเทคโนโลยีล้ำสมัยชั้นนำในบังกาลอร์ที่ให้บริการ AR, VR, MR, การแสดงผล 3 มิติ และโซลูชัน Spatial Computing สำหรับการเปลี่ยนแปลงทางดิจิทัลขององค์กร",
    "Obrive – AR, VR, MR & Spatial Computing Solutions": "Obrive – โซลูชัน AR, VR, MR และ Spatial Computing",
    "Immersive technology company in Bangalore delivering AR, VR, MR and 3D visualization solutions.": "บริษัทเทคโนโลยีล้ำสมัยในบังกาลอร์ที่ให้บริการ AR, VR, MR และการแสดงผล 3 มิติ",
    "Frequently Asked Questions": "คำถามที่พบบ่อย"
  }
};

const locales = ['ar', 'es', 'pt', 'fr', 'de', 'nl', 'sv', 'it', 'zh', 'ja', 'ko', 'ms', 'id', 'th'];
locales.forEach(loc => {
  const filePath = path.join(process.cwd(), 'src/dictionaries', `${loc}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;
    for (const [eng, translated] of Object.entries(translations[loc])) {
      if (!data[eng] || data[eng] === eng) {
        data[eng] = translated;
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated translations for ${loc}`);
    }
  }
});
