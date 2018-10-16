const puppeteer = require('puppeteer');
const fs = require('fs');
(async() => {
    try {
        const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.carmalou.com', {waitUntil: 'networkidle2'});
  const html = await page.content();
//save our html in a file
fs.writeFile('./html/page.html', html, _ => console.log('HTML saved'));
//... do some stuff
  await browser.close();
    }
    catch(err) {
        console.log('err ', err);
    }
  })();