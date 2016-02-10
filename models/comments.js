/**
 * Created by IlyaLitvinov on 01.12.15.
 */
var _ = require('lodash');
var items = [
    {
        author: 'Jack Jones',
        date: new Date(),
        text: 'Hello world, loremfdsjfkhlajskdhfk',
        id: 0
    },
    {
        author: 'John Smith',
        date: new Date(),
        text: 'Hello world, loremfdsjfkhlajskdhfk',
        id: 1
    }];
var id = _.max(items, function (item) {
        return item.id;
    }).id + 1;

var commentsModel = {
    setItem: function (data) {
        data.id = _.max(items, function (item) {
                return item.id;
            }).id + 1;
        data.date = new Date();

        items.push(data);
        console.log('add to Array');
        return items;
    },
    getItems: function () {
        return items;
    },
    updateItem: function (data, id) {
        var index = items.indexOf(_.find(items, function (item) {
            return item.id === Number(id);
        }));
        data.date = new Date();
        data.id = id;

        items[index] = data;
        return items;
    },
    deleteItem: function (id) {
        var index = items.indexOf(_.find(items, function (item) {
            return item.id === Number(id);
        }));

        if (index === -1) {
            return false;
        }

        items.splice(index, 1);
        return items;
    }
};

module.exports = commentsModel;