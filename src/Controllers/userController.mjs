import userModel from '../Models/userModel.mjs';
import { emailValidator, passwordValidator, phoneValidator, usernameValidator } from '../utils/valid.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.mjs';
const registerUser = async (req, res) => {
  // passwordValidator
  try {
    const { name, email, password, username, dob, gender, phone, address } = req.body;
    //validate user input
    if (!emailValidator(email)) {
      return res.status(400).send({ message: "failed", error: "Invalid email format" });
    }
    if (!passwordValidator(password)) {
      return res.status(400).send({ message: "failed", error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!phoneValidator(phone)) {
      return res.status(400).send({ message: "failed", error: "phone number must be 10 digit long" });
    }

    if (!usernameValidator(username)) {
      return res.status(400).send({ message: "failed", error: "Username can only contain letters, numbers, and underscores" });
    }

    // check for duplicate  user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "failed", error: " email already exists" });
    }
    // create new user
    const newUser = await userModel.create({ name, email, password: hashedPassword, username, dob, gender, phone, address });
    return res.status(201).send({ message: "success", data: newUser });
  }
  // catch (error) {
  //   console.log("REGISTER ERROR:", error);

  //   return res.status(500).send({
  //     message: "failed",
  //     error: error.message
  //   });
  // }
  catch (error) {
    if (error.message.includes('validation')) {
      return res.status(400).send({ message: "failed", error: error.message });

    } else if (error.message.includes('duplicate')) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res.status(500).send({ message: "failed", error: "Internal server error" });
    }
  }
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "failed", error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "failed", error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).send({ message: "failed", error: "Token generation failed" });
    }
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).send({ message: "success", data: user, token });

  } catch (error) {
    return res.status(500).send({ message: "failed", error: "Internal server error" });
  }
}
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({ message: "failed", error: "User not found" });
    }
    return res.status(200).send({ message: "success", data: user });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: "Internal server error" });
  }
}
export { registerUser, getUser, login };





