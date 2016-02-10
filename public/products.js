var AJAX = {
    GET: function (url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            // по окончании запроса доступны:
            // status, statusText
            // responseText, responseXML (при content-type: text/xml)

            if (this.status != 200) {
                // обработать ошибку
                console.log('Error');
                return;
            }

            console.log(xhr.response);
            callback(JSON.parse(xhr.response));
            // получить результат из this.responseText или this.responseXML
        }
    },
    POST: function (url, callback, data) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            // по окончании запроса доступны:
            // status, statusText
            // responseText, responseXML (при content-type: text/xml)

            if (this.status != 200) {
                // обработать ошибку
                console.log('Error');
                return;
            }

            console.log(xhr.response);
            callback(JSON.parse(xhr.response));
            // получить результат из this.responseText или this.responseXML
        }
    },
    DELETE: function (url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('DELETE', url, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                console.log('Error');
                return;
            }
            console.log(xhr.response);
            callback(JSON.parse(xhr.response));            
        };        
    },
    PUT: function (url, callback, data) {
        var xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);

        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {                
                console.log('Error');
                return;
            }
            console.log(xhr.response);
            callback(JSON.parse(xhr.response));
        }
    }

};

Object.freeze(AJAX);

var Products = (function () {
    function Constructor(root) {
        this.items = [];
        this.root = document.querySelector(root);
        this.listItem = this.root.querySelector('.listProducts');
        this.addBtn = this.root.querySelector('.add');        
        this.productField = this.root.querySelector('.fieldProduct');
        this.getItems();
        this.addEvents();
    }

    Constructor.prototype.renderAll = function () {
        var self = this;
        this.listItem.innerHTML = '';
        this.items.forEach(function (item, i) {           
            self.listItem.appendChild(self.renderOne(item, i));            
        });
         this.productField.value = '';
    }

    Constructor.prototype.renderOne = function (text, i) {
        var self = this,
            li,
            title,
            editField,
            deleteBtn;

        li = document.createElement('li');
        title = document.createElement('span');
        deleteBtn = document.createElement('span'); 
        editField = document.createElement('input');
        editField.style.display = 'none';      
        editField.classList.add('editField');

        deleteBtn.classList.add('deleteBtn');
        deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
        deleteBtn.addEventListener('click', function () {
            self.removeFruits(i);
        });

        title.innerHTML = text;
        editField.value = text;    
        li.appendChild(title);
        li.appendChild(editField);
        li.appendChild(deleteBtn);

        title.addEventListener('dblclick', function () {            
            editField.style.display = 'inline-block';
            editField.focus();
            this.style.display = 'none';
        });

        editField.addEventListener('blur', function (e) {
            self.edit(this.value, i);
            this.style.display = 'none';
            title.style.display = 'block';
        });

        editField.addEventListener('keypress', function (e) {
           if (e.keyCode === 13) {
            self.edit(this.value, i);
            this.style.display = 'none';
            title.style.display = 'block';
           };
        })

        return li;
    }


    Constructor.prototype.getItems = function () {
        var self = this;

        AJAX.GET('fruites', function (data) {
            self.items = data;
            self.renderAll();
        });
    };

    Constructor.prototype.addEvents = function () {
        var self = this;
        this.addBtn.addEventListener('click', function () {
            self.addFruits();
        });
        this.productField.addEventListener('keypress', function (e) {
            if(e.keyCode === 13) {
                self.addFruits();
            }
        })
    }

    Constructor.prototype.addFruits = function () {
        var newItem = {
                'fruite': this.productField.value
            },
            self = this;

        AJAX.POST('fruites', function (data) {
            self.items = data;
            self.renderAll();
        }, newItem);
    };

    Constructor.prototype.removeFruits = function(id) {
        var self = this;

        AJAX.DELETE('fruites/' + id, function (data) {
            self.items = data;
            self.renderAll();
        });
    };

    Constructor.prototype.edit = function(editText, id) {
        var editItem = {
                'fruite' : editText
            },
            self = this;
        
        AJAX.PUT('fruites/' + id, function (data) {
            self.items = data;
            self.renderAll();
        }, editItem);
        
    };

   

    return Constructor;
})();