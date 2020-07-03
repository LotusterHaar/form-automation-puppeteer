const puppeteer = require('puppeteer');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

//Defining chromeOptions for defining path, time to execute and setting headless mode to false
const chromeOptions = {
    slowMo: 100,
    headless:false,
    args: ['--start-maximized']
};
(async () => {

    const browser = await puppeteer.launch(chromeOptions);

    const page = await browser.newPage();

    //Navigating to Test Project Contact Form
    await page.goto('https://www.orange-juice.nl/stage');

    //Taking screenshot of initial page UI
    await page.screenshot({path: 'beforefill.png'});

    //Waiting for form to load
    await page.waitFor('.form');

    //Waiting for field First Name to appear and storing its UI element in name variable and entering test value
    const nameEl = await page.$("input[name='name']")
    nameEl.type('abc');

    // //Waiting for field Email to appear and storing its UI element in name variable and entering test value
    const emailEl = await page.waitForSelector("#email");
    await emailEl.type("lotus@orange-juice.nl");

    // Search for the radio buttons by their identifier, click on them (the last value of a form-group will remain selected)

    const radioValues2 = await page.$$eval(
        'input[type="radio"]',
        radios =>
            radios.map(radio => {
                radio.click();
                return radio.checked
            })
    );
    console.log(radioValues2);

    const radioValues1 = await page.$$eval(
        'input[type="radio"]',
        radios =>
            radios.map(radio => {
                return radio.checked
            })
    );
    console.log(radioValues1);


    const dateEl = await page.waitForSelector("#date");
    await dateEl.type('31082020')



    // get the selector input type=file (for upload file)
    await page.waitForSelector('input[type=file]');
    await page.waitFor(1000);

    // get the ElementHandle of the selector above
    const inputUploadHandle = await page.$('input[type=file]');

    // prepare file to upload, I'm using test_to_upload.jpg file on same directory as this script
    // Photo by Ave Calvar Martinez from Pexels https://www.pexels.com/photo/lighthouse-3361704/
    let fileToUpload = 'testcv.docx';

    // Sets the value of the file input to fileToUpload
    inputUploadHandle.uploadFile(fileToUpload);



    //Entering Message in the message field
    const message = await page.waitForSelector("#motivation");
    await message.type("This is a test message created by automated testing of UI using Puppeteer");

    //Clicking on Send, to submit thge form
    const sendButtonNodeSelector = ".btn-primary";
    await page.click(sendButtonNodeSelector);

    //Take screenshot of filled form UI
    await page.screenshot({path: 'afterfill.png'});

    //Wait for form to be submitted
    await page.waitForSelector(".form-success");

    //Take screenshot of after submit form UI
    await page.screenshot({path: 'aftersubmit.png'});

    await browser.close();
})();