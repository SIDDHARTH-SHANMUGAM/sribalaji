import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Admin from './screens/Admin';
import History from './screens/History';

function Protected({children }){
  const user = JSON.parse(sessionStorage.getItem('user'));
  if(!user.isAdmin)
    return <Navigate to='/' replace />

  return children
}

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={ <Home/> } />
          <Route path='/profile' element={ <Profile/> } />
          <Route path='/history' element={ <History/> } />
          <Route 
            path='/admin' 
            element={ 
              <Protected>
                <Admin/> 
              </Protected>
              } 
            />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
