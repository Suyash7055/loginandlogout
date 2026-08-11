import useModel from '../Models/userModel.mjs';
import { validateEmail, validatePassword, validatePhone, validateUsername } from '../utils/validation.mjs';
const registerUser = async (req, res) => {
  try {
    const { name, email, password, username, dob, gender, phone, address } = req.body;
    //validate user input
    if (!validateEmail(email)) {
      return res.status(400).send({ message: "failed", error: "Invalid email format" });
    }
    if (!validatePassword(password)) {
      return res.status(400).send({ message: "failed", error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    }
    if (!validatePhone(phone)) {
      return res.status(400).send({ message: "failed", error: "Invalid phone number format" });
    }

    if (!validateName(name)) {
      return res.status(400).send({ message: "failed", error: "Invalid name format" });
    }
  }
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