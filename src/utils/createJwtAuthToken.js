//Create token and save to cookies

const createJwtAuthToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  //Remove confidential data from user
  const { password, ...userWithoutPassword } = user.toObject();

  res.status(statusCode).cookie("access_token", token, options).json({
    success: true,
    user: userWithoutPassword,
    token,
  });
};

export default createJwtAuthToken;
