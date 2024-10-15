import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
const generateToken = (user) => {
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.JWT_TOKEN,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

export default generateToken;
