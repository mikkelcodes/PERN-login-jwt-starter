const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// register route
router.post("/register", validInfo, async (req, res) => {
  try {
    // destructure req.body
    const { email, password } = req.body;

    // check if user exist
    const login = await pool.query("SELECT * FROM Login WHERE email = $1", [
      email,
    ]);

    if (login.rows.length !== 0) {
      return res.status(401).send("User already exist.");
    }

    // bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // enter new user inside database
    const newLogin = await pool.query(
      "INSERT INTO Login (email, password) VALUES ($1, $2) RETURNING *",
      [email, bcryptPassword]
    );

    // generate jwt token
    const token = jwtGenerator(newLogin.rows[0].login_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// login route
router.post("/login", validInfo, async (req, res) => {
  try {
    // destructure the req.body
    const { email, password } = req.body;

    // check if user doesn't exist
    const login = await pool.query("SELECT * FROM Login WHERE email = $1", [
      email,
    ]);

    if (login.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect.");
    }

    // check if incoming password is the same as the database password
    const validPassword = await bcrypt.compare(
      password,
      login.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect.");
    }

    // give jwt token
    const token = jwtGenerator(login.rows[0].login_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
