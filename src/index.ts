import * as fs from "fs-extra";

const VAULT_PATH = "./Quran/";

async function main() {
    const quranJsonPath = require.resolve("quran-json/dist/quran.json");

    const surahs = fs.readJsonSync(quranJsonPath);

    for (const surah of surahs) {
        const surahTitle = surah.transliteration;
        const surahFolderPath = `${VAULT_PATH}${addLeadingZeros(surah.id, 3)}-${surah.transliteration}`;
        fs.ensureDir(surahFolderPath);

        // creating files inside directory
        for (const verse of surah.verses) {
            const verseFilePath = `${surahFolderPath}/${addLeadingZeros(verse.id, 3)}.md`;
            const content = `---\ntype: quran\nsurah: ${surahTitle}\nverse: ${verse.id}\n---\n\n> ${verse.text}\n`;
            await fs.outputFile(verseFilePath, content);
        }
    }
}

function addLeadingZeros(number: number, totalLength: number) {
    return String(number).padStart(totalLength, '0');
  }

main().catch(error => {
    console.error(error);
    process.exit(1);
});
