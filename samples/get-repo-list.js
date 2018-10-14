const puppeteer = require('puppeteer');
const fs = require('fs');
(async() => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://github.com/carmalou?tab=repositories', {waitUntil: 'networkidle2'});
        await page.waitForSelector('#user-repositories-list li');
        
        page.on('console', msg => {
            console.log('msg ', msg);
          });

        var tmp = await page.evaluate(() => {
            var repos = document.querySelectorAll('#user-repositories-list li h3 a');
            return Array.from(repos).map((repo) => { return repo.href });
        });

        fs.writeFile('./html/repos' + Date.now() + '.json', JSON.stringify(tmp), function(err, data) {
            if(err) {
                // this would be a good place to do some real logging
                console.log('err ', err);
            }
        });

        await browser.close();
    }
    catch(err) {
        console.log('err ', err);
    }
  })();