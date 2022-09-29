import * as fs from "fs-extra";

const VAULT_PATH = "./Quran/";

async function main() {
    const quranJsonPath = require.resolve("quran-json/dist/quran.json");

    const surahs = fs.readJsonSync(quranJsonPath);

    for (const surah of surahs) {
        const surahFolderPath = `${VAULT_PATH}${addLeadingZeros(surah.id, 3)}-${surah.name}`;
        fs.ensureDir(surahFolderPath);

        // creating files inside directory
        for (const verse of surah.verses) {
            const verseFilePath = `${surahFolderPath}/${surah.name}-${verse.id.toString()}.md`;
            const content = `---\ntype: quran\nsurah: ${surah.name}\nverse: ${verse.id}\n---\n${verse.text}\n`;
            await fs.outputFile(verseFilePath, content);
        }
    }
}

function addLeadingZeros(number: number, totalLength: number) {
    return String(number).padStart(totalLength, "0");
}

function toIndiaDigits(dig: string) {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return dig.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
