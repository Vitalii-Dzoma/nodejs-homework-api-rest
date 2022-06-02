const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(
    "mongodb+srv://voda24147:9379992@cluster0.e4uza.mongodb.net/db-contacts",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = {
  connectMongo,
};
