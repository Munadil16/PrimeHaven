import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Token Verification Error: ", err);
        res.json({ isLoggedIn: false });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    console.log("Token Not Found");
    res.json({ isLoggedIn: false });
  }
};

export { authenticate };
