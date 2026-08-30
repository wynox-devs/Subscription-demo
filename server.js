const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Basic server for serving static files
// IP collection has been removed - users select region manually

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
