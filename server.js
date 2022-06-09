const app = require("./app");
const { connectMongo } = require("./db/connection");
require("dotenv").config();

const PORT = 3000;
const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

start();
