import User from "../../db/models/user.model.js";


export const getUserInfo = async (req, res) => {
  const { telegram_id } = req.body;
  const user = await User.findOne({ telegram_id });
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "User not found" });
};