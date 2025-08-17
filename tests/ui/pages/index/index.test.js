import test from '@joystick.js/test';

test.that('Index page renders with correct structure and data', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('index-page'), true);
  assert.is(html.includes('directory'), true);
  
  assert.is(html.includes('joystick_logo_light.svg'), true);
  
  assert.is(html.includes('mod-panel-group'), true);
  assert.is(html.includes('mod-panel'), true);
});

test.that('Index page handles theme switching event', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      language: 'en-US'
    }
  });

  component.test.event('change', '[name="theme"]');
 
  const function_calls = await test.utils.get_function_calls('ui.index_page.events.change.selector_[name="theme"]');
  assert.is(function_calls.length > 0, true);
});

test.that('Index page handles language switching event', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      language: 'en-US'
    }
  });

  component.test.event('change', '[name="language"]');
  
  const function_calls = await test.utils.get_function_calls('ui.index_page.events.change.selector_[name="language"]');
  assert.is(function_calls.length > 0, true);
});

test.that('Index page data function fetches index data', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {
      theme: 'light'
    },
    options: {
      language: 'en-US'
    }
  });

  const data = await component.test.data();
  
  assert.is(typeof data, 'object');
  assert.is('index' in data, true);
  assert.is(typeof data.index, 'object');
});

test.that('Index page websocket state updates correctly', async (assert = {}) => {
  const component = await test.render('ui/pages/index/index.js', {
    props: {
      theme: 'light'
    },
    state: {
      websockets_connected: true,
      timestamp: '2024-03-15T14:30:45.123Z'
    },
    options: {
      language: 'en-US'
    }
  });

  const html = component.instance.render_to_html();

  assert.is(html.includes('mod-alert-success'), true);
  assert.is(html.includes('March 15th'), true);
});
