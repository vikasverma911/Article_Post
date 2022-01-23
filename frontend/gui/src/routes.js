import React from "react";
import { Route, Routes } from 'react-router-dom';
import ArticleDetailView from "./containers/ArticleDetailView";
import ArticleListView from "./containers/ArticleListView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
    <Routes>
        <Route exact path='/' element={< ArticleListView />} />
        <Route exact path='/articles/:articleID' element={< ArticleDetailView />} />
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/signup' element={< Signup />}></Route>
    </Routes>
)
export default BaseRouter;