const { index, show } = require("../controllers/functions")
const express = require("express")
const router = express.Router()

router.get("/", index)

router.get("/:id", show)

module.exports = router