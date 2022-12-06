const router = require("express").Router();
const multer = require("multer");
require("dotenv").config();
const { GridFsStorage } = require("multer-gridfs-storage");
const controller = require("../controllers/file.controllers");

const storage = new GridFsStorage({
  url: process.env.DB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;

      const fileInfo = {
        filename: filename,
        bucketName: "offre_uploads",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage: storage });

//@GET method
// @desc get all files
//@path : http://localhost:1919/api/file/
//Params none
router.get("/getallfiles", controller.getAll);

//@DELETE method
// @desc delete one file
//@path : http://localhost:1919/api/file/
//Params id
router.delete("/deletefile/:id", controller.deleteOne);

//@PUT method
// @desc starred a file
//@path : http://localhost:1919/api/file/
//Params id
router.put("/starred/:id", controller.starred);

//@PUT method
// @desc archived a file
//@path : http://localhost:1919/api/file/
//Params id
router.put("/archived/:id", controller.archived);

//@PUT method
// @desc unstarred a file
//@path : http://localhost:1919/api/file/
//Params id
router.put("/unstarred/:id", controller.unstarred);

//@PUT method
// @desc unarchived a file
//@path : http://localhost:1919/api/file/
//Params id
router.put("/unarchived/:id", controller.unarchived);

//@GET method
// @desc get all archived files
//@path : http://localhost:1919/api/file/
//Params none
router.get("/getArchivedfile/", controller.getArchivedfile);

//@GET method
// @desc get all starred files
//@path : http://localhost:1919/api/file/
//Params none
router.get("/getStarredfile/", controller.getStarredfile);

//@GET method
// @desc get last 5  files
//@path : http://localhost:1919/api/file/
//Params none
router.get("/getrecents/", controller.getrecents);

//@GET method
// @desc get size doc
//@path : http://localhost:1919/api/file/
//Params none
router.get("/size/", controller.getSize);

//@post method
// @desc upload
//@path : http://localhost:1919/api/file/
//Params body
router.post("/upload", upload.array("document", 1), controller.upload);

//@GET method
// @desc get sorted files
//@path : http://localhost:1919/api/file/
//Params none
router.get("/sort/", controller.sortBydate);

module.exports = router;
