import React from "react";
import {Login} from "@/Login";
import { Home } from "@/Home";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import { ClientsTable } from '@/ClientsTable';

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/sign-in'}>sign-in</Link></li>
      </ul>
      <Routes>
        <Route exac path={'/'} element={<Home />}/>
        <Route path={'/clients'} element={<ClientsTable />}/>
        <Route path={'/sign-in'} element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export {App};
