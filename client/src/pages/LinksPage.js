import React, { useCallback, useContext, useEffect, useState } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import {ProfilesPage} from '../components/ProfilesPage'

export const LinksPage = () => {
    const {request, loading}= useHttp()
    const [profiles, setProfiles] = useState([])
    const {token} = useContext(AuthContext)

    const getProfiles = useCallback(async()=>{
        try{
           const fetched = await request(`/api/profile`, 'GET', null, {Authorization: `Bearer ${token}`})

           setProfiles(fetched)
        } catch (e) {
            console.log("aaaaa")
        }
    }, [token, request])

    useEffect(()=>{
        getProfiles()
    }, [getProfiles])

    if(loading){
        return <Loader />
    }

    return (
        <div>
            {!loading&&<ProfilesPage profiles={profiles}/>}
        </div>
    )
}