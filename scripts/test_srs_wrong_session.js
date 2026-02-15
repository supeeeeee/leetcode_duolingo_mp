const test = require('node:test');
const assert = require('node:assert/strict');

const srs = require('../miniprogram/services/srs');
const questions = require('../miniprogram/data/questions');

function toIds(list) {
  return list.map(item => item.id);
}

const sampleIds = questions.slice(0, 12).map(item => item.id);

test('wrong session ordering is stable for same day seed', () => {
  const first = srs.getWrongSession(5, {
    daySeed: '2026-02-15',
    wrongIds: sampleIds
  });
  const second = srs.getWrongSession(5, {
    daySeed: '2026-02-15',
    wrongIds: sampleIds
  });

  assert.deepEqual(toIds(first), toIds(second));
});

test('wrong session ordering ignores wrong list insertion order', () => {
  const asc = srs.getWrongSession(5, {
    daySeed: '2026-02-15',
    wrongIds: sampleIds
  });
  const desc = srs.getWrongSession(5, {
    daySeed: '2026-02-15',
    wrongIds: [...sampleIds].reverse()
  });

  assert.deepEqual(toIds(asc), toIds(desc));
});

test('wrong session ordering changes across day seed', () => {
  const today = srs.getWrongSession(10, {
    daySeed: '2026-02-15',
    wrongIds: sampleIds
  });
  const tomorrow = srs.getWrongSession(10, {
    daySeed: '2026-02-16',
    wrongIds: sampleIds
  });

  assert.notDeepEqual(toIds(today), toIds(tomorrow));
});

test('wrong session deduplicates ids and filters unknown ids', () => {
  const ids = [sampleIds[0], sampleIds[0], 'missing-question', sampleIds[1]];
  const result = srs.getWrongSession(5, {
    daySeed: '2026-02-15',
    wrongIds: ids
  });
  const resultIds = toIds(result);

  assert.equal(resultIds.length, 2);
  assert.equal(new Set(resultIds).size, 2);
  assert.ok(resultIds.includes(sampleIds[0]));
  assert.ok(resultIds.includes(sampleIds[1]));
});
