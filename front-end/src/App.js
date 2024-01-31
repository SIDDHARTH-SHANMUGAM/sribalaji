import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './View/Login/Login';
import Home from './View/Home/Home';
import Profile from './View/Profile/Profile';
import Admin from './View/Admin/Admin';
import History from './View/History/History';
import Signin from './View/Signin/Signin';

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
          <Route path='/' element={ <Home/> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signin' element={<Signin/>} />
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
