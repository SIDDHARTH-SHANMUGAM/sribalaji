import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './View/Login/Login';
import Home from './View/Home/Home';
import Profile from './View/Profile/Profile';
import Admin from './View/Admin/AdminUI/Admin';
import History from './View/History/History';
import Signin from './View/Signin/Signin';
import Notification from './View/Notification/Notification';
import AllNotification from './View/Notification/AllNotification';
import Bill from './View/Admin/Bill/Bill';

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
          <Route path='/bill' element={ <Bill/> } />
          <Route path='/history' element={ <History/> } />
          <Route path='/notification' element={ <Notification/> } />
          <Route path='/allNotification' element={ <AllNotification/> } />
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
