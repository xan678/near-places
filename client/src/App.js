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
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/login' element = {<Login/>}></Route>
        <Route path='/register' element = {<Register/>}></Route>
        <Route path='/addTour' element = {<AddEditTour/>}></Route>
        <Route path='/editTour/:id' element = {<AddEditTour/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
  
}

export default App;
