// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import Projects from './components/Projects';
// import Notifications from './components/Notifications';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute component={Dashboard} />} />
                    <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                    <Route path="/projects" element={<PrivateRoute component={Projects} />} />
                    {/* <Route path="/notifications" element={<PrivateRoute component={Notifications} />} /> */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
