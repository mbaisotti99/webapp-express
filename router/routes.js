const { index, show, addReview, storeMovie } = require("../controllers/functions")
const express = require("express")
const { upload } = require("../middleware/upload")
const router = express.Router()

router.get("/", index)

router.get("/:id", show)

router.post("/:id/review", addReview)

router.post("/add", upload.single("file"), storeMovie)

module.exports = router