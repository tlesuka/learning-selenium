// Find the datepicker input, enter the date and press return

it('Datepicker', async function() {
    await driver.get('https://formy-project.herokuapp.com/datepicker');

    let date = await driver.findElement(By.id('datepicker')).click();
    date.sendKeys('01/02/2024', Key.RETURN);       
});
