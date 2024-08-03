import * as cheerio from "cheerio";
import puppeteerExtra from "puppeteer-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import { createObjectCsvWriter } from 'csv-writer';
import readline from 'readline';

let currentPage = 1;
let browserInstance = null; // Variable to store browser instance

init();

async function searchGoogleScholarByYear(year, pageNumber = 1) {
  try {
    const start = Date.now();
    const page = await browserInstance.newPage();

    const query = "Skripsi pendidikan bahasa jepang"; //seasrch jurnal
    const url = year ?
      `https://scholar.google.com/scholar?as_ylo=${year}&q=${query.split(" ").join("+")}&start=${(pageNumber - 1) * 10}` :
      `https://scholar.google.com/scholar?q=${query.split(" ").join("+")}&start=${(pageNumber - 1) * 10}`;

    try {
      await page.goto(url);
    } catch (error) {
      console.log("Error going to page:", error);
    }

    const html = await page.content();

    const $ = cheerio.load(html);
    const articles = [];

    $('div.gs_r.gs_or.gs_scl').each((index, element) => {
      const titleElement = $(element).find('h3.gs_rt a');
      const title = titleElement.text();
      const url = titleElement.attr('href');
      const authorAndJournal = $(element).find('div.gs_a').text();
      const pdfLinkElement = $(element).find('div.gs_ggs a');
      const pdfLink = pdfLinkElement.length ? pdfLinkElement.attr('href') : '';

      articles.push({
        index: index + 1,
        title,
        url,
        authorAndJournal,
        pdfLink,
      });

      console.log(`Article ${index + 1}:`);
      console.log(`Title: ${title}`);
      console.log(`URL: ${url}`);
      console.log(`Author and Journal: ${authorAndJournal}`);
      console.log(`PDF Link: ${pdfLink}`);
      console.log("--------------------------------------------");
    });

    const end = Date.now();
    console.log(`Time in seconds: ${Math.floor((end - start) / 1000)}`);

    return articles;
  } catch (error) {
    console.log("Error at Google Scholar:", error.message);
  }
}

async function promptUserToContinueFirst() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Preview (B) / Next Pagination (N): ", (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

async function promptUserToContinueSecond() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Do you want to save this data to a CSV file? (Y/N): ", (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    });
  });
}

async function promptUserToSaveData(articles) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Do you want to save this data to a CSV file? (Y/N): ", async (answer) => {
      if (answer.toLowerCase() === 'y') {
        const csvWriter = createObjectCsvWriter({
          path: 'scholar_articles.csv',
          header: [
            { id: 'index', title: 'Index' },
            { id: 'title', title: 'Title' },
            { id: 'url', title: 'URL' },
            { id: 'authorAndJournal', title: 'Author and Journal' },
            { id: 'pdfLink', title: 'PDF Link' },
          ],
        });

        await csvWriter.writeRecords(articles);

        console.log('CSV file created successfully.');
      } else {
        console.log("Data not saved.");
      }
      rl.close();
      resolve();
    });
  });
}

async function init() {
  try {
    browserInstance = await puppeteerExtra.launch({
      headless: false,
      executablePath: "", // your path here
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the starting year for jurnal (or press Enter for all years): ", async (year) => {
      let pageNumber = 1;
      let previousPageNumber = 0;

      while (true) {
        const articles = await searchGoogleScholarByYear(year, pageNumber);

        const actionFirst = await promptUserToContinueFirst();
        if (actionFirst === 'b') {
          // Show Preview
          await promptUserToSaveData(articles);
        } else if (actionFirst === 'n') {
          // Next Pagination
          previousPageNumber = pageNumber;
          pageNumber++;
          const actionSecond = await promptUserToContinueSecond();
          if (actionSecond === 'y') {
            await promptUserToSaveData(articles);
          }
        }
      }
      rl.close();
    });
  } catch (error) {
    console.log('Error in init:', error.message);
  }
}
