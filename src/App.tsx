import User from './User';
// import './App.css';
import { useState } from 'react';
import GlobalLoadingIndicator from './GlobalLoadingIndicator';
import UserDetail from './UserDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [userId, setUserId] = useState<string>('')
  return (
    <div className="App">
      <GlobalLoadingIndicator />
      <div style={{padding:'20px', width:'30%', borderRight:'2px solid white'}}>
        <User setUserId ={setUserId} />
      </div>
      <div style={{padding:'20px', width:'70%' }}>
        <UserDetail userId={userId}/>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
