const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    // 웹팩 빌드해서 나온 파일 이름과 저장될 경로 설정 
    filename: "bundle.js",
    // path는 절대경로로 설정해야함
    // __dirname -> 현재 폴더, "./dist" -> 상대 경로
    path: path.resolve(__dirname, "./dist") // 이렇게 하면 절대경로설정
  },
  mode: "none"
}