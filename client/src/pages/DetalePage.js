import React, { useCallback, useContext, useEffect, useState } from 'react'; 
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {ProfileCard} from '../components/ProfileCard'

export const DetailPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading}= useHttp()
    const [profile, setProfile] = useState(null)
    const profilId = useParams().id

    const getProfile = useCallback(async()=>{
        try{

           const fetched = await request(`/api/profile/${profilId}`, 'GET', null,{Authorization: `Bearer ${auth.token}`})

           setProfile(fetched)
        } catch (e) {
            console.log("aaaaa")
        }
    }, [auth.token, profilId, request])

    useEffect(()=>{
        getProfile()
    }, [getProfile])

    if(loading){
        return <Loader />
    }

    return (
        <div>
            { !loading && profile && <ProfileCard profile = {profile}/>}
        </div>
    )
}