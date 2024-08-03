import puppeteer from 'puppeteer';

(async () => {
  // Meluncurkan instance browser baru
  const browser = await puppeteer.launch({ headless: false }); // Ubah ke true untuk menjalankan tanpa tampilan browser
  const page = await browser.newPage();

  // Buka URL yang ditentukan
  await page.goto('https://padlet.com/tintakamboja0/menfess-tinta-kamboja-idoqlae0ucfty5gz', { waitUntil: 'networkidle2' });

  // Fungsi untuk melakukan tugas posting
  async function lakukanTugas() {
    try {
      // Tunggu tombol yang membuka form tersedia dan klik
      await page.waitForSelector('button[data-testid="surfaceAddPostButton"]');
      await page.click('button[data-testid="surfaceAddPostButton"]');

      // Tunggu input subjek terlihat dan isi dengan subjek menggunakan paste
      await page.waitForSelector('textarea[data-testid="surfacePostComposerEditorSubjectInput"]');
      await page.evaluate(() => {
        const subjectInput = document.querySelector('textarea[data-testid="surfacePostComposerEditorSubjectInput"]');
        const subjectText = '<// Your Idiot//> SPAMMED MESSAGE'; // Ubah dengan teks subjek yang Anda inginkan
        subjectInput.value = subjectText;
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
      });

      // Tunggu input pesan terlihat dan isi dengan pesan menggunakan paste
      await page.waitForSelector('div[contenteditable="true"].tiptap.ProseMirror');
      await page.evaluate(() => {
        const messageInput = document.querySelector('div[contenteditable="true"].tiptap.ProseMirror');
        const messageText = 'menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%menfess defense is very weak can you protect it more securely? Your Idiot dude LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$% LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL @#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$ %LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%LOL@#$%'; // Ubah dengan teks pesan yang Anda inginkan
        messageInput.innerHTML = `<p>${messageText}</p>`;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      });

      // Tunggu tombol publikasikan diaktifkan dan klik
      await page.waitForSelector('button[data-testid="publishPostButton"]:not([aria-disabled="true"])');
      await page.click('button[data-testid="publishPostButton"]');

      // Opsional, tunggu konfirmasi bahwa postingan telah dipublikasikan
      // await page.waitForSelector('.confirmation-selector'); // Sesuaikan selector sesuai kebutuhan

      console.log('Target Spam success ✅✅');
    } catch (error) {
      console.error('Terjadi kesalahan saat melakukan tugas:', error);
    }
  }

  // Loop untuk melakukan tugas beberapa kali
  while (true) {
    await lakukanTugas();
    // Tunggu beberapa waktu sebelum iterasi berikutnya
    await new Promise(resolve => setTimeout(resolve, 2000)); // Sesuaikan waktu tunda sesuai kebutuhan
  }

  // Catatan: Browser tidak akan ditutup karena kita menjalankan loop tak terbatas
})();
