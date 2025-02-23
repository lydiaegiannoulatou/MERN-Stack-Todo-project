const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

main()
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

module.exports = main;
