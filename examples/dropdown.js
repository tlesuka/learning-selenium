// Find and click on the dropdown button, find and click on the autocomplete choice, then navigate back

it('Dropdown', async function() {
    await driver.get('https://formy-project.herokuapp.com/dropdown');

    let dropDownButton = await driver.findElement(By.id('dropdownMenuButton'));
    dropDownButton.click();

    // Wait for 0.3 seconds before clicking on item
    await driver.sleep(300);

    let autocompleteChoice = await driver.findElement(By.id('autocomplete'));
    autocompleteChoice.click();

    await driver.navigate().back();                      
});
