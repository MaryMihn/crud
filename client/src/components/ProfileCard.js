import React from 'react'

export const ProfileCard = ({profile}) =>{
    return (
        <div>
            <h2>Профиль</h2>
            <p>Name {profile.name}</p>
            <p>Lastname {profile.lastname}</p>
            <p>Age {profile.age}</p>
        </div>
    )
}