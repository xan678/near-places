import { useEffect } from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from './component/Header';
import {useDispatch} from "react-redux";
import { useDebugValue } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './component/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(()=> {
    dispatch(setUser(user));
  },[]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/addTour' element = {<PrivateRoute><AddEditTour/></PrivateRoute>}/>
        <Route path='/editTour/:id' element = {<PrivateRoute><AddEditTour/></PrivateRoute>}/>
        <Route path='/tour/:id' element = {<SingleTour/>}/>
        <Route path='/dashboard' element = {
        <PrivateRoute>
          <Dashboard/>  
        </PrivateRoute>
        }/>
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
  
}

export default App;
