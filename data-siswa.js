import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import readline from 'readline';

const url = "";

const waitFor = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.select('select[name="tablepress-66_length"]', '50');

  await page.waitForSelector('#tablepress-66 tbody tr');

  await waitFor(3000);

  const mahasiswaData = await page.evaluate(() => {
    const table = document.querySelector('#tablepress-66');
    const rows = table.querySelectorAll('tbody tr');

    let data = [];

    rows.forEach((row, index) => {
      const columns = row.querySelectorAll('td');

      if (columns.length >= 5) { // Pastikan jumlah kolom sesuai yang diharapkan
        const nama = columns[0].innerText.trim();
        const namaLomba = columns[2].innerText.trim();
        const capaianPrestasi = columns[4].innerText.trim();

        data.push({ index: index + 1, nama, namaLomba, capaianPrestasi });
      }
    });

    return data;
  });

  await browser.close();

  // Tampilkan data di terminal
  console.log("Data Mahasiswa:");
  mahasiswaData.forEach(mahasiswa => {
    console.log(`${mahasiswa.index}. Nama: ${mahasiswa.nama}, Kegiatan-Lomba: ${mahasiswa.namaLomba}, Capaian-Prestasi: ${mahasiswa.capaianPrestasi}`);
  });

  // Buat interface untuk menerima input dari terminal
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Apakah ingin mengubah data ke CSV? (Y/N) ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      // Buat direktori 'csv' jika belum ada
      const dir = './csv';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      // Buat CSV Writer
      const csvWriter = createObjectCsvWriter({
        path: path.join(dir, 'data-mahasiswa.csv'),
        header: [
          { id: 'nama', title: 'Nama' },
          { id: 'namaLomba', title: 'Kegiatan-Lomba' },
          { id: 'capaianPrestasi', title: 'Capaian-Prestasi' }
        ]
      });

      // Tulis data ke file CSV
      await csvWriter.writeRecords(mahasiswaData);

      console.log('Data has been saved to data-mahasiswa.csv');
    } else {
      console.log('Data tidak disimpan ke CSV.');
    }

    rl.close();
  });
};

main();
