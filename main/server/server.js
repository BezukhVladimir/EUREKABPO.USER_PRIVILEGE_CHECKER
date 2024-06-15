const express = require('express');
const path = require('path');
const userPrivilegeChecker = require('../../build/Release/user_privilege_checker.node');

const app = express();
const userPrivileges = {
    0: 'Гость',
    1: 'Пользователь',
    2: 'Администратор',
};

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/check', (req, res) => {
    const username = req.body.username;
    const userPrivilege = userPrivilegeChecker.check(username);

    if (userPrivilege === -1) {
        return res.status(404).send(`
            <p>Пользователя ${username} нет</p>
            <button onclick="window.history.back()">Назад</button>
        `);
    }

    res.status(200).send(`
        <p>Пользователь ${username} имеет привилегию ${userPrivileges[userPrivilege]}</p>
        <button onclick="window.history.back()">Назад</button>
    `);
});

module.exports = app;
