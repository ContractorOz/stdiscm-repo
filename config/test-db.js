const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const sampleUsers = require("../sample_data/users");
const sampleArticles = require("../sample_data/articles");

const mongod = MongoMemoryServer.create();

async function connect() {
  const uri = (await mongod).getUri();
  await mongoose.connect(uri);
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
}
async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}

async function populateDatabase() {
  const collections = mongoose.connection.collections;
  const data = { users: sampleUsers, articles: sampleArticles };
  for (const key in collections) {
    const collection = collections[key];
    await collection.insertMany(data[key]);
  }
}

async function getArticle() {
  const article = await mongoose.connection.collections["articles"].findOne();
  return article;
}

async function getUser(email) {
  const user = await mongoose.connection.collections["users"].findOne({
    email: email,
  });
  return user;
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
  populateDatabase,
  getArticle,
  getUser,
};
