import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';




// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utilis/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{ 
   
  useEffect(()=>{
      
      store.dispatch(loadUser());
    }, []);

    return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={ <Landing />} />
          </Routes>
          <section className='container'>
            <Alert />
            <Routes>
              <Route 
              exact path='/register' element={ <Register />} 
              />
              <Route 
              exact path='/login' element={ <Login />} 
              />
              <Route 
              exact path='/profiles' element={ <Profiles />} 
              />
              <Route 
              exact path='/profile/:id' element={ <Profile />} 
              />
              <Route 
              exact path='/dashboard' element={ <PrivateRoute element={<Dashboard />}/>} 

              />
              <Route 
              exact path='/create-profile' element={<PrivateRoute element={<CreateProfile />}/>} 
                
              />
              <Route 
              exact path='/edit-profile' element={<PrivateRoute element={<EditProfile />}/>} 
                
              />

              <Route 
              exact path='/add-experience' element={<PrivateRoute element={<AddExperience />}/>} 
                
              />

              <Route 
              exact path='/add-education' element={<PrivateRoute element={<AddEducation />}/>} 
                
              />
              <Route 
              exact path='/posts' element={<PrivateRoute element={<Posts />}/>} 
                
              />
              <Route 
              exact path='/posts/:id' element={<PrivateRoute element={<Post />}/>} 
                
              />
              
            </Routes>
          </section>

        </Fragment>
      </Router>
    </Provider>
    
  );
}

export default App;
