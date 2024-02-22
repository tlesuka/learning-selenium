const assert = require('assert');
const { before, after } = require('mocha');
const {Builder, Key, By, until}  = require('selenium-webdriver');

 ["chrome", "firefox", "MicrosoftEdge"].forEach( function(browser) {
 describe.skip('Grid suite - ' + browser, function () {

    let driver;
    
    // Before each function connect to chrome driver
    before(async function() {
         driver = await new Builder().usingServer("http://localhost:4444").withCapabilities({
             "build" : "JavaScript and Selenium Testing",
             "name" : "Test " + browser,
             "browserName" : browser,
         }).build();
    });

    // Search on google test 
     xit('Search on Google', async function() {
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
 

    // Close driver after tests
    after(() => driver && driver.quit());
})

 })
