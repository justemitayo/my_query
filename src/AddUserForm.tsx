import React from 'react';
import { useQueryClient} from '@tanstack/react-query';
import { useCreateUser } from './UserApi';
import { Use } from './UserApi';
import {toast} from 'react-toastify'
import { useState, FormEvent, ChangeEvent } from 'react';

const AddUserForm:React.FC = () => {
  const[name, setName] = useState('');
  const [detail, setDetail] = useState('');

  const queryClient = useQueryClient();

  const createUser = useCreateUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'detail') setDetail(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      name: name.trim(),
      details: detail.trim(),
    };

    if (!newUser.name || !newUser.details) {
      toast.error('Both fields are required');
      return;
    }

    const existingUsers = queryClient.getQueryData<Use[]>(['user']);
    const nameExists = existingUsers?.some(user => user.name === name);

    if (nameExists) {
      toast.error('A user with this name already exists!');
      return;
    }
    // check for duplicate name using getQueryData

    createUser.mutate(newUser, {
      onSuccess: (addedUser) => {
        toast.success('User added successfully!');
        queryClient.setQueryData<Use[]>(['user'], (old = []) => [...old, addedUser])
        // update the catched list
        setName('')
        setDetail('')
      },
      onError: (error: any) => {
        toast.error(`Error: ${error.message || 'Unknown error'}`);
      },
    })

  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
    <div>
      <label>Name: </label>
      <input
      name='name'
        type="text"
        value={name}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: 10 }}
      />
    </div>
    <div>
      <label>Details: </label>
      <input
      name='detail'
        type="text"
        value={detail}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: 10 }}
      />
    </div>
    <button type="submit" disabled={createUser.isPending}>
      {createUser.isPending ? 'Adding...' : 'Add User'}
    </button>
  </form>
  )
}

export default AddUserForm