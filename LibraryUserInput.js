//const prompt = require('prompt-sync')();
const prompt = require('prompt-sync')({sigint: true});
const name = prompt('What is your name?');
console.log(`Hey there ${name}`);


