function admin(req, res, next) {
  //   console.log(req.session.user.role);
  console.log("admin mey hon");
  console.log(req.session.user.role);

  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
}
module.exports = admin;
