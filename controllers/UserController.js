const Middleware = require("../middleware/Auth");
const db = require("../models/Index");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const userData = await db.User.findOne({ where: { email: email } });

    // Check if the user exists
    if (!userData) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const storedHashedPassword = userData.password;

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        // Handle the error
        return res.status(401).json({ message: "Invalid password" });
      }

      if (isMatch) {
        const token = Middleware.generateToken(userData);
        // Passwords match
        return res.status(200).json({
          status: "success",
          code: 200,
          message: "message from backend",
          results: {
            token: token,
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              role: "admin",
              fullName: userData.name,
            },
          },
        });
      } else {
        return res
          .status(401)
          .json({ message: "Error, password do not match" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const checkAuth = async (req, res, next) => {
  try {
    req.user.password = undefined;
    console.log(req.user);
    return res.status(200).json({
      message: "true",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, role, name } = req.body;

    // simple validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    // check existing
    const existing = await db.User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const hashed = require("bcryptjs").hashSync(password, 10);

    const user = await db.User.create({
      username,
      email,
      password: hashed,
      role: role || "user",
      name: name || username,
    });

    const token = Middleware.generateToken(user);

    return res.status(201).json({
      status: "success",
      results: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    // stateless JWT - client should drop token. We still respond success.
    return res.status(200).json({ status: "success", message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  checkAuth,
  register,
  logout,
};
