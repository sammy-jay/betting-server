import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test123';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    const result = {email: oldUser.email, _id:oldUser._id}
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password,confirm_password } = req.body;
  if (password !== confirm_password) return res.status(400).json({ message: "Passwords do not match" });

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const resultSaved = await UserModal.create({ email, password: hashedPassword});

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    const result = {email: resultSaved.email, _id:resultSaved._id}
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
