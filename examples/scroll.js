// Find form input at the bottom of the page, scroll to the name input and write a name, then find a date field, write a date and press return

it('Scroll', async () => {        
    await driver.get('http://formy-project.herokuapp.com/scroll')             

    let name = await driver.findElement(By.id('name'));

    driver.executeScript('arguments[0].scrollIntoView()', name);        
    name.sendKeys('Maja Novak');

    let date = await driver.findElement(By.id('datepicker'));
    date.sendKeys('01/02/2024', Key.RETURN);      
});