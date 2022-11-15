const mongoose = require("mongoose");
const config = require("./config.json")


let connected;
let db;

const LvlSchema = new mongoose.Schema({
  userId: Number,
  xp: Number,
});

const uptimeSchema = new mongoose.Schema({
  time: Number
});

//START modules
const lvl_module = mongoose.model("lvl", LvlSchema); // what template (schema) do i use? This one!

const uptimeModule = mongoose.model("uptime", uptimeSchema);
//END modules

/**
 *  @example await connectToDB
 * @returns {Boolean} true if connected sccessfully, false if not.
 **/
const connectToDB = async () => {
  await mongoose.connect(config.MONGO_CONFIG);
  connected = true;
  console.log("MongoDB is loaded!");
  db = await mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:")); //tells us if there is an error
  console.log("Complete!"); 
};

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @param {Number} UserLevel The new level for the user.
 *  @example await saveXP("userID", "XP")
 * @returns {Bool} true if saved sccessfully, false if not.
 **/
const saveXP = async (userId, xp) => {
   
  if(!connected || !db) {
    await connectToDB() 
  }
  
  const lvlnew = lvl_module({ userId, xp}) //create a new "lvlNew" object (data)
  //const lvlToBeRemoved = lvl_module({ userId })
  
  //delete old entry, it will delete everything on that user but its fine as we already have the data to be added in cache (see values "userID" & "xp");
//  await lvlToBeRemoved.findOneAndRemove(err => {
  //  if (err) {
  //    console.error(err)
  //    return false;       Ill work on it on stage 2
  //  } else {
  //    return true;
  //  }
  //});
  await lvlnew.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  
  console.log("Data added to DB!")
  return true
};
//END (saveXP)

//START (getXP)

/**
 *  @param {Number} UserID ID of the user who`s level you need to save.
 *  @example const userXP = await getXP(UserID)
 *  @returns {Number} Value of the users XP.
 **/
 const getXP = async (userId) => {
   
  if(!connected || !db) {
    await connectToDB() 
  }
  
  const userXP = await lvl_module.findOne({ userId });
  
  console.log("Data recived from DB!")
  console.log(userXP)
  return userXP
};

//END (getXP)

//START (saveUptime)

/**
 *  @param {Number} startTime Start time of the bot
 *  @example await startTime("time")
 * @returns {Bool} true if saved sccessfully, false if not.
 **/
 const startTime = async (startTime) => {
   
  if(!connected || !db) {
    await connectToDB() 
  }
  
  const UPMN = uptimeModule({time: startTime}) //create a new "lvlNew" object (data)
   //UPMN is UpTime Module New
  await UPMN.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  
  console.log("Start time logged and written! Bot started at " + startTime)
  return true
};
//END (saveUptime)

//Start (bannedWords)

const bannedWordsSchema = new mongoose.Schema({
  word: String
});

const bannedWordsModule = mongoose.model("bannedWords", bannedWordsSchema);

/**
 * 
 * @param {string} word
 * @returns boolean  
 */
 const addBW = async (Bword) => {
  if(!connected || !db) {
    await mongodbjs.connectToDB() 
  }
  const newBW = await bannedWordsModule({"word": Bword})
  await newBW.save(err => {
    if (err) {
      console.error(err)
      return false;
    }
  })
  console.log("run")
};

/**
 * 
 * @param {string} word 
 * @returns boolean
 * @example const BWCheck = checkBW("YOUR_WORD") if (returns false)
 */

const checkBW =  async (word) => {
  if(!connected || !db) {
    await mongodbjs.connectToDB() 
  } //conect

  const checkWord = await bannedWordsModule.findById(word)
  if (checkWord = null)
    return false
  else
    return true

};
//END (bannedWords)

const getJsonValue = async (input, valueNeeded) => {
  var string = await JSON.stringify(input);
  var objectValue = await JSON.parse(string);
  console.log(`${objectValue}is ObjectValue`);
  return objectValue[valueNeeded];
};

//warns (AW = Add Warns)
const AWSchema = new mongoose.Schema({
  guildID: Number,
  UserID: Number,
  Warns: Number
});

const AWModel = new mongoose.model("warns", AWSchema);


/**
 * 
 * @param {number} GuildID
 * @param {number} ClientID 
 * @returns boolean
 * @example await addWarn(GuildID, ClientID)
 */
const addWarn = async (GuildID, ClientID) => {
  if(!connected || !db) {
    await mongodbjs.connectToDB() 
  }; //connect
  const oldWarnCountJSON = await AWModel.findOne(GuildID, ClientID);

    //PARSE THE JSON!
    var string = JSON.stringify(oldWarnCountJSON);
    var objectValue = JSON.parse(string);
    const oldWarnCount =  objectValue["Warns"];

  if (oldWarnCount == null) {
    const firstWarnForUser = await bannedWordsModule({"guildID": GuildID, "UserID": ClientID, "Warns": newWarnCount});
  await firstWarnForUser.save(err => {
    if (err) {
      console.error(err)
      console.log("error! Aborted operation");
    };
  })} else {
  await AWModel.findOneAndRemove(GuildID, ClientID);
  const newWarnCount = oldWarnCount + 1;
  const newWC = await bannedWordsModule({"guildID": GuildID, "UserID": ClientID, "Warns": newWarnCount});
  await newWC.save(err => {
    if (err) {
      console.error(err)
      console.log("error!");
    };
    return newWarnCount;
    })
  }
};

const getWarnCount = async (GuildID, ClientID) => {
  if(!connected || !db) {
    await mongodbjs.connectToDB() 
  }; //connect
  const warnCountX = await AWModel.findOne(GuildID, ClientID);
  return warnCountX
}


module.exports = {
  saveXP,
  getXP,
  startTime,
  checkBW,
  connectToDB,
  getJsonValue,
  addWarn,
  getWarnCount
};
console.log("mongoDB.js run!")
