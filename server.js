//Install express server    
const express = require('express');

const app = express();

app.use(express.static('./dist/spoti-app'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/spoti-app/' });
});

app.listen(process.env.PORT || 8080);