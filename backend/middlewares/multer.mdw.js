/* --- Multi Config middleware File --- */
/* --- File is dedicated to manage files' upload --- */

//Call the multer module
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //Controll if the image name contain a space an replace it by an underscore
        const name = file.originalname.replace(' ', '_');
        const extension = MIME_TYPES[file.mimetype];
        //The name of the image will be stocked with its original name with the javascript date then with the hollowed extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');