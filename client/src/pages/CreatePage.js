import React, {useContext, useEffect, useState} from 'react'; 
import { useHistory } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory()

    const auth = useContext(AuthContext)

    const {request} = useHttp()

    const [profile, setProfile] = useState({
        lastname:"", name:'', age:''
    })

    useEffect(()=>{window.M.updateTextFields()},[])

    const changeHandler = event =>{
        setProfile({ ...profile, [event.target.name]:event.target.value })
    }

    const createHandler = async event => {
        try{
            const data = await request('/api/profile/generate', 'POST', {name :profile.name, age: profile.age, lastname: profile.lastname} , {Authorization : `Bearer ${auth.token}`})
            history.push(`/detail/${data.profile._id}`)
        } catch(e){

        }
    }
    return (
        <div>
            <div className ="col s8 offset-s2">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Профиль</span>
                        <div>
                                <div className="input-field ">
                                    <input 
                                        id="name" 
                                        type="text" 
                                        placeholder ="введите name" 
                                        name="name"
                                        onChange ={changeHandler}
                                    />
                                    <label htmlFor="name">Имя</label>
                                </div>
                                <div className="input-field ">
                                    <input 
                                        id="lastname" 
                                        type="text" 
                                        placeholder ="введите lastname" 
                                        name ="lastname"
                                        onChange ={changeHandler}
                                    />
                                    <label htmlFor="surname">Фамилия</label>
                                </div>
                                <div className="input-field ">
                                    <input 
                                        id="age" 
                                        type="text" 
                                        placeholder ="введите age" 
                                        name ="age"
                                        onChange ={changeHandler}
                                    />
                                    <label htmlFor="age">Возраст</label>
                                </div>
                                <button 
                                    className='btn yellow darken-4' 
                                    onClick={createHandler}
                                >
                                    Создать профиль 
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}