import models from '../models';
import hashPassword from '../helpers/hashPassword';
import generateToken from '../helpers/generateToken';
import comparePassword from '../helpers/comparePassword';

class AuthController {
  static async signup(req, res) {
    try {
      req.checkBody('username', 'Invalid username').isAlpha();
      req.checkBody('email', 'Invalid email address').isEmail();
      req.checkBody('password', 'Paswword must be at least 8 characters').isLength({ min: 8 });

      const reqErr = req.validationErrors();

      if (reqErr) {
        res.status(400).json({
          errors: reqErr,
        });
      } else {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        await models.query(`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`);

        const { rows } = await models.query(`SELECT id FROM users WHERE email = '${email}'`);

        const user = {
          id: rows[0].id,
          username,
          email,
        };

        res.json({
          user,
          token: await generateToken(user),
        });
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { rows } = await models.query(`SELECT * FROM users WHERE email = '${email}'`);

      if (rows.length > 0) {
        const {
          id,
          username,
        } = rows[0];

        const hashedPassword = rows[0].password;
        const passwordMatches = comparePassword(password, hashedPassword);

        if (passwordMatches === true) {
          const user = {
            id,
            username,
            email,
          };

          res.json({
            user,
            token: await generateToken(user),
          });
        } else {
          res.json({
            error: 'Password is incorrect',
          });
        }
      } else {
        res.json({
          error: 'Email does not exist',
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

export default AuthController;
