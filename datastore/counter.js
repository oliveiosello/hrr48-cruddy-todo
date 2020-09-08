const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  readCounter((err, oldCounter) => {
    let newCounter = oldCounter + 1;
    console.log(newCounter);
    writeCounter(newCounter, (err, zeroPaddedNumber) => {
      callback(err, zeroPaddedNumber);
    });
  });
  //return zeroPaddedNumber(newCounter);
};




// writeCounter(counter, (err, callback) => {
//   if (err) {
//     throw Error;
//   } else {
//     callback(null, readCounter(callback => {
//       if (err) {
//         throw Error;
//       } else {
//         callback(null, zeroPaddedNumber(counter));
//       }
//     }));
//   }
// });

//read counter takes a callback

// getNextUniqueId
// 1) should use error first callback pattern
// 2) should give an id as a zero padded string
// 3) should give the next id based on the count in the file
// 4) should update the counter file with the next value




// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
