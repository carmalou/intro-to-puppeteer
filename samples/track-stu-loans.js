const puppeteer = require('puppeteer');
const config = require('./config');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    
    await page.goto(config.loginUrl);
    await page.focus('#userid');
    await page.keyboard.type(config.username);

    await page.click('#authenticate');

    await page.waitForSelector('#pinNumber');
    await page.focus('#pinNumber');
    await page.keyboard.type(config.PIN)
    await page.focus('#recog-no');

    await page.click('#authenticate');

    await page.waitForSelector('#password');
    await page.focus('#password');
    await page.keyboard.type(config.password);

    await page.click('#authenticate');

    await page.screenshot({ path: './screenshots/stu-loans' + Date.now() + '.png', fullPage: true });
  
    setTimeout(() => { browser.close(); }, 3000);
  })();