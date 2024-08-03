import puppeteer from 'puppeteer';

const url = "https://www3.nhk.or.jp/news/easy/";

const main = async () => {
  // Buka browser secara permanen
  const browser = await puppeteer.launch({ headless: false });

  // Buka halaman web
  const page = await browser.newPage();
  await page.goto(url);

  // Fungsi untuk mengambil semua artikel
  const getAllArticles = async () => {
    const allArticles = await page.evaluate(() => {
      const articles = document.querySelectorAll('#js-news-list .news-list__item');
      let allArticlesData = [];

      articles.forEach((article) => {
        const titleElement = article.querySelector('.item__info h2');
        const title = Array.from(titleElement.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent.trim())
          .join('');
        const urlElement = article.querySelector('a');
        const url = urlElement.href;
        const timeElement = article.querySelector('time');
        const time = timeElement ? timeElement.textContent.trim() : '';
        allArticlesData.push({ title, url, time });
      });

      return allArticlesData;
    });

    return allArticles;
  };

  // Ambil semua artikel pertama kali halaman dimuat
  let allArticles = await getAllArticles();
  console.log("Artikel yang diambil pada awal:");

  // Cetak data artikel pertama kali
  allArticles.forEach((article, index) => {
    console.log(`${index + 1}. Title: ${article.title}`);
    console.log(`   URL: ${article.url}`);
    console.log(`   Time: ${article.time}`);
  });

  // Tambahkan event listener untuk menangani klik tombol "more"
  await page.exposeFunction('loadMoreArticles', async () => {
    // Ambil semua artikel setelah tombol "more" diklik
    allArticles = await getAllArticles();
    console.log("Artikel yang diambil setelah tombol 'more' diklik:");
    
    // Cetak data artikel setelah tombol "more" diklik
    allArticles.forEach((article, index) => {
      console.log(`${index + 1}. Title: ${article.title}`);
      console.log(`   URL: ${article.url}`);
      console.log(`   Time: ${article.time}`);
    });
  });

  await page.evaluate(() => {
    document.querySelector('.button-more').addEventListener('click', async () => {
      // Panggil fungsi untuk mengambil semua artikel setelah tombol "more" diklik
      await window.loadMoreArticles();
    });
  });

  // Tunggu hingga pengguna menutup browser secara manual
  await new Promise(() => {});
};

main();
