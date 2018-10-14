const puppeteer = require('puppeteer');
const config = require('./config');
const fs = require('fs');

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

    // await page.screenshot({ path: './screenshots/stu-loans' + Date.now() + '.png', fullPage: true });

    await page.waitForSelector('#current-balance');
    await page.waitFor(waitforbalance);

    await page.waitForSelector('#unpaid-principal');
    await page.waitFor(waitforprincipal);

    await page.waitForSelector('#unpaid-interest');
    await page.waitFor(waitforinterest);


    function waitforbalance() {
        return document.getElementById('current-balance').innerHTML != '';
    }

    function waitforprincipal() {
        return document.getElementById('unpaid-principal').innerHTML != '';
    }

    function waitforinterest() {
        return document.getElementById('unpaid-interest').innerHTML != '';
    }

    var currentBalance = await page.evaluate(() => {
        return document.getElementById('current-balance').innerHTML;
    });

    var unpaidPrincipal = await page.evaluate(() => {
        return document.getElementById('unpaid-principal').innerHTML;
    });

    var unpaidInterest = await page.evaluate(() => {
        return document.getElementById('unpaid-interest').innerHTML;
    });

    var recordToAppend = currentBalance + ',' + unpaidInterest + ',' + unpaidPrincipal + ',' + new Date() + '\n';

    // append to csv file
    fs.appendFile('./stu-loans/stu-loans.csv', recordToAppend, function(err, data) {
        if(err) {
            // probs make an err file and append there
            console.log(err);
        }
    });

    browser.close();
  })();