const protect = (req, res, next) => {
  const { user } = req.session;
  console.log("user", user);
  if (!user) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }
  req.user = user;
  console.log("req.user", req.user);
  //I would like to do instead of having our route get the user off of req.session.user, I would like to just attach it to the request object
  next();
  //if call next() then it will going to send it to the controller or the next middleware in the stack
};
export default protect;
