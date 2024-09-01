import {test, expect, type Page} from '@playwright/test';

const firstName = 'Lord';
const lastName = 'Voldermort';
const postCode = 'E42069';
const fullName = `${firstName} ${lastName}`;



test.use({
    browserName: 'chromium',
    launchOptions: {
        headless: false
    }
})

async function navigateToBankingProject(page:Page) {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
}

async function managerLogin(page:Page) {
    await page.locator('[ng-click="manager()"]').click();
}

async function addCustomner(page:Page) {
    await page.locator('[ng-click="addCust()"]').click();
    await page.locator('[ng-model="fName"]').fill(firstName);
    await page.locator('[ng-model="lName"]').fill(lastName);
    await page.locator('[ng-model="postCd"]').fill(postCode);
    await page.getByRole('button', {name: 'Add Customer'}).nth(1).click();
}

async function openCustAccount(page:Page) {
    await page.locator('[ng-click="openAccount()"]').click();
    await page.selectOption('select#userSelect', fullName);
    await page.selectOption('select#currency', 'Dollar');
    await page.getByRole('button', {name: 'Process'}).click();
    await page.on('dialog', async dialog => {
        await dialog.accept();
      });
}

async function assertCustomerInTable(page: Page) {
    await page.locator('[ng-click="showCust()"]').click();
    const customerRow = page.locator(`text=${firstName}`).locator('xpath=..').locator('xpath=..');
  
    await expect(customerRow.locator('td').nth(25)).toHaveText(firstName);
    await expect(customerRow.locator('td').nth(26)).toHaveText(lastName);
    await expect(customerRow.locator('td').nth(27)).toHaveText(postCode);
  }

async function customerLogin(page:Page) {
    await page.click('[ng-click="home()"]');
    await page.click('[ng-click="customer()"]')
}

test('Open page', async ({ page }) => {
    await navigateToBankingProject(page);
    await managerLogin(page);
    await addCustomner(page);
    await openCustAccount(page);
    await assertCustomerInTable(page);
    await customerLogin(page);
})