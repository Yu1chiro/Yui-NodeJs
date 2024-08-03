import puppeteer from 'puppeteer';

const url = "https://www.nusabali.com/";

const main = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);

  const allArticles = await page.evaluate(() => {
    const articles = document.querySelectorAll('#article-list .feature-items');

    let allArticlesData = [];

    articles.forEach((article) => {
      const titleElement = article.querySelector('h5 a');
      const title = titleElement.innerText;
      const url = titleElement.href;
      allArticlesData.push({ title, url });
    });

    return allArticlesData;
  });

  console.log(allArticles);

  await browser.close();
};

main();


