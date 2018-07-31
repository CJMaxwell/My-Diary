import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  // console.log(token, "=======>");
  req.user = undefined;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        res.status(400).json({
          message: 'Invalid authentication token',
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'You are not logged in',
    });
  }
};

export default verifyToken;
