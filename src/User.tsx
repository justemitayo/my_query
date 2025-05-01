import React from 'react'
// import { useQuery } from 'react-query'
import { useQuery } from '@tanstack/react-query'
import * as api from './UserApi'
import {Use} from './UserApi'

interface mean {
  setUserId: React.Dispatch<React.SetStateAction<string>>
}

const User: React.FC<mean> = ({setUserId}) => {

  const {data, isLoading, isError,fetchStatus} = useQuery<Use[]>({queryKey: ['user'], queryFn: api.getUsers});

  // we used 'user' as the key because we are calling the entire data

  if (isLoading) {
    return <p>'Loading Users...' </p>;
  }
  if (isError) {
    return <p>'Something went wrong!!!'</p>;
  }
  if (fetchStatus === 'fetching') {
    return <p>'The Query is currentky fetching!!!'</p>;
  }
  if (fetchStatus === 'paused') {
    return <p>'The Query wanted to fetch but it was paused'</p>;
  }

  return (
    <div>
      <ul>{
          data?.map((user) => <li key={user.id}>
            {user.name}
            <button onClick={() => setUserId(user.id)}>View</button>
            </li>)
        }</ul>
    </div>
  )
}

export default User