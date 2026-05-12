const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Load the HTML file
        const filePath = `file://${path.resolve(__dirname, 'poster.html')}`;
        await page.goto(filePath, { waitUntil: 'networkidle0' });

        // Set the viewport to match the poster size
        await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 2 });

        // Save as JPEG
        await page.screenshot({ 
            path: 'poster.jpg', 
            type: 'jpeg', 
            quality: 100,
            fullPage: true 
        });

        console.log('Successfully generated poster.jpg');
        await browser.close();
    } catch (error) {
        console.error('Error generating JPEG:', error);
        process.exit(1);
    }
})();
