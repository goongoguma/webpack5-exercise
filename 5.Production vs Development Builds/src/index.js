// 웹팩 설정을 위해 종속성 추가
import HelloWorldButton from './components/hello-world-button/hello-world-button';
import Heading from './components/heading/heading';

const heading = new Heading();
heading.render();
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}

helloWorldButton.methodThatDoesNotExist();
