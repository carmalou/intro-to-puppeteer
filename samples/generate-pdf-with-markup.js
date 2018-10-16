const puppeteer = require('puppeteer');
const path = require('path');
const html = "<h1>Hello OKC.js! Isn't Puppeteer magical?</h1>";

(async () => {
    var fileName = path.join(__dirname, './pdfs/') + 'sample-pdf-' + Date.now() + '.pdf';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({
      path: fileName, 
      format: 'Letter',
      margin: {
        top: '1in',
        bottom: '1in',
        left: '1in',
        right: '1in'
      }
    });
  
    await browser.close();
  })();