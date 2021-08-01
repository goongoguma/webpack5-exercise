// npx webpack으로 실행

const path = require("path");
// npm install terser-webpack-plugin --save-dev으로 설치 (웹팩5버전 이상은 따로 설치 필요없음, 웹팩 플러그인은 개발에서만 사용하기에 --save-dev로 설치)
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    // contenthash를 함으로써 빌드할때 자바스크립트 파일의 변화를 감지해 새로운 번들파일이 생성되어 브라우저 캐싱이 안됨
    filename: "bundle[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/"
    // HtmlWebpackPlugin에 의해 생성된 html파일에서 script와 link의 js파일과 스타일 파일에 dist prefix를 제거하기 위해 수정, 그리고 더 이상 src의 html 파일은 필요없음
    publicPath: ""
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  // Plugins는 자바스크립트 라이브러리로서 웹팩에 기능을 추가한다 
  // Plugins로 어플리케이션에서 전체에서 사용 가능한 전역변수를 선언할 수도 있으며 번들 사이즈를 최소화 할 수도 있다
  plugins: [
    // TerserPlugin으로 번들 사이즈를 최소화 시켜볼것
    new TerserPlugin(),
    // MiniCssExtractPlugin으로 js에서 css를 추출해 새 번들을 만들기 위해 사용
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    // 빌드 프로세스를 실행하면 과거 번들로 만들어진 파일을 삭제
    new CleanWebpackPlugin({
      // 패턴을 지정하여 여러개 삭제 가능
      cleanOnceBeforeBuildPatterns: [
        // dist에 있는 모든 sub-directory의 모든 파일을 지우라는 뜻
        '**/*',
        // dist외의 파일을 지우려면(여기서는 build 폴더안의 파일) 이렇게 절대경로를 설정해야함
        path.join(process.cwd(), 'build/**/*')
      ]
    }),
    // contenthash값이 자동적으로 포함된 html 파일을 dist에 생성해줌
    new HtmlWebpackPlugin({
      // dist 폴더에 해당 html 파일을 생성할때 아래처럼 옵션을 지정할수있음
      // title: 'Hello world',
      // filename: 'subfolder/custom_filename.html',
      // meta: {
      //   description: 'Some description'
      // }
    })
  ]
}