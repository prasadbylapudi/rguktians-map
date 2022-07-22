const path = require("path");
const multer = require("multer");
let photoid;
const userRoutes = (app, fs) => {

    // variables
    const dataPath = '../frontend/src/data/studentData.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
            const newUserId = req.body.id;
            photoid=req.body.id;
            
            const storage = multer.diskStorage({
                destination: "../frontend/src/data/uploads/",
                filename: function(req, file, cb){
                   cb(null, photoid+ path.extname(file.originalname));
                }
             });
             const upload = multer({
                 storage: storage,
                 limits:{fileSize: 3000000},
              }).single("photo");
             
              app.post('/upload', function (req, res) {
                 upload(req, res, function (err) {
                     if (err) {
                       res.send('Please select an image that is less than 3 MB!');
                     }
                   });
                 });

            req.body.profile=req.body.id;   
            // add the new user
            data[newUserId] = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });

    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });

    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });

    // app.get('/users/:id', (req, res) => {
    //     fs.readFile(dataPath, 'utf8', (err, data) => {
    //         if (err) {
    //             throw err;
    //         }

    //         res.send(JSON.parse(data));
    //     });
    // });

// const storage = multer.diskStorage({
//    destination: "uploads/",
//    filename: function(req, file, cb){
//       cb(null, photoid+ path.extname(file.originalname));
//    }
// });
// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 3000000},
//  }).single("photo");

//  app.post('/upload', function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//           res.send('Please select an image that is less than 2 MB!');
//         } else {
//           res.send('Success, Image uploaded!');
//         }
//       });
//     });
};

module.exports = userRoutes;