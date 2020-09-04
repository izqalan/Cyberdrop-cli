let assert = require('chai').assert
const { getTitle, extractLink } = require('../src/functions')
const TEST_URL = 'https://cyberdrop.me/a/uarEwZgN';

describe('Get album title', () => {
  let title;
  before(async () => {
    title = await getTitle(TEST_URL);
  })
  it('should find the title', () => {
    assert.exists(title);
  });
  it('Title should match', () => {
    assert.equal(title, 'SFW', 'title does not match');
  });
  
})

describe('Get album items', () => {
  let urls;
  before(async () => {
    urls = await extractLink(TEST_URL);
  })
  it('should find the images url', () => {
    assert.exists(urls);
  });
  it('should match the number of images in the album', () => {
    assert.equal(urls.length, 2);
  });
})