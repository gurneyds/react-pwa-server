'use strict';

const express = require('express');
const app = require('./express/server.js')

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Local app listening on port ${port}!`));