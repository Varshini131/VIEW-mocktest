const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// ------------------ MongoDB Connection ------------------
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ------------------ Schema ------------------
const User = mongoose.model("User", {
  fullname: String,
  mobile: String,
  collegename: String,
  marksScored: Number,
  marksMax: Number,
  branches: [String]
});
const correctAnswers = {
  1:2,2:2,3:1,4:3,5:4,6:3,7:2,8:3,9:2,10:4,
  11:2,12:2,13:2,14:1,15:2,16:4,17:2,18:1,19:3,20:2,
  21:2,22:3,23:1,24:2,25:1,26:1,27:1,28:1,29:2,30:2,
  31:1,32:4,33:1,34:1,35:2,36:3,37:1,38:1,39:2,40:3,

  41:2,42:1,43:4,44:3,45:3,46:3,47:3,48:3,49:2,50:1,
  51:2,52:3,53:1,54:1,55:2,56:1,57:1,58:3,59:3,60:4,
  61:1,62:2,63:3,64:1,65:3,66:3,67:3,68:1,69:1,70:4,
  71:4,72:4,73:3,74:2,75:3,76:4,77:1,78:3,79:4,80:2,

  81:2,82:1,83:2,84:2,85:3,86:3,87:3,88:2,89:3,90:3,
  91:2,92:4,93:1,94:1,95:3,96:3,97:1,98:1,99:3,100:1,

  101:2,102:3,103:1,104:2,105:1,106:1,107:1,108:2,109:1,110:2,
  111:1,112:4,113:1,114:4,115:2,116:3,117:3,118:1,119:4,120:3,

  121:2,122:1,123:4,124:3,125:3,126:3,127:2,128:3,129:2,130:1,
  131:2,132:3,133:1,134:1,135:2,136:1,137:1,138:1,139:3,140:4,

  141:1,142:1,143:1,144:1,145:1,146:3,147:3,148:2,149:1,150:1,
  151:4,152:1,153:2,154:1,155:4,156:3,157:2,158:1,159:2,160:2
};
// ------------------ Routes ------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});
// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Register API
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});
app.post("/submit", (req, res) => {
  const { answers } = req.body;

  let score = 0;
  const total = 160;

  for (let i = 1; i <= total; i++) {
    if (answers[i] && answers[i] == correctAnswers[i]) {
      score++;
    }
  }

  res.json({ score, total });
});
// ------------------ Start Server ------------------
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
