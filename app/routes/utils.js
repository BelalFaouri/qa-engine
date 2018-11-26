exports.isLoggedIn = function (req, res) {
  if (req.session.user) {
    return true
  }
  return false
}

exports.checkUser = function (req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.send('<script>window.location.href="/login"</script>')
  } else {
    next()
  }
}

exports.logout = function (req, res) {
  req.session.destroy()
  res.status(200).send('<script>window.location.href="/"</script>')
}
