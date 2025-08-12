import test from '@joystick.js/test-canary';

// NOTE: Helper function to wait for a specified time
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// NOTE: Helper function to wait for function calls to be tracked
const wait_for_function_calls = async (path, expected_count = 1, max_attempts = 10) => {
  for (let attempt = 0; attempt < max_attempts; attempt++) {
    const function_calls = await test.utils.get_function_calls(path);
    if (function_calls && function_calls.length >= expected_count) {
      return function_calls;
    }
    await wait(100); // Wait 100ms between attempts
  }
  
  return await test.utils.get_function_calls(path);
};

test.that('clock websocket connection sends timestamp on open', async (assert = {}) => {
  const connection = await test.websockets.connect('clock');

  await wait(200);

  connection.close();

  await wait(200);

  const function_calls = await wait_for_function_calls('node.websockets.clock.on_open');
  assert.is(function_calls.length > 0, true);
});

test.that('clock websocket sends and receives messages', async (assert = {}) => {
  const connection = await test.websockets.connect('clock');

  await wait(200);

  connection.send({
    test: 'message from client'
  });

  await wait(200);

  connection.close();

  await wait(200);

  const function_calls = await wait_for_function_calls('node.websockets.clock.on_message');

  assert.is(function_calls.length > 0, true);
  
  if (function_calls.length > 0) {
    assert.like(function_calls[0]?.args[0], {
      test: 'message from client'
    });
  }
});

test.that('clock websocket handles connection close', async (assert = {}) => {
  const connection = await test.websockets.connect('clock');

  await wait(200);

  connection.close();

  await wait(300);

  const function_calls = await wait_for_function_calls('node.websockets.clock.on_close');
  assert.is(function_calls.length > 0, true);
});
