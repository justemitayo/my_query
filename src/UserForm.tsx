import React, { useState,  ChangeEvent, FormEvent } from 'react'
import { Use, useUpdateUser } from './UserApi';
import ByteLockInstance from 'bytelock';
 
interface formProps {
  users: Use;
  setIsEditing:  React.Dispatch<React.SetStateAction<boolean>> 
}

const UserForm: React.FC<formProps> = ({users, setIsEditing}) => {

  const updateUser = useUpdateUser()
  const [fields, setFields] = useState<Use>({...users })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFields({...fields, [name]: value})
    // This is for updating multiple input fields in a form — like name, email, password, etc.

    const key = ByteLockInstance.generateCipherKey('66abe1cc11f58bf19a8dcef7', '66b1097c4ede2430559fa193');
    const message = ByteLockInstance.cipherMessage('Hello!', key);
    console.log("CipherKey", key, message);
  }
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fields.id) {
      console.error('User ID is required to update');
      return;
    } 
    updateUser.mutate(fields, {
      onSuccess: () =>{
        setIsEditing(false)
      }
    })
  }
  return (
    <div style={{paddingTop: 20}}>

      {updateUser.isPending && <p>Saving changes...</p>}
      {updateUser.isError && (
        <p style={{ color: 'red' }}>An error occurred: {updateUser.error.message}</p>
      )}
      {updateUser.isSuccess && <p style={{ color: 'green' }}>User updated successfully!</p>}

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
          <button type='submit'>SAVE</button>

      </form>
    </div>
  )
}

export default UserForm