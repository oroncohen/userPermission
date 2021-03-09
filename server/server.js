const fs = require('fs');
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const bodyParser = require('body-parser');


const JSONFile = {
    users: './users.json',
    pages: './pages.json'
}


app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log('Server is running with port:  ' + port);


const readFile = (
    callback,
    returnJson = false,
    filePath,
    encoding = 'utf8'
) => {
    fs.readFile(JSONFile[filePath], encoding, (err, data) => {
        if (err) {
            throw err;
        }
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (
    fileData,
    callback,
    filePath,
    encoding = 'utf8'
) => {
    // console.log(fileData);
    fs.writeFile(JSONFile[filePath], fileData, encoding, err => {
        if (err) {
            throw err;
        }
        callback();
    });
};

app.get('/users', (req, res) => {
    readFile(data => {
        res.send(data);
    }, true, 'users');
});
app.get('/users/:user', (req, res) => {
    readFile(data => {
        let _user = data.filter(u => u.name === req.params.user);
        res.send(_user);
    }, true, 'users');
});
app.get('/pages', (req, res) => {
    readFile(data => {
        res.send(data);
    }, true, 'pages');
});

app.post('/updatePermission', (req, res) => {
    readFile(data => {
        const currentList = data;
        for (let i = 0; i < currentList.length; i++) {
            if (currentList[i].name === req.body.user) {
                currentList[i].enablePages = req.body.pages;
                break;
            }
        }
        writeFile(JSON.stringify(currentList, null, 2), () => {
            res.status(200).send('new user added');
        }, 'users');
    }, true, 'users');
});


