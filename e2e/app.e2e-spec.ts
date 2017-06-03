import { Aping2ShiftPage } from './app.po';

describe('aping2-shift App', () => {
  let page: Aping2ShiftPage;

  beforeEach(() => {
    page = new Aping2ShiftPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
