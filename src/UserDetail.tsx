import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import * as api from './UserApi'
import { Use } from './UserApi';
import UserForm from './UserForm';


interface mean {
  userId: string;
  // isEditing: boolean;
  // setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}
 
const UserDetail:React.FC<mean> = ({userId}) => { 

  const [isEditing, setIsEditing] = useState(false)

  const {data: user, isLoading, isError, fetchStatus} = useQuery<Use>({
    queryKey: ['user', userId], 
    queryFn: () => api.getUser(userId), enabled: Boolean(userId) 
  // we used ['user', userId] as key because we are grabbing specific data

    // The query will not execute until the userId exists
 
  })
  if(!userId) {
    return <p>'select a user'</p>
  }
  if(isLoading) {
    return <p>'Loading user detail'</p>
  }
  if(isError ) {
    return <p>'Something went wrong'</p>
  }
  if (!user) {
    return <p>No user found</p>; 
  }
  if (fetchStatus === 'fetching') {
    return <p>'The Query is currentky fetching!!!'</p>;
  }
  if (fetchStatus === 'paused') {
    return <p>'The Query wanted to fetch but it was paused'</p>;
  }
  


  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'CANCEL' : 'EDIT'}
      </button>

      {isEditing ? 
        <UserForm users ={user} setIsEditing={setIsEditing}/> :
         <div>
          <h2>{user.name}</h2>
          <p>{user.details}</p>
        </div>}

    </div>
  )
}

export default UserDetail