import React from 'react'
import { useQuery } from 'react-query'
import * as api from './UserApi'
import {Use} from './UserApi'

const User = () => {

  const {data} = useQuery<Use[]>('user', api.getUsers);
  return (
    <div>
      <ul>{
          data?.map((user) => <li key={user.id}>{user.name}</li>)
        }</ul>
    </div>
  )
}

export default User