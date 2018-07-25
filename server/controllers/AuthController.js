import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../db/users.json';

dotenv.config();

class AuthController {
  static async register(req, res) {
    const entries = users;
    const { userName, email } = req.body;
    const newUser = {
      userName,
      email,
    };
    entries.push(newUser);
    res.json({
      newUser,
    });

    const token = await jwt.sign(
      newUser,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
    );

    res.json({
      newUser,
      token,
    });
  }

  static async login(req, res) {
    const { userName, email, password } = users[0];

    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    const user = {
      userName,
      email,
    };

    if (loginEmail === email && password === loginPassword) {
      const token = await jwt.sign(
        user,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY },
      );
      res.json({
        user,
        token,
      });
    } else {
      res.json({
        error: 'Either password or email is incorrect',
      });
    }
  }
}

export default AuthController;
