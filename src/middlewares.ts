export const protectorMiddleware = (req, res, next) => {
    console.log(req.session.token)
    if (req.session.token) {
        
      return next();
    } else {
      return res.send("/login");
    }
  };