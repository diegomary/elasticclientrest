import { browser, by, element } from 'protractor';

export class Aping2ShiftPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
