import User from './User';
// import './App.css';
import { useState } from 'react';
import UserDetail from './UserDetail';



function App() {

  const [userId, setUserId] = useState<string>('')
  return (
    <div className="App">
      <div style={{padding:'20px', width:'30%', borderRight:'2px solid white'}}>
        <User setUserId ={setUserId} />
      </div>
      <div style={{padding:'20px', width:'70%' }}>
        <UserDetail userId={userId}/>
      </div>
    </div>
  );
}

export default App;
