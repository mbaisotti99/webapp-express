const { index, show, addReview } = require("../controllers/functions")
const express = require("express")
const router = express.Router()

router.get("/", index)

router.get("/:id", show)

router.post("/:id/review", addReview)

module.exports = router