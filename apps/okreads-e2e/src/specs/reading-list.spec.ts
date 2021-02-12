import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = $('form');
    const input = $('input[type="search"]');
    await input.sendKeys('java');
    await form.submit();
  });

  it('Then: I should see my reading list', async () => {
    const readingListToggle = $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to undo added book in reading list', async () => {
    const itemsBeforeUndo = await $$('[data-testing="reading-list-item"]');
    const wantToReadCTA = await $$('[data-testing="add-book-to-reading-list"]:enabled').first();
    wantToReadCTA.click();

    browser.executeScript(
      "document.querySelectorAll('.mat-simple-snackbar-action button')[0].click();"
    );
    const readingListToggle = $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const itemsAfterUndo = await $$('[data-testing="reading-list-item"]');
    expect(itemsAfterUndo.length).toEqual(itemsBeforeUndo.length);
  });

  it('Then: I should be able to undo removed book from book items', async () => {
    const itemsBeforeUndo = await $$('[data-testing="reading-list-item"]');
    const wantToReadCTA = await $$('[data-testing="add-book-to-reading-list"]:enabled').first();
    wantToReadCTA.click();

    const readingListToggle = $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const removeBookCTA = await $$('[data-testing="remove-reading-list-button"]');
    removeBookCTA[0].click();

    browser.executeScript(
      "document.querySelectorAll('.mat-simple-snackbar-action button')[0].click();"
    );
    const itemsAfterUndo = await $$('[data-testing="reading-list-item"]');
    expect(itemsAfterUndo.length).toBe(itemsBeforeUndo.length);
  });
});