import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './components/Projects';
import Project from './pages/Project';
import Stats from './pages/Stats';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Print from './pages/Print';
import GuestGuard from './guard/GuestGuard';
import AuthGuard from './guard/AuthGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='print/:ids' element={<Print/>}/>
        <Route path='/' element={<GuestGuard/>}>
          <Route path='/' element={<GuestLayout/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
        </Route>
        <Route path='/' element={<AuthGuard/>}>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='dashboard' element={<Dashboard/>}>
              <Route index element={<Profile/>}/>
              <Route path='projects' element={<Projects/>}/>
              <Route path='project/:id' element={<Project />} />
              <Route path='stats' element={<Stats />} />
            </Route>
            </Route>
          </Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
