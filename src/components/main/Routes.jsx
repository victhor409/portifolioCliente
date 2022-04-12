import React from 'react'
import Home from '../home/Home'
import Cliente from '../template/cliente/Cliente'
import {  Route, Redirect } from 'react-router'
import { Switch } from 'react-router'

export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/cliente' component={Cliente}/>
        <Redirect from='*' to='/'/>
    </Switch>