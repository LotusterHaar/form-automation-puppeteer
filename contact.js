const puppeteer = require('puppeteer');
//Defining chromeOptions for defining path, time to execute and setting headless mode to false
const chromeOptions = {
    slowMo: 10,
    headless:false,
    args: ['--start-maximized']
};
(async () => {

    const browser = await puppeteer.launch(chromeOptions);

    const page = await browser.newPage();

    //Navigating to Test Project Contact Form
    await page.goto('https://testproject.io/contact-us/');

    //Taking screenshot of initial page UI
    await page.screenshot({path: 'beforefill.png'});

    //Waiting for form to load
    await page.waitFor('.wpcf7-form');

    //Waiting for field First Name to appear and storing its UI element in name variable and entering test value
    const fname = await page.waitForSelector("#firstName");
    await fname.type("Testing UI Automation");

    //Waiting for field Last Name to appear and storing its UI element in name variable and entering test value
    const lname = await page.waitForSelector("#lastName");
    await lname.type("Test last Name");

    //Waiting for field Email to appear and storing its UI element in name variable and entering test value
    const email = await page.waitForSelector("#companyEmail");
    await email.type("test@testmail.com");

    //Waiting for dropdown element and clicking on it
    const dropdown = "#select2-subject-container";
    await page.waitForSelector(dropdown);
    await page.click(dropdown);

    //Enter on subject
    await page.keyboard.press('Enter');


    //Entering Message in the message field
    const message = await page.waitForSelector("#message");
    await message.type("This is a test message created by automated testing of UI using Puppeteer");

    //Clicking on Contact us
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    //Take screenshot of filled form UI
    await page.screenshot({path: 'afterfill.png'});

    //Wait for form to be submitted
    await page.waitForSelector(".thank-you__title");

    //Take screenshot of after submit form UI
    await page.screenshot({path: 'aftersubmit.png'});

    await browser.close();
})();