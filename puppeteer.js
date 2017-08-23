const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8003/client/html/');
  await page.screenshot({path: 'example3.png'});
  browser.close();
});