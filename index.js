const express = require('express');
const db = require('./data/hubs-model.js')
const server = express();

server.listen(4000, () => {
    console.log('Listening on port 4000...');
});
server.use(express.json())

// HTTP Method
//URI : Scheme://host_name:port/path?parameter_list
// https://www/google.com/some/document?with_params=value

server.get('/', (req, res) => {
    res.send('hello world!');
});
server.get('/hey', (req, res) => {
    res.send('hi there');
});
server.get('/favicon.ico', (req, res) => {
    res.status(204);
});

// R - Read (CRUD)
server.get('/hubs', (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json({ hubs });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

//C - Create (CRUD)
server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    console.log(hubInfo);
    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({ success: true, hub })
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        });
});

//D -Delete (CRUD) Ex:/hubs/5
server.delete('/hubs/:id', (req, res) => {
    //const id = re.params.id; or
    const { id } = req.params;
    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json(
                    { success: false, message: 'id not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});
//U - Update (CRUD)
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated });
            } else {
                res.status(404).json(
                    { success: false, message: 'id not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});
server.patch('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated });
            } else {
                res.status(404).json(
                    { success: false, message: 'id not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});