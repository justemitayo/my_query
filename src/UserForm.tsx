import React, { useState,  ChangeEvent, FormEvent } from 'react'
import { Use } from './UserApi';

interface formProps {
  users: Use;
  setIsEditing:  React.Dispatch<React.SetStateAction<boolean>> 
}

const UserForm: React.FC<formProps> = ({users, setIsEditing}) => {
  const [fields, setFields] = useState<Use>({...users })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFields({...fields, [name]: value})
  }
  // This is for updating multiple input fields in a form — like name, email, password, etc.

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(fields)
  }
  return (
    <div style={{paddingTop: 20}}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{''}
          <input 
            name='name'
            type='text'
            value={fields.name}
            onChange={handleChange  }
            style={{width: '100%', marginBottom: 20}}
          />
        </label>
        <label>
          Details:{''}
          <input 
            name='details'
            type='text'
            value={fields.details}
            onChange={handleChange  }
            style={{width: '100%', height: 100}}
          />
        </label>
      </form>
    </div>
  )
}

export default UserForm