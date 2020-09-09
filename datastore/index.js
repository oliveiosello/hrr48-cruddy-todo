const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

//CREATE CALLBACK
// var addTodo = (todo) => {
//   console.log(todo);
//   $('#todos').append(renderTodo(todo));
// };
// './data/`${id}`
//fs.writefile('./data', text,  ,  callback)
//                 ^ name of file

//exports.counterFile = path.join(__dirname, 'counter.txt');
// `./data/${id}`;
exports.create = (text, callback) => {
  counter.getNextUniqueId(id = (err) => {
  //filePath = path.join('/datastore/data', id.toString());
    if (err) {
      console.log('id is not working');
    } else {
      fs.writeFile(`./data/${id}`, text, (err) => {
        if (err) {
          console.log('we made it this far!');
        } else {
          fs.readFile(`./data/${id}`, (err) => {
            if (err) {
              console.log('hello there');
            } else {
              callback(null, { id: text });
            }
          });
        }
        // items[id] = text;
        // callback(null, { id, text });

      });
    }
  });
};
//new todo is saved in own file
//somehow create a path inside of data directory
//id is encoded in file name
//text only in file

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
