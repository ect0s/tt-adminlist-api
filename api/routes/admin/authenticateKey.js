export default function (req, res, next) {
  // Should maybe store multiple keys in a DB?
  let apiKey = req.header("x-api-key");

  if (apiKey === process.env.apiKey) {
    next();
  } else {
    res.sendStatus(403);
  }
}
