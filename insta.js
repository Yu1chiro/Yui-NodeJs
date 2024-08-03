import puppeteer from 'puppeteer';
import fs from 'fs';
import readline from 'readline';
import axios from 'axios';
import { resolve as resolvePath } from 'path';

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    const inputURL = await new Promise((resolve) => {
        Interface.question("Masukkan URL:", inputURL => {
            resolve(inputURL);
        });
    });
    Interface.close(); // Close the interface after getting input

    await page.goto(inputURL);
    await page.waitForSelector("video");

    const videoUrl = await page.evaluate(() => {
        const video = document.querySelector("video");
        return video ? video.src : null;
    });

    if (videoUrl) {
        const writer = fs.createWriteStream(resolvePath("output/Reels.mp4"));
        
        const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
        });

        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log("Success download✅");
        });

        writer.on('error', (err) => {
            console.error("Error during download:", err);
        });
    } else {
        console.error("Video element not found or src is empty");
    }

    await browser.close();
}

main();
