import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const url = "https://pbj.undiksha.ac.id/data-dosen-prodi-pendidikan-bahasa-jepang-undiksha/";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const dosenData = await page.evaluate(() => {
    const tableWrappers = document.querySelectorAll('.the_content_wrapper figure.wp-block-table');

    let data = [];

    tableWrappers.forEach((tableWrapper) => {
      const rows = tableWrapper.querySelectorAll('tbody tr');

      rows.forEach((row) => {
        const columns = row.querySelectorAll('td');

        if (columns.length >= 7) { // Pastikan jumlah kolom sesuai yang diharapkan
          const nama = columns[1].innerText.trim();
          const nip = columns[2].innerText.trim();
          const pendidikanTerakhir = columns[6].innerText.trim();

          data.push({ nama, nip, pendidikanTerakhir });
        }
      });
    });

    return data;
  });

  await browser.close();

  // Buat direktori 'word' jika belum ada
  const dir = './word';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  // Buat dokumen Word
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: dosenData.map(dosen => 
          new Paragraph({
            children: [
              new TextRun({ text: `Nama: ${dosen.nama}`, bold: true }),
              new TextRun(`\nNIM: ${dosen.nip}`),
              new TextRun(`\nJenis Kelamin: ${dosen.pendidikanTerakhir}`),
              new TextRun("\n\n")
            ]
          })
        ),
      },
    ],
  });

  // Simpan dokumen Word
  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join(dir, 'data-dosen.docx');
  fs.writeFileSync(filePath, buffer);

  console.log('Data has been saved to data-dosen.docx');
};

main();
