import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = $('form');
    const input = $('input[type="search"]');
    await input.sendKeys('javascript');
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

  it('Then: I should be able to mark book as finished', async () => {
    const wantToReadCTA = await $$('[data-testing="add-book-to-reading-list"]:enabled').first();
    wantToReadCTA.click();

    const readingListToggle = $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const markAsReadCTA = await $$('[data-testing="mark-as-read"]').last();
    markAsReadCTA.click();

    const finishedBookText = $$('[data-testing="finished-date"]').last();
    expect(finishedBookText.getText()).toContain('Finished: ');
  });
});
