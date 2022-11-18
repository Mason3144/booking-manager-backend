import "dotenv/config";
import "./db";
import app from "./server";

const port = 5000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
