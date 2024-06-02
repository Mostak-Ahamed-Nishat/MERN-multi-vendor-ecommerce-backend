import jwt from "jsonwebtoken";

export default function createActivationJwtToken(user) {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
}
