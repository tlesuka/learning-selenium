// Find file upload field, write a file name and press reset

it('File Upload', async () => {        
    await driver.get('http://formy-project.herokuapp.com/fileupload');

    await driver.sleep(300); 

    let fileUploadField = await driver.findElement(By.id('file-upload-field'));
    fileUploadField.sendKeys('Test.Plan.jmx');
        
    await driver.findElement(By.className('btn-reset')).click();                 
});
