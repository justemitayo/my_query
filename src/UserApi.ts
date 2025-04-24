

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
export interface Use {
  id: string;
  name: string;
  details: string
}

const api = axios.create({
  baseURL: 'http://localhost:3001/',
})



export const getUsers =() => api.get('/users').then(res => res.data)

export const getUser = (id: number | string) => api.get(`/users/${id}`).then(res => res.data)

// interface props{
//   id: number
//   name?: string
// }

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({id, ...updatedUser}:Partial<Use> & { id: number | string }) =>{
      return api.put(`/users/${id}`, updatedUser)
    }
  })
} 










// function App() {
//   const mutation = useMutation({
//     mutationFn: (newTodo) => {
//       return axios.post('/todos', newTodo)
//     },
//   })

//   return (
//     <div>
//       {mutation.isPending ? (
//         'Adding todo...'
//       ) : (
//         <>
//           {mutation.isError ? (
//             <div>An error occurred: {mutation.error.message}</div>
//           ) : null}

//           {mutation.isSuccess ? <div>Todo added!</div> : null}

//           <button
//             onClick={() => {
//               mutation.mutate({ id: new Date(), title: 'Do Laundry' })
//             }}
//           >
//             Create Todo
//           </button>
//         </>
//       )}
//     </div>
//   )
// }