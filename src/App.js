import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes'; // 引入路由配置

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children?.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
}

export default App;