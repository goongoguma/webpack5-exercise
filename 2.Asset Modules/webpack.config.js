// npx webpack으로 실행

// 4 Types of Asset Modules

// - asset/resource
// -> ouput 경로에 새로운 파일이 추가됨 하지만 각각의 resource에 http 리퀘스트를 쳐야할 수 있음
// - asset/inline 
// -> output 경로에 새로운 파일을 추가되는게 아니라 base64 문자열로 코딩되어 js 번들에 쓰여짐(용량큼). 그렇기에 svg나 아이콘 같은 용량이 작은 어셋파일에 사용됨. http 리퀘스트를 따로 안쳐도됨
// - asset
// -> 파일의 사이즈에 따라 자동적으로 웹팩이 asset/resource 혹은 asset/inline을 선택함(8KB 기준으로 선택함) dataUrlCondition에서 기준 사이즈 설정 가능
// - asset/source 
// -> 자바스크립트 문자열로 컨텐츠를 읽고 번들에 직집적으로 주입함(asset/inline과 비슷)

const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    // 웹팩 빌드해서 나온 파일 이름과 저장될 경로 설정 
    filename: "bundle.js",
    // path는 절대경로로 설정해야함
    // __dirname -> 현재 폴더, "./dist" -> 상대 경로
    path: path.resolve(__dirname, "./dist"), // 이렇게 하면 절대경로설정
    // 이렇게 하면 import한 asset의 경로가 상대경로가됨
    publicPath: "dist/"
    // (아래와 같이 cdn이나 서버에서 주는 이미지 경로로 사용할 수 있음)
    // publicPath: "http://some-cdn.com/"
  },
  mode: "none",
  module: {
    // jpg 파일을 import 하기전에 웹팩이 rules가 있는지 검사함
    rules: [
      {
        // 컨텐츠가 png 파일인지 jpg 파일인지 체크함
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // asset 타입의 파일 사이즈 기준 설정
            maxSize: 3 * 1024 // 3KB으로 설정
          }
        }
      },
      // asset/source를 사용하기 위한 rule 추가
      {
        test: /\.txt/,
        type: "asset/source"
      }
    ]
  }
}