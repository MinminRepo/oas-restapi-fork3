var express = require('express');
var router = express.Router();

const genericReturn = {
  status: 500,
  message: "Request OK",
  data: {},
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** Register new user */
router.put ("/account/new", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** login to account */
router.post ("/account/login", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** logout to account */
router.post ("/account/logout", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** get existing user details via id */
router.get ("/info/get/:id", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** update existing data */
router.post ("/info/update", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** revoke data, equal to rescinding a user's application */
router.delete ("/info/revoke", async (req, res, next) => {
  res.status(500).json(genericReturn).end();
});

/** upload documents */
router.put ("/info/upload", async (req, res, end) => {
  res.status(500).json(genericReturn).end();
});

module.exports = router;
