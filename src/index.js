import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);
// 检测redux中的状态，只要状态变化，那么重新渲染 
// 疑似react16版本需要
// store.subscribe(() => {
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <Provider store={store}>
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </Provider>, document.getElementById('root')

//   );
// })
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
