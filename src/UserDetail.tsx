import React from 'react'
import { useQuery } from '@tanstack/react-query';
import * as api from './UserApi'
import { Use } from './UserApi';


interface mean {
  userId: string
}

const UserDetail:React.FC<mean> = ({userId}) => { 

  const {data: user, isLoading, isError} = useQuery<Use>({queryKey: ['user', userId], queryFn: () => api.getUser(userId), enabled: Boolean(userId) })
  // we used ['user', userId] as key because we are grabbing specific data

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


  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.details}</p>
    </div>
  )
}

export default UserDetail