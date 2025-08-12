import test from '@joystick.js/test-canary';

test.that('index route renders correctly', async (assert = {}) => {
  const response = await test.routes.get('/');
  
  assert.is(response?.body?.includes('index-page'), true);
  assert.is(response?.body?.includes('Joystick'), true);
  assert.is(response?.body?.includes('mod-panel-group'), true);
});

test.that('not found route renders correctly', async (assert = {}) => {
  const response = await test.routes.get('/nonexistent-page');
  
  assert.is(response?.body?.includes('not-found'), true);
});

test.that('index route handles theme cookie correctly', async (assert = {}) => {
  const response = await test.routes.get('/', {
    headers: {
      'Cookie': 'theme=dark'
    }
  });
  
  assert.is(response?.body?.includes('joystick_logo_dark.svg'), true);
});

test.that('index route handles language cookie correctly', async (assert = {}) => {
  const response = await test.routes.get('/', {
    headers: {
      'Cookie': 'language=es-ES'
    }
  });

  assert.is(response?.body?.includes('window.__joystick_language__ = "es-ES"'), true);
});
