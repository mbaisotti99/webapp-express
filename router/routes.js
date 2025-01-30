const { index, show, addReview, storeMovie, search } = require("../controllers/functions")
const express = require("express")
const { upload } = require("../middleware/upload")
const router = express.Router()

// router.get("?search", search)

router.get("/", index)

router.get("/:id", show)


router.post("/:id/review", addReview)

router.post("/add", upload.single("images"), storeMovie)

module.exports = router