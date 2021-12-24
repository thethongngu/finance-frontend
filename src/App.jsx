import React, { useState } from 'react';
import LoginForm from './LoginForm'
import PopupMessage from './PopupMessage'
import MainPanel from './MainPanel'
import TransactionForm from './TransactionForm';
import { useEffect } from 'react/cjs/react.development';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [popupState, setPopupState] = useState({
    isVisible: false,
    messageType: "success",
    messageContent: ""
  });

  const [user, setUser] = useState({user_id: -1});
  const [wallet, setWallet] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [numTransactionAdded, setNumTransactionAdded] = useState(false);

  function getWallet() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/wallet', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setWallet(data['wallets'][0]);
    });
  }

  function getCurrency() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/currency', {
      method: 'GET',
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setCurrencies(data['currencies']);
    });
  }

  function remember() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/remember', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      setIsLogin(response.status === 200);
      return response.json();
    })
    .then(data => setUser(data['user']));
  }

  useEffect(() => { 
    if (user) {
      getWallet();
      getCurrency();
    }
  }, [user])

  useEffect(() => {
    remember();
  }, []);

  return (
    <div className="flex flex-col pt-8 text-center min-h-screen justify-center items-center">
      {
        popupState.isVisible && 
        <PopupMessage 
          popupState={popupState}
          setPopupState={setPopupState}
        />
      }
      {!isLogin 
        ? 
          <LoginForm 
            setIsLogin={setIsLogin} 
            setPopupState={setPopupState} 
            setUser={setUser}/>
        : 
          <>
            <MainPanel
              wallet={wallet}
              user={user}
              currencies={currencies}
              numTransactionAdded={numTransactionAdded}/>
            <TransactionForm 
              wallet={wallet}  
              setPopupState={setPopupState}
              setNumTransactionAdded={setNumTransactionAdded}
              numTransactionAdded={numTransactionAdded}
            />
          </>
      }
      
      
    </div>
  );
}

export default App;
