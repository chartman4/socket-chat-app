var moment = require('moment');

// // create a new moment object representing the current point in time.
// var date = moment();
// // date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('h:mm a'));

//10:35 am  print current time in this formant
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 2334;
var date = moment(createdAt);
console.log(date.format('h:mm a'));