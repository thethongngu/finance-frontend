import React from 'react';
import { useDispatch } from 'react-redux'

import { setUser } from '../state/userSlice'

function LoginForm(props) {

  const dispatch = useDispatch()

  let loginSuccess = false;

  function handleLogin() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        'username': document.getElementById("username").value,
        'hashed_password': document.getElementById("password").value, 
      })
    })
    .then(response => {
      loginSuccess = response.status === 200;
      props.setIsLogin(loginSuccess);
      return response.json();
    }).then(data => {
      props.setPopupState({
        isVisible: true,
        messageType: loginSuccess ? "success" : "error",
        messageContent: data["message"]
      })
      dispatch(setUser(data['user']));
    })
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="mb-8 text-3xl">Finance</h2>
      <input id="username" type="text" className="text-xl mb-2 h-16 border-none decoration-transparent rounded-3xl text-center bg-cyan-100" placeholder="Username"/>
      <input id="password" type="password" className="text-xl mb-8 h-16 border-none decoration-transparent rounded-3xl text-center bg-cyan-100" placeholder="Password"/>
      <button onClick={handleLogin} className="bg-cyan-100 h-12 w-32 text-xl rounded-3xl">Login</button>
    </div>
  );
}

export default LoginForm;