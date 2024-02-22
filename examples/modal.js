// Find and click on "Open modal" button, find and click on the "Close" button

it('Modal', async () => {        
    await driver.get('http://formy-project.herokuapp.com/modal');
            
    let modalButton = await driver.findElement(By.id('modal-button'));
    modalButton.click();     

    // Use JavaScript to close the modal
    let closeButton = await driver.findElement(By.id('close-button'));
    driver.executeScript('arguments[0].click()', closeButton);  
});
