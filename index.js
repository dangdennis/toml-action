const core = require('@actions/core');
const github = require('@actions/github');
const toml = require('toml');
const fs = require('fs');
const path = require('path');

try {
  const file = core.getInput('file');
  const field = core.getInput('field');
  const workingDirectory =
    core.getInput('working-directory', {
      required: false,
      trimWhitespace: true,
    }) ?? '';
  var fields = field.split('.');
  var str = fs.readFileSync(path.join(workingDirectory, file));
  var parsed = toml.parse(str);
  var value = parsed;
  fields.forEach(function (f) {
    value = value[f];
  });
  core.setOutput('value', value);
} catch (error) {
  core.setFailed(error.message);
}
