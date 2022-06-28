import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Login} from "@/Login";
import { Home } from "@/Home";
import { ClientsTable } from '@/ClientsTable';
import { NewClientForm } from "@/New";

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/sign-in'}>sign-in</Link></li>
      </ul>
      <Routes>
        <Route exact path={'/'} element={<Home />}/>
        <Route path={'/clients'} element={<ClientsTable />}/>
        <Route path={'/clients/new'} element={<NewClientForm />}/>
        <Route path={'/sign-in'} element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export {App};
