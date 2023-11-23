import React from "react";
import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Login} from "@/Login";
import { Home } from "@/Home";
import { ClientsTable } from '@/ClientsTable';
import { NewClientForm } from "@/New";
import { UserProfile } from "@/UserProfile";
import { UserChangePassword } from '@/UserChangePassword';
import { UserProfileUpdate } from '@/UserProfileUpdate';

function App() {
  return (
    <BrowserRouter>
      <div className="head">
        <h2 className="title">CargoTruckingBackend</h2>
        <div className="links">
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/sign-in'}>sign-in</Link></li>
          </ul> 
       </div>
      </div>
      <hr/>
      <Routes>
        <Route exact path={'/'} element={<Home />}/>
        <Route path={'/clients'} element={<ClientsTable />}/>
        <Route path={'/clients/new'} element={<NewClientForm />}/>
        <Route path={'/sign-in'} element={<Login />}/>
        <Route path={'/profile'} element={<UserProfile />}/>
        <Route path={'/profile/update'} element={<UserProfileUpdate />}/>
        <Route path={'/profile/change-password'} element={<UserChangePassword />}/>
      </Routes>
      <hr/>
    </BrowserRouter>
  );
}

export {App};
