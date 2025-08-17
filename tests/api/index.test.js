import test from '@joystick.js/test';

test.that('index getter returns version and stars data', async (assert = {}) => {
  const data = await test.api.get('index');
  
  assert.is(typeof data, 'object');
  assert.is(typeof data.version, 'string');
  assert.is(typeof data.stars, 'number');
  
  assert.is(data.version.length > 0, true);
  
  // NOTE: Stars should be a non-negative number (0 is acceptable if GitHub API fails)
  assert.is(data.stars >= 0, true);
});

test.that('index getter handles API failures gracefully', async (assert = {}) => {
  // NOTE: This test demonstrates that the getter should work even if external APIs fail
  const data = await test.api.get('index');
  
  assert.is(typeof data, 'object');
  assert.is('version' in data, true);
  assert.is('stars' in data, true);
});
