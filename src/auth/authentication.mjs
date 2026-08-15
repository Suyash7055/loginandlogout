import jwt from 'jsonwebtoken';
import config from '../../config.mjs';
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: "failed", error: "login required" });
  }
  jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({ message: "failed", error: "Authentication failed." });
    }
    req.user = decodedToken;
    next();
  });
}
export { authenticateToken };