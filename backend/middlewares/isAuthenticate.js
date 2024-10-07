import jwt from 'jsonwebtoken';

const isAuthenticate = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    let token = req.cookies.token;

    // If token is not present, return authentication error
    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false
      });
    }

    // Verify the token
    let decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: 'Invalid credentials',
        success: false
      });
    }


    req.id = decode.userId;
    next();
    
  } catch (error) {
    console.log("MiddleWares :: isAuthenticate :: error", error);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
};

export default isAuthenticate;
