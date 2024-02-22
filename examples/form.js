// Find first name input and enter a name, find last name input and enter a last name, find job title input and enter a job title, 
// find and choose the third choice for education,
// find and check out the female option for sex,
// find and click on select dropdown menu, select second option for years of experience,
// find the datepicker input, enter the date and press return,
// find and click on "Submit" button.
// Check if the message after submitting the form is correct or not.


const AssertionError = require('assert').AssertionError;

it('Form', async () => {        
    try {
        await driver.get('http://formy-project.herokuapp.com/form');

        await driver.findElement(By.id('first-name')).sendKeys('Maja');
        await driver.findElement(By.id('last-name')).sendKeys('Novak');
        await driver.findElement(By.id('job-title')).sendKeys('dentist');
        await driver.findElement(By.id('radio-button-3')).click();
        await driver.findElement(By.id('checkbox-2')).click();
        await driver.findElement(By.id('select-menu')).click();
        await driver.findElement(By.css("option[value='2']")).click();
        await driver.findElement(By.id('datepicker')).sendKeys('01/02/2024', Key.RETURN);
        await driver.findElement(By.css('.btn.btn-lg.btn-primary')).click();                       
               
        // assertion  
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
});
