import test from '@joystick.js/test';

test.that('Button component renders as a link when href is provided', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      href: 'https://example.com',
      label: 'Click Me',
      theme: 'brand',
      target: '_blank',
      classes: 'custom-class'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('<a href="https://example.com"'), true);
  assert.is(html.includes('Click Me'), true);
  assert.is(html.includes('mod-button-brand'), true);
  assert.is(html.includes('target="_blank"'), true);
  assert.is(html.includes('custom-class'), true);
});

test.that('Button component renders as a button when href is not provided', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {
      label: 'Submit',
      theme: 'success',
      classes: 'submit-btn'
    }
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('<button'), true);
  assert.is(html.includes('Submit'), true);
  assert.is(html.includes('mod-button-success'), true);
  assert.is(html.includes('submit-btn'), true);
  assert.is(html.includes('href'), false);
});

test.that('Button component handles missing props gracefully', async (assert = {}) => {
  const component = await test.render('ui/components/button/index.js', {
    props: {}
  });

  const html = component.instance.render_to_html();
  
  assert.is(html.includes('<button'), true);
  assert.is(html.includes('mod-button'), true);
});
