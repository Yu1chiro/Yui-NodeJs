import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';

const downloadVideoSegment = (url, dest) => {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Download complete:', dest);
    });
  }).on('error', (err) => {
    fs.unlink(dest); // Hapus file yang tidak lengkap jika terjadi error
    console.error('Error downloading segment:', err.message);
  });
};

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const videoPageUrl = 'https://www3.nhk.or.jp/news/easy/k10014427031000/k10014427031000.html';
  const destination = 'blob:https://www3.nhk.or.jp/dc2b8d73-1ead-4675-b66f-6cca7bffc97e';

  await page.goto(videoPageUrl, { waitUntil: 'networkidle2' });

  // Ambil URL video dari halaman dengan menggunakan Puppeteer
  const videoUrl = await page.evaluate(() => {
    const videoElement = document.querySelector('video');
    return videoElement ? videoElement.src : null;
  });

  if (videoUrl) {
    // Jika URL video berhasil ditemukan, unduh video
    downloadVideoSegment(videoUrl, destination);
  } else {
    console.error('Video URL not found on the page.');
  }

  await browser.close();
};

main();
