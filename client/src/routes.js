import React from 'react'
import {Switch , Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetalePage'
import {AuthPage} from './pages/AuthPage'


export const useRoutes =isAuthentificated =>{
    if(isAuthentificated){
        return (
            <Switch>
                <Route path = '/links'>
                    <LinksPage></LinksPage>
                </Route>
                <Route path = '/create'>
                    <CreatePage></CreatePage>
                </Route>
                <Route path = '/detail/:id'>
                    <DetailPage></DetailPage>
                </Route>
                <Redirect to ="/create/"></Redirect>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to ='/'/>
        </Switch>
    )
}
