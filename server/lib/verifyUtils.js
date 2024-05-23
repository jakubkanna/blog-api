// Role verification middleware
function verifyRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
}

module.exports = { verifyRole };
