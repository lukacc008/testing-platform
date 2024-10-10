const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd, email } = req.body;
  if (!user || !pwd || !email)
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });

  // Check for duplicate usernames or emails in the db
  const duplicateUser = await User.findOne({ username: user }).exec();
  const duplicateEmail = await User.findOne({ email: email }).exec();
  if (duplicateUser || duplicateEmail) return res.sendStatus(409); // Conflict

  try {
    // Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create and store the new user
    const result = await User.create({
      username: user,
      email: email,
      password: hashedPwd,
    });

    console.log(result);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
