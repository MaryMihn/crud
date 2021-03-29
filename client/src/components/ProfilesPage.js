import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext';



export const ProfilesPage = ({profiles}) =>{
    const {request}= useHttp()
    const auth = useContext(AuthContext)

const handlerDelete =async (id) => {
    console.log(id)
    const fetched = await request(`/api/profile/delete/${id}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`})
    console.log(fetched)
}



    if(!profiles.length){
        return <p> you have no one profile</p>
    }
    return (
        <div>
            <h2>Профили</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Age</th>
                    <th>Open</th>
                    <th>Delite</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                    {profiles.map(prof =>{
                        return(
                            <tr key={prof._id}>
                                <td>{prof.name}</td>
                                <td>{prof.lastname}</td>
                                <td>{prof.age}</td>
                                <td><Link to ={`/detail/${prof._id}`}>open</Link></td>
                                <td><button onClick={()=>handlerDelete(prof._id)}>delete</button></td>
                                <td><button>edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}