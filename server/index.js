const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Massage = require("./models/message");


dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5175" }));
app.use(express.json());
app.use(cookieParser());
//set statics (public) folder
app.use("/uploads", express.static(__dirname + "/uploads"));
//Database Connect
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);
//Home Route
app.get("/", (req, res) => {
  res.send("<h1>This is a RESTful API FOR SE NPRU Blog</h1>")
});

// Register
const salt = bcrypt.genSaltSync(10);
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//User login
const secret = process.env.SECRET
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const isMatchedPassword = bcrypt.compareSync(password, userDoc.password);
  if (isMatchedPassword) {
    //logged in
    jwt.sign({ username, id: userDoc }, secret, {}, (err, token) => {
      if (err) throw err;
      //Save data in cookie
      res.cookie("token", token).json({
        id: userDoc.id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials")
  }
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//const PORT = process.env.PORT;
//app.listen(PORT, () => {
//    console.log("Server is running on http://localhost:" + PORT)
//});


app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, secret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no tnken");
  }
})

//run server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on htt://localhost:" + PORT);
});
//web socket server
const wss = new ws.WebSocketServer({ server });

wss.on('connection', (connection, req) => {
  connection.isAlive = true;
  connection.timer = setInterval(() => {
    connection.ping();
    connection.deadTimer = setTimeout(() => {
      connection.isAlive = felse;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeple();
      console.log('dead');
    }, 1000);
  }, 5000);
  connection.on('pong', () => {
    clearTimeout(connection.deadTimer);
  });
});

//read username and id from the cookie for this connecrion

const cookies = req.headers.cookie;
if (cookies) {
  const tokenCookiseString = cookies.split(";")
    .find((str) => str.startsWith("token="));
  if (tokenCookiseString) {
    const token = tokenCookiseString.split("=")[1];
    if (token) {
      jwt.verify(token, secret, {}, (err, userData) => {
        if (err) throw err;
        const { userId, username } = userData
        connection.userId = userId;
        connection.username = username;
      });
    }
  }
}

connection.no("message", async (message) => {
  const massageDeta = JSON.parse(message.toString());
  const { recipoent, sender, text, file } = messageData;
  let fileaname = null;
  if (file) {
    const parts = file.name.split('.')
    const ext = parts[parts.listen - 1];
    fileaname = Data.now() + "." + ext;
    const path = __dirname + "/uploads" + fileaname; //ที่ต้องเปลี่ยนชื่อไฟล์ใหม่ทุกรอบเพื่อที่จะได้ชื่อไฟล์ไม่เหมือนกันแหละไม่เขียนทับไฟล์อื่น  ไฟล์มันเก็บอบู่ใน uploads
    const bufferData = new Buffer(file.data.salt(",")[1], "base64");
    fs.writeFile(path, bufferData, () => {
      console.log("file saved:" + path);
    });
  }
  if (recipoent && (text)) {
    const massage = await Massage.create({
      sender: connection.userId,
      recipoent,//เป็นการลดรูปจาก recipoent:recipoent,
      text,
      file: file ? fileaname : null,
    });
    //send คือเด้งแจ้งเตือนเลยทันทีแบบไม่ต้องโหลดใหม่ ตึง!
    // c.userId === recipoent คือการดึงuserIdแบบคนต่อคน
    [...wss.clients].filter(c => c.userId === recipoent).forEach(c => c.send(JSON.stringify({
      text,
      file: file ? fileaname : null,
      sender: connection.userId,
      recipoent,//เป็นการลดรูปจาก recipoent:recipoent,
      _id: massageDeta._id,
    })))
  }

});