import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './authentication/LoginForm'
import PopupMessage from './common/PopupMessage'
import MainPanel from './summary/MainPanel'
import TransactionForm from './transaction/TransactionForm';
import TransactionList from './transaction/TransactionList';

import { setWallet } from './state/walletSlice'
import { setCurrency } from './state/currencySlice'
import { setCategory } from './state/categorySlice'
import { setTransaction } from './state/transactionSlice'
import { setUser } from './state/userSlice'


function App() {

  // global state
  const wallets = useSelector(state => state.wallet.value)
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  // internal state
  const [isLogin, setIsLogin] = useState(false);
  const [popupState, setPopupState] = useState({isVisible: false, messageType: "success", messageContent: ""});

  // -------------- script --------------

  function getWallet() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/wallet', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setWallet(data['wallets']))
    });
  }

  function getCategory() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/category', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      dispatch(setCategory(data['category']))
    })
  }

  function getCurrency() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/currency', {
      method: 'GET',
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      dispatch(setCurrency(data['currencies']))
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
    .then(data => {
      dispatch(setUser(data['user']))
    });
  }

  function getTodayTransaction() {
    if (wallets.length <= 0) return;
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/transaction?wallet_id=' + wallets[0].wallet_id, {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      dispatch(setTransaction(data['transactions']))
    })
  }

  useEffect(() => {
    remember();
  }, []);

  useEffect(() => { 
    if (isLogin) {
      getWallet();
      getCurrency();
      getCategory();
    }
  }, [user])

  useEffect(() => {
    if (wallets.length > 0) {
      getTodayTransaction();
    }
  }, [wallets])

  // -------------- render --------------

  let mainPage;
  if (!isLogin) {
    mainPage = <LoginForm setIsLogin={setIsLogin} setPopupState={setPopupState}/>
  } else {  
    mainPage = (
      <div className="snap snap-y snap-mandatory overflow-y-scroll h-screen w-screen">
        <div className="h-screen w-full items-center flex flex-col snap-start h-screen">
          <MainPanel/>
          <TransactionForm setPopupState={setPopupState}/>
        </div>
        <TransactionList/>
      </div>
    )
  }

  return (
    <div className="flex flex-col text-center justify-center items-center overflow-y-hidden">
      {popupState.isVisible && <PopupMessage popupState={popupState} setPopupState={setPopupState}/>}
      {mainPage}
    </div>
  );
}

export default App;
