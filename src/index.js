import ReactDom from 'react-dom';
import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDom.render(<App/>,document.querySelector('#root'));