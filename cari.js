import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const instagramUrl = 'https://www.instagram.com/sushikou__/';
const outputDir = './output';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(instagramUrl);

    // Tunggu sampai konten dimuat sepenuhnya
    await page.waitForSelector('article');

    // Ambil semua postingan
    const posts = await page.$$('article');

    for (const post of posts) {
        // Ambil ID postingan
        const postId = await post.$eval('div._ac7v', div => div.getAttribute('id'));

        // Ambil URL gambar
        const imgUrl = await post.$eval('img', img => img.getAttribute('src'));

        // Ambil keterangan/teks
        let caption;
        try {
            caption = await post.$eval('div._ac7v', div => div.innerText.trim());
        } catch (error) {
            console.log('Caption not found');
            caption = 'No caption';
        }

        // Tampilkan keterangan/teks dan URL gambar di terminal
        console.log('Post ID:', postId);
        console.log('Caption:', caption);
        console.log('Image URL:', imgUrl);

        // Simpan gambar ke direktori output
        const imgFilename = `${postId}_${Date.now()}.jpg`;
        const imgPath = path.join(outputDir, imgFilename);
        const imgBuffer = await page.goto(imgUrl);
        fs.writeFileSync(imgPath, await imgBuffer.buffer());

        console.log('Image saved to:', imgPath);
    }

    await browser.close();
})();
