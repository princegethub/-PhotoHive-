import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const {username , email, password} = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      message: "Something is missing. Plese Check!",
      success: false
    })
  }

  const hashedPassword = bcrypt.hash(password, 10)

  await User.create({
    username,
    email,
    password: hashedPassword
  })

  return  res.status(200).json({
    message: "Account Created Successfully...",
    success: true
  })

};
