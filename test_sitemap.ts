import { COUNTRIES, SUPPORTED_COUNTRIES } from "./src/config/countries";
import { getTranslationStatus } from "./src/config/translations";

const activeCountries = SUPPORTED_COUNTRIES.filter(c => COUNTRIES[c].isProductionReady);

let totalPages = 0;
let totalAlternates = 0;

const subpath = "/products/obpark";

for (const country of activeCountries) {
    const countryConf = COUNTRIES[country];
    for (const lang of countryConf.supportedLanguages) {
        if (getTranslationStatus(country, lang, subpath) === "ready") {
            totalPages++;
            for (const c of activeCountries) {
                const conf = COUNTRIES[c];
                for (const l of conf.supportedLanguages) {
                    if (getTranslationStatus(c, l, subpath) === "ready") {
                        totalAlternates++;
                    }
                }
            }
        }
    }
}

console.log(`For one path, Pages: ${totalPages}, Alternates across all: ${totalAlternates}`);
