const fs = require("fs");
const generatePassword = require("password-generator");

const key = generatePassword(15, false, /[a-zA-Z\d]/);
const data = {
  key,
};

// создаём файл
fs.writeFileSync("./public/buildKey.json", JSON.stringify(data));
