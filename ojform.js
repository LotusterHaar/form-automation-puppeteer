const puppeteer = require('puppeteer');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

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
    await page.goto('https://www.orange-juice.nl/stage');

    var HTML = await page.content()

    //console.log(HTML.$( "label:contains('Naam')" ));

    //a[contains(text(), 'Some text')]

    //
    // await page.waitForXPath('//label[contains(text(), "Naam")]', 5000);
    // const elementHandles = await page.$x('//label[contains(text(), "Naam")]');
    //
    // // const elementHandles = await page.$x( "//label[contains(text(), 'Naam')]");
    //
    // for (const element of elementHandles) {
    //     const idLabel = await page.evaluate(el => el, element);
    //     console.log("idLabel")
    //     console.log(idLabel)
    // }

    // export const selectOption = async ( label, value ) => {
    //     const [ selectEl ] = await page.$x( `//label[@class="label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
    //     const selectId = await page.evaluate(
    //         ( el ) => el.id,
    //         selectEl
    //     );
    //     await page.select( `#${ selectId }`, value );
    // };

    // let id = await page.evaluate(el => el, elHandle[0]);
    // console.log(id);
    // // const elHandle = await page.$( "label:contains('Naam')")
    //     // console.log(elHandle);

    // var xpath = "//label[text()='SearchingText']";
    // var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // console.log(matchingElement);
    // const className = await elHandle.getProperty('className')

    //console.log(className);
    // prepare to get the textContent of the selector above (use page.evaluate)
    //let lamudiNewPropertyCount = await page.evaluate(el => console.log(el), elHandle[0]);

    //Taking screenshot of initial page UI
    await page.screenshot({path: 'beforefill.png'});


    //Waiting for form to load
    await page.waitFor('.form');

    // await page.evaluate(label => {
    //     $(`input:contains('${label}')`)[0].type('Lotus')
    // }, 'Naam')

    //
    // await page.waitForXPath("//*[@class='form-group' and contains(text(),'Naam')]", 5000);
    // const [example] = await page.$x("//*[@class='form-group' and contains(text(),'Naam')]");
    // console.log(example)
    // await example.type('Lotus');

    //Waiting for field First Name to appear and storing its UI element in name variable and entering test value
    const fname = await page.waitForSelector("#name");
    await fname.type("Testing UI Automation");


    //Waiting for field Email to appear and storing its UI element in name variable and entering test value
    const email = await page.waitForSelector("#email");
    await email.type("test@testmail.com");

    // //Waiting for dropdown element and clicking on it
    // const dropdown = "#select2-subject-container";
    // await page.waitForSelector(dropdown);
    // await page.click(dropdown);
    //
    // //Enter on subject
    // await page.keyboard.press('Enter');


    //Entering Message in the message field
    const message = await page.waitForSelector("#motivation");
    await message.type("This is a test message created by automated testing of UI using Puppeteer");

    //Clicking on Contact us
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    //Take screenshot of filled form UI
    await page.screenshot({path: 'afterfill.png'});

    //Wait for form to be submitted
    await page.waitForSelector(".form-success");

    //Take screenshot of after submit form UI
    await page.screenshot({path: 'aftersubmit.png'});

    await browser.close();
})();