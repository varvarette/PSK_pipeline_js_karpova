var shell = require('shelljs');
var argv = require('yargs')
  .option(
    {'size': {
               alias: 's',
               describe: 'Size of the test',
               choices: ['small', 'large'],
               default: 'small'
             },
     'lang': {
               alias: 'l',
               describe: 'Language of program to test',
               choices: ['java', 'javascript'],
               default: 'java'
             },
     'main': {
               alias: 'm',
               describe: 'Main Java class or JavaScript file',
               default: 'TermFrequency'
             }
  })
  .argv

if (argv.lang == 'java') {
  console.log('==> Compiling Java classes');
  shell.exec('javac *.java');
}

var commandName = {'java': 'java', 'javascript': 'node'};
var inputFile = ['input-', argv.size, '.txt'].join('');
// to make 25 a parameter we can't have the expected value hardcoded
var command = [commandName[argv.lang], argv.main, inputFile, '25'].join(' ');

// run the program
console.log('==> Running \"' + command + '\"');
var stdout = shell.exec(command).stdout;

/**
 * Function to sort the produced output numerically by second column and as a second key
 * lexicographically by first column This ensures that words with the same
 * frequency are ordered lexicographically as in the expected output
 */
var order = function(a, b) {
  if (b[1] - a[1] != 0) {
    // sort first by number
    return b[1] - a[1];
  } else {
    // sort second by name
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  }
};

// sort the output
var output =
  stdout
    .split('\n')
    .map(line => line.split('  -  '))
    .sort(order)
    .map(x => x.join('  -  '))
    .join('\n');

var expected =
  {
    'small': 'live  -  2\n' +
             'mostly  -  2\n' +
             'africa  -  1\n' +
             'india  -  1\n' +
             'lions  -  1\n' +
             'tigers  -  1\n' +
             'white  -  1\n' +
             'wild  -  1',
    'large': 'mr  -  786\n' +
             'elizabeth  -  635\n' +
             'very  -  488\n' +
             'darcy  -  418\n' +
             'such  -  395\n' +
             'mrs  -  343\n' +
             'much  -  329\n' +
             'more  -  327\n' +
             'bennet  -  323\n' +
             'bingley  -  306\n' +
             'jane  -  295\n' +
             'miss  -  283\n' +
             'one  -  275\n' +
             'know  -  239\n' +
             'before  -  229\n' +
             'herself  -  227\n' +
             'though  -  226\n' +
             'well  -  224\n' +
             'never  -  220\n' +
             'sister  -  218\n' +
             'soon  -  216\n' +
             'think  -  211\n' +
             'now  -  209\n' +
             'time  -  203\n' +
             'good  -  201'
  };

console.log('==> Checking output');
if (expected[argv.size].trim() === output.trim()) {
  console.log('ok');
} else {
  console.log('Test failed. Expected:\n\"' + expected[argv.size].trim() + '\"\nbut found:\n\"' + output.trim() + '\"');
}
