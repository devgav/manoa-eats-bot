const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    let userChoice, food, lengthOfFood;
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('https://uhm.sodexomyway.com/dining-near-me/cc-food-court');
    userChoice = await askQuestion("What type of food would you like to keep track of?\n"); 
    await page.click('.aside > .theme-button.solid-button');
    await page.$('')
    food = await page.$$eval('#', el => el.map(options => options.textContent));
})();

async function matcher(id, page) { 
    // let regex = new RegExp(/^page3R_mcid\d+$/);
    let texts = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('myclass');
        for (let element of elements)
            data.push(element.textContent);
        return data;
    });
    // return regex.test(id);
}
function askQuestion(query) {
    const rl = readline;

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}