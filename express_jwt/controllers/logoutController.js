const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    return res.sendStatus(204);
  }
  // Delete refreshToken in db
  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ msg: "logged out" });
};

module.exports = { handleLogout };
