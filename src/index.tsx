import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
      <script type="text/javascript">
          var vglnk = {key: '2336917d462fc5c205591ac50ae95652'};
          (function(d, t) {
          var s = d.createElement(t);
          s.type = 'text/javascript';
          s.async = true;
          s.src = '//cdn.viglink.com/api/vglnk.js';
          var r = d.getElementsByTagName(t)[0];
          r.parentNode.insertBefore(s, r);
      }(document, 'script'));
      </script>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
