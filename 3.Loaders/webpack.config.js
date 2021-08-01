// npx webpack으로 실행

const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",

    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/"

  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024
          }
        }
      },
      {
        test: /\.txt/,
        type: "asset/source"
      },
      {
        // 웹팩에서 css 사용
        test: /\.css$/,
        use: [
          // css-loader -> css파일의 컨텐츠를 읽고 반환
          // style-loader -> css를 읽고 스타일 태그를 사용하는 페이지 태그에 주입
          // loader를 사용하게 되면 npm으로 설치해야함 (npm install css-loader style-loader --save-dev)
          'style-loader', 'css-loader'
        ]
      },
      {
        // 웹팩에서 scss 사용법 (loader는 오른쪽에서 왼쪽으로 읽힌다)
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        // 노드모듈 안에있는 js파일들은 제외시킴
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/env은 자바스크립트 6버전 이상을 5버전으로 낮춤
            presets: ['@babel/env'],
            // EcmaScript에서 정식으로 지원하지 않는 class 프로퍼티를 서포트 하는 플러그인 (이 외에도 다양한 플러그인이 있음)
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
}