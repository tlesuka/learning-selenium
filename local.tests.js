// This suite of tests is meant to be run locally on chrome browser.

require("chromedriver")

const assert = require('assert');
const { before, after } = require('mocha');
const {Builder, Key, By, until}  = require('selenium-webdriver');
const AssertionError = require('assert').AssertionError;


describe('Local suite - Chrome', function () {
    let driver;
    
    // Before each function connect to chrome driver
    before(async function() {
              driver = await new Builder().forBrowser("chrome").build();
    });

    // Search on google test
    it('Search on Google', async function() {
        await driver.get('https://google.com');
        await driver.findElement(By.id('W0wltc')).click();
        await driver.findElement(By.id('APjFqb')).click();
        await driver.findElement(By.id('APjFqb')).sendKeys('tina leskovšek kren', Key.RETURN);
        await driver.wait(until.titleIs('tina leskovšek kren - Google Search'), 4000);

        let title = await driver.getTitle();
        assert.equal(title, 'tina leskovšek kren - Google Search');      

        await driver.wait(until.elementLocated(By.partialLinkText('Tina Leskovšek Kren')), 4000);
        await driver.findElement(By.partialLinkText('Tina Leskovšek Kren')).click();

        assert.equal("https://www.facebook.com/tina.leskovsek/?locale=sl_SI", await driver.getCurrentUrl());   
    });
    
    // Search on github
    it('Search on Github', async function() {

        await driver.get('https://github.com/tlesuka');
        await driver.findElement(By.id('748676952')).click();
        await driver.wait(until.titleIs('GitHub - tlesuka/rock-paper-scissors'), 4000);

        assert.equal("https://github.com/tlesuka/rock-paper-scissors", await driver.getCurrentUrl());
    });

    // Scroll
    it('Scroll', async function() {
        await driver.get('http://formy-project.herokuapp.com/scroll');

        let name = await driver.findElement(By.id('name'));

        driver.executeScript('arguments[0].scrollIntoView()', name);       
        name.sendKeys('Maja Novak');

        let date = await driver.findElement(By.id('date'));
        date.sendKeys('01/01/2024');
    });

    //Datepicker
    it('Datepicker', async function() {
        await driver.get('https://formy-project.herokuapp.com/datepicker');

        let date = await driver.findElement(By.id('datepicker'));
        date.sendKeys('01/02/2024', Key.RETURN);

        await driver.sleep(300);
    });

    //Dropdown
    it('Dropdown', async function() {
        await driver.get('https://formy-project.herokuapp.com/dropdown');

        let dropDownButton = await driver.findElement(By.id('dropdownMenuButton'));
        dropDownButton.click();

        await driver.sleep(300);

        let autocompleteChoice = await driver.findElement(By.id('autocomplete'));
        autocompleteChoice.click();

        await driver.navigate().back();

        await driver.sleep(300);
    });
 
    //Form
    it('Form', async function () {
        try {
        await driver.get('https://formy-project.herokuapp.com/form');

        await driver.findElement(By.id('first-name')).sendKeys('Maja');
        await driver.findElement(By.id('last-name')).sendKeys('Novak');
        await driver.findElement(By.id('job-title')).sendKeys('dentist');
        await driver.findElement(By.id('radio-button-3')).click();
        await driver.findElement(By.id('checkbox-2')).click();
        await driver.findElement(By.id('select-menu')).click();
        await driver.findElement(By.css("option[value='2']")).click();
        await driver.findElement(By.id('datepicker')).sendKeys('01/02/2024', Key.RETURN);
        await driver.findElement(By.css('.btn.btn-lg.btn-primary')).click();

        let alertText = await driver.wait(until.elementLocated(By.className('alert')), 10000);
            assert.equal('the form was successfully submitted!', await alertText.getText());
    
        } catch (error) {
            if (error instanceof AssertionError) {
             // Output expected AssertionErrors.
             throw new Error(error);                
            } else {
             // Output unexpected Errors.
             console.log(error);
             }                   
        }                

    })

    // Close driver after tests
    after(() => driver && driver.quit());
});
