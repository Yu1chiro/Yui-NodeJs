import puppeteer from 'puppeteer';
import fs from 'fs';
import readline from 'readline';
import path from 'path';

// URL halaman web yang akan di-scrape
const url = "https://mazii.net/id-ID/jlpt/kanji/2/1"; // Ganti dengan URL halaman yang benar

const waitForUserInput = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const main = async () => {
  // Meluncurkan browser dengan antarmuka grafis (headless: false)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'] // Memulai browser dalam mode layar penuh
  });

  const page = await browser.newPage();
  await page.goto(url);

  // Menunggu user untuk inspeksi manual
  console.log('Inspeksi elemen secara manual, lalu kembali ke terminal dan tekan Enter untuk melanjutkan.');
  await waitForUserInput('Tekan Enter untuk melanjutkan setelah inspeksi elemen secara manual...');

  // Mengambil data kanji setelah user menekan Enter
  const kanjiData = await page.evaluate(() => {
    const kanjiElements = document.querySelectorAll('#kanji-detail-result .kanji-jlpt-char');
    let data = [];

    kanjiElements.forEach((element) => {
      const kanji = element.querySelector('.jlpt-kanji-kanji').innerText;
      const meaning = element.querySelector('.jlpt-kanji-mean').innerText;
      const url = element.querySelector('a').href;
      data.push({ kanji, meaning, url });
    });

    return data;
  });

  console.log("Data Kanji:");
  kanjiData.forEach((item, index) => {
    console.log(`${index + 1}. Kanji: ${item.kanji}, Meaning: ${item.meaning}, URL: ${item.url}`);
  });

  // Menanyakan apakah user ingin menyimpan data ke dalam file TXT
  const saveToTXT = await waitForUserInput('Apakah Anda ingin menyimpan data ke dalam file TXT? (Y/N): ');

  if (saveToTXT.toLowerCase() === 'y') {
    // Menyimpan konten TXT ke dalam file
    const filePath = path.join(process.cwd(), 'kanjiData.txt');
    const txtContent = kanjiData.map((item, index) => 
      `${index + 1}. Kanji: ${item.kanji}\nMeaning: ${item.meaning}\nURL: ${item.url}\n`
    ).join('\n');

    // Simpan file TXT
    fs.writeFileSync(filePath, txtContent, 'utf8');
    console.log('Data telah disimpan ke dalam file ' + filePath);
  }

  // Browser tetap terbuka
  console.log('Browser akan tetap terbuka.');
};

main();
