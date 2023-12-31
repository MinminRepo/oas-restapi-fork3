var express = require('express');
var router = express.Router();

const mw = require ('../typescript/build/middleware/main');

const genericReturn = {
  status: 200,
  message: "Request OK",
  data: {},
};

const db = require ('../typescript/build/modules/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/** Register new user */
router.put ("/account/new", async (req, res, next) => {
  res.status(200).json(genericReturn).end();
});

/** login to account */
router.post ("/account/login", [mw.attachAccessControlHeaders], async (req, res, next) => {
  
  const { accountLogin } = require ('../typescript/build/routes/account.login');
  accountLogin (req, res);

});

/** logout to account */
router.post ("/account/logout", async (req, res, next) => {
  res.status(200).json(genericReturn).end();
});

/** get existing user details via id */
router.get ("/info/get/:id", async (req, res, next) => {
  
  const userId = req.params.id;
  const result = await db.retrieve (userId);
  
  if (result.length === 0) {
    res.status (404).json({
      status: 404,
      message: "No match found.",
      data: {}
    })
  } else {
    res.status (200).json ({
      status: 200,
      message: "Request OK",
      data: result[0]
    })
  }

  res.end ();

});

/** update existing data */
router.post ("/info/update", async (req, res, next) => {
  res.status(200).json(genericReturn).end();
});

/** finalize existing data */
router.post ("/info/finalize", async (req, res, next) => {
  res.status(200).json(genericReturn).end();
});

/** revoke data, equal to rescinding a user's application */
router.delete ("/info/revoke", async (req, res, next) => {
  res.status(200).json(genericReturn).end();
});

/** upload documents */
router.put ("/info/upload", async (req, res, end) => {
  res.status(200).json(genericReturn).end();
});

module.exports = router;
