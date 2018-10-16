const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    var fileName = path.join(__dirname, './pdfs/') + 'sample-pdf-' + Date.now() + '.pdf';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://carmalou.com');
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