import mongoose from "mongoose";
import MongoClient from "mongodb";

async function connectDatabase() {
  const connectionString = process.env.MONGODB_URL;

  if (!connectionString) {
    throw new Error(
      "MONGODB_URL not set as environment variable. Please configure it in an .env file."
    );
  }

  const client = new MongoClient.MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client
      .db("awp-mandatory-assignment")
      .collection("guotes");
    collection.drop();
    let db = await collection.countDocuments({});
    if (db == 0) {
      let testData = [
        {
          guote: "WOW! *Claps so loud your eardrums burst*",
          author: "XQC - Streamer",
          likes: 33,
          comments: ["widepeepohappy", "kappa"],
        },
        {
          guote: "THE FUCK DID YOU SAY TO ME YOU LITTLE SHIT",
          author: "Ninja - Streamer",
          likes: 4325,
          comments: ["Lmao what a sore loser"],
        },
        {
          guote:
            "The right man in the wrong place can make all the difference in the world",
          author: "Gman - Half Life 2",
          likes: 842,
          comments: [],
        },
        {
          guote:
            "I don't need to 'get a life'. I'm a gamer. I have lots of lives.",
          author: "Someone really lame",
          likes: 1,
          comments: ["Wow, did Reddit arrive to this site?"],
        },
        {
          guote: "Games good",
          author: "me",
          likes: 200000,
          comments: ["big true", "so true", "poggers"],
        },
      ];
      collection.insertMany(testData);
      console.log("inserted data");
    }

    return mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch {
    console.log("failled to Connected to database");
  }
}

export default connectDatabase;
