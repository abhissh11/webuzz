import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // Ensure cookies exist before accessing them
  if (!req.cookies || !req.cookies.accessToken) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  const accessToken = req.cookies.accessToken;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Attach user details to request
    req.user = { userId: decoded.userId, role: decoded.role };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("Error in protect middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
