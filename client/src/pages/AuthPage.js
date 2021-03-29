import React, { useContext, useEffect, useState } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm]= useState({
        email:"", password :""
    })
    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]:event.target.value })
    }

    const message = useMessage()

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{window.M.updateTextFields()},[])

    const registerHendler = async () => {
        try{
           const data = await request('/api/auth/register', 'POST', {...form}) 
           message(data.massage)
        } catch(e){}
    }

    const loginHendler = async () => {
        try{
           const data = await request('/api/auth/login', 'POST', {...form}) 
           auth.login(data.token, data.userId)
        //    message(data.massage)
        } catch(e){}
    }

    return (
        <div className ="row">
            <div className ="col s6 offset-s3">
                <h1>Crud</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                                <div className="input-field ">
                                    <input 
                                        id="email" 
                                        type="text" 
                                        placeholder ="введите Email" 
                                        name="email"
                                        onChange ={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field ">
                                    <input 
                                        id="password" 
                                        type="password" 
                                        placeholder ="введите Password" 
                                        name ="password"
                                        onChange ={changeHandler}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4' 
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHendler}
                        >
                            Войти
                        </button>
                        <button 
                            className='btn grey lighten-1 black-text'
                            disabled={loading}
                            onClick = {registerHendler}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}