function toSeconds(ms) {
  if (ms === 0) {
    return '0 ms'
  } else if(ms < 1000) {
    return '~1sec'
  }
  return `${(Math.round(ms/100)/10).toFixed(1)} sec`
}

function getSummary(results) {
  const result = {
    fail: 0,
    pass: 0,
    pending: 0
  }

  const tests = results.reduce((arr, res) => arr.concat(res.suites), [])
    .reduce((arr, suite) => arr.concat(suite.tests), [])
  for (var i = tests.length - 1; i >= 0; i--) {
    result[tests[i].state]++
  }

  return result
}

function getFailTests(results) {
  return results.reduce((arr, res) => arr.concat(res.suites), [])
    .reduce((arr, suite) => arr.concat(suite.tests), [])
    .filter(test => test.state === 'fail')
}

function getSpecs(results) {
  const specMap = results.reduce((map, res) => {
    map[res.spec] = true
    return map
  }, {})
  return Object.keys(specMap)
}

function getSpecSummary(spec) {
  const result = {
    fail: 0,
    pass: 0,
    pending: 0,
    suites: spec.suites.length,
    browser: spec.capabilities.browserName,
    os: spec.capabilities.os
  }

  const tests = spec.suites.reduce((arr, suite) => arr.concat(suite.tests), [])
  for (var i = tests.length - 1; i >= 0; i--) {
    result[tests[i].state]++
  }

  result.runtime = spec.suites.reduce((sum, cur) => sum + cur._duration, 0)
  return result
}
