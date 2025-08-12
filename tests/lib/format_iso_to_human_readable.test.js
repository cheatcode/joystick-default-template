import test from '@joystick.js/test-canary';

test.that('format_iso_to_human_readable formats ISO date strings correctly', async (assert = {}) => {
  const format_iso_to_human_readable = await test.load('lib/format_iso_to_human_readable.js', { default: true });
  
  const iso_string = '2024-03-15T14:30:45.123Z';
  const result = format_iso_to_human_readable(iso_string);
  
  assert.is(result.includes('March'), true);
  assert.is(result.includes('15th'), true);
  assert.is(result.includes('2024'), true);
  assert.is(result.includes('at'), true);
});

test.that('format_iso_to_human_readable handles different day suffixes correctly', async (assert = {}) => {
  const format_iso_to_human_readable = await test.load('lib/format_iso_to_human_readable.js', { default: true });
  
  const first = format_iso_to_human_readable('2024-01-01T12:00:00.000Z');
  assert.is(first.includes('1st'), true);
  
  const second = format_iso_to_human_readable('2024-01-02T12:00:00.000Z');
  assert.is(second.includes('2nd'), true);
  
  const third = format_iso_to_human_readable('2024-01-03T12:00:00.000Z');
  assert.is(third.includes('3rd'), true);
  
  const fourth = format_iso_to_human_readable('2024-01-04T12:00:00.000Z');
  assert.is(fourth.includes('4th'), true);
});
