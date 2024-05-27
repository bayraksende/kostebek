const puppeteer = require('puppeteer');

module.exports = async () => {
    // set authorization token as rate limited in cache
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        const setCookie = {
            name: 'adminim',
            value: 'ibocan',
            httpOnly: false,
            secure: true,
            url: 'https://localhost:4607'
        };

        await page.setCookie(setCookie);

        await page.goto(process.env.URL);
    } catch (err) {
        console.error(err);
    } finally {
        if (browser) {
            setTimeout(() => {
                // Tarayıcıyı kapat
                browser.close();
            }, 10000); // Örnek olarak 5 saniye bekleyin
        }
    }
};