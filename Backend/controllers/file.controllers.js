const mongoose = require("mongoose");
const DocSchema = require("../models/file.model");
const SizeSchema = require("../models/size.model");
const multer = require("multer");
const { connection } = require("../config/connectDB.js");

require("dotenv").config();
const DB_URI = process.env.DB_URI;

let gfs;
connection.once("open", () => {
  // init stream
  console.log("*** OFFRE CONTROLLER ***");
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "offre_uploads",
  });
});

/**
 * POST FILE
 * @param NONE
 * @return information message
 */

exports.upload = async (req, res) => {
  const volume = await SizeSchema.find({});
  const docsize = Number(req.files[0].size);
  const extension = req.files[0].filename.split(".")[1];
  const image = ["jpg", "png", "gif"];
  const vedio = ["mp4", "avi", "mov"];
  const doc = ["txt", "pdf", "doc"];
  try {
    // if the file type is "image" /check remaining space / Create file
    if (image.includes(extension.toLowerCase())) {
      if (volume[0].image.currSize + docsize < volume[0].image.maxSize) {
        const doc = new DocSchema({
          _id: new mongoose.Types.ObjectId(),
          filename: req.files[0].filename,
          size: req.files[0].size,
        });
        await doc.save();

        volume[0].image.currSize += docsize;
        const response = await volume[0].save();

        res.status(200).json({
          response: "uploaded successfully",
        });
      } else {
        gfs.delete(
          new mongoose.Types.ObjectId(req.files[0].id),
          (err, result) => {
            if (err) {
              console.error("error removing that file:---", err);
            } else {
              console.log("removed file: ");
            }
          }
        );

        return res.status(400).json({
          response: "there's not enought space available",
        });
      }
    }

    // if the file type is "video" /check remaining space / Create file
    if (vedio.includes(extension.toLowerCase())) {
      if (volume[0].video.currSize + docsize < volume[0].video.maxSize) {
        const doc = new DocSchema({
          _id: new mongoose.Types.ObjectId(),
          filename: req.files[0].filename,
          size: req.files[0].size,
        });
        await doc.save();

        volume[0].video.currSize += docsize;
        const response = await volume[0].save();

        res.status(200).json({
          response: "uploaded successfully",
        });
      } else {
        gfs.delete(
          new mongoose.Types.ObjectId(req.files[0].id),
          (err, result) => {
            if (err) {
              console.error("error removing that file:---", err);
            } else {
              console.log("removed file: ");
            }
          }
        );
        return res.status(400).json({
          response: "there's not enought space available",
        });
      }
    }

    // if the file type is "document" /check remaining space / Create file
    if (doc.includes(extension.toLowerCase())) {
      if (volume[0].document.currSize + docsize < volume[0].document.maxSize) {
        const doc = new DocSchema({
          _id: new mongoose.Types.ObjectId(),
          filename: req.files[0].filename,
          size: req.files[0].size,
        });
        await doc.save();

        volume[0].document.currSize += docsize;
        const response = await volume[0].save();

        res.status(200).json({
          response: "uploaded successfully",
        });
      } else {
        gfs.delete(
          new mongoose.Types.ObjectId(req.files[0].id),
          (err, result) => {
            if (err) {
              console.error("error removing that file:---", err);
            } else {
              console.log("removed file: ");
            }
          }
        );
        return res.status(400).json({
          response: "there's not enought space available",
        });
      }
    }
  } catch (err) {
    res.status(400).json(`Error file: ${err}`);
  }
};

/**
 * GET size
 * @param NONE
 * @return  size doc
 */
exports.getSize = async (req, res) => {
  try {
    const doc = await SizeSchema.find({});
    res.status(200).json({
      response: doc,
    });
  } catch (e) {
    return res.status(400).json({
      response: "Get all error",
    });
  }
};

/**
 * GET  allFILE
 * @param NONE
 * @return all file
 */

exports.getAll = async (req, res) => {
  try {
    const doc = await DocSchema.find({});
    res.status(200).json({
      response: doc,
    });
  } catch (e) {
    return res.status(400).json({
      response: "Get all error",
    });
  }
};

/**
 * GET last 5 files
 * @param NONE
 * @return 5 file
 */
exports.getrecents = async (req, res) => {
  try {
    const doc = await DocSchema.find({}).sort({ _id: -1 }).limit(5);
    res.status(200).json({
      response: doc,
    });
  } catch (e) {
    return res.status(400).json({
      response: "Get all error",
    });
  }
};

/**
 * GET Sort data by date or by size
 * @param type
 * @return sorted data
 */
exports.sortBydate = async (req, res) => {
  if (req.query?.type == "date") {
    try {
      const doc = await DocSchema.find({}).sort({ createdAt: 1 });
      res.status(200).json({
        response: doc,
      });
    } catch (e) {
      return res.status(400).json({
        response: "sort by date  error",
      });
    }
  } else if (req.query?.type == "size") {
    try {
      const doc = await DocSchema.find({}).sort({ size: -1 });
      res.status(200).json({
        response: doc,
      });
    } catch (e) {
      return res.status(400).json({
        response: "sort by size  error",
      });
    }
  }
};

/**
 * GET archived file
 * @param NONE
 * @return archived file
 */
exports.getArchivedfile = async (req, res) => {
  try {
    const doc = await DocSchema.find({ archived: true });
    res.status(200).json({
      response: doc,
    });
  } catch (e) {
    return res.status(400).json({
      response: "Get archived file error",
    });
  }
};

/**
 * GET starred file
 * @param NONE
 * @return starred file
 */

exports.getStarredfile = async (req, res) => {
  try {
    const doc = await DocSchema.find({ starred: true });
    res.status(200).json({
      response: doc,
    });
  } catch (e) {
    return res.status(400).json({
      response: "Get starred file error",
    });
  }
};

/**
 * DELETE ONE file
 * @param NONE
 * @return file
 */

exports.deleteOne = async (req, res) => {
  const image = ["jpg", "png", "gif"];
  const vedio = ["mp4", "avi", "mov"];
  const docpref = ["txt", "pdf", "doc"];
  const id = req.params.id;
  try {
    const doc = await DocSchema.findById(id);
    const volume = await SizeSchema.find({});
    const extension = doc.filename.split(".")[1];

    if (image.includes(extension.toLowerCase())) {
      volume[0].image.currSize -= doc.size;
      await volume[0].save();
    } else if (docpref.includes(extension.toLowerCase())) {
      console.log("iam here");
      volume[0].document.currSize -= doc.size;
      await volume[0].save();
    } else if (vedio.includes(extension.toLowerCase())) {
      volume[0].video.currSize -= doc.size;
      await volume[0].save();
    }

    await doc.deleteOne();

    return !doc
      ? res.send(404)
      : res.json({
          response: doc,
        });
  } catch (e) {
    return res.status(400).json({
      response: "deletone error",
    });
  }
};

/**
 * PUT archive file
 * @param NONE
 * @return archived file
 */

exports.archived = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await DocSchema.findById(id);
    doc.archived = true;
    await doc.save();
    return !doc
      ? res.send(404)
      : res.json({
          response: doc,
        });
  } catch (e) {
    return res.status(400).json({
      response: "archived error",
    });
  }
};

/**
 * PUT unarchive file
 * @param NONE
 * @return unarchived file
 */

exports.unarchived = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await DocSchema.findById(id);
    doc.archived = false;
    await doc.save();
    return !doc
      ? res.send(404)
      : res.json({
          response: doc,
        });
  } catch (e) {
    return res.status(400).json({
      response: "unarchived error",
    });
  }
};

/**
 * PUT star  file
 * @param NONE
 * @return starred file
 */
exports.starred = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await DocSchema.findById(id);
    doc.starred = true;
    await doc.save();
    return !doc
      ? res.send(404)
      : res.json({
          response: doc,
        });
  } catch (e) {
    return res.status(400).json({
      response: "starred error",
    });
  }
};
/**
 * PUT unstar file
 * @param NONE
 * @return unstarred file
 */
exports.unstarred = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await DocSchema.findById(id);
    doc.starred = false;
    await doc.save();
    return !doc
      ? res.send(404)
      : res.json({
          response: doc,
        });
  } catch (e) {
    return res.status(400).json({
      response: "unstarred error",
    });
  }
};
