import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import CategoryButton from "./CategoryButton";
import { addNewTransaction } from "../state/transactionSlice"

function TransactionForm(props) {

  // internal state
  const [selectedCategoryID, setSelectedCategoryID] = useState(-1);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  // global state
  const wallets = useSelector(state => state.wallet.value)
  const categories = useSelector(state => state.category.value)
  const dispatch = useDispatch()

  const selectAll = (e) => e.target.select();

  function handleAddTransaction(e) {
    let messageType;
    fetch(process.env.REACT_APP_API_ENDPOINT + '/member/transaction', {
      method: 'POST', credentials: 'include',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        'wallet_id': wallets[0].wallet_id,
        'category_id': selectedCategoryID,
        'amount': parseInt(amount),
        'note': note
      })
    })
    .then(response => {
      messageType = response.status === 200;
      return response.json();
    })
    .then(data => {
      props.setPopupState({
        isVisible: true, messageType: messageType ? "success" : "error", messageContent: data['message']
      });
      setTimeout(() => {
        setAmount('');
        setNote('');  
        setSelectedCategoryID(-1);
      }, 500);
      if (messageType) {
        dispatch(addNewTransaction(data['transaction']));
      }
    })
    
  }

  return (
      <div className="h-9/12 max-w-screen-sm w-full rounded-lg flex flex-col items-center">
        <input 
            className="mt-5 mb-0 mr-0 ml-0 text-2xl h-16 w-10/12 bg-cyan-100 border-none rounded-3xl pl-5 decoration-0 outline-none"
            pattern="[0-9]*" type="text" 
            onClick={selectAll} autoFocus
            placeholder="Amount"
            value={amount}
            onInput={e => setAmount(e.target.value)}
        />
         <input 
          className="m-2 mt-4 border-none text-xl w-10/12 h-10 pl-5 rounded-3xl shadow-none outline-none" 
          placeholder="Note"
          value={note}
          onInput={e => setNote(e.target.value)}
          />

        <div className="mt-2 grid border-1 grid-rows-[80px_80px] grid-cols-[1fr_1fr_1fr_1fr]">
          {
            categories.map((item) => {
              return (
                <CategoryButton 
                  key={item.category_id} 
                  isSelected={selectedCategoryID === item.category_id} 
                  categoryID={item.category_id}
                  iconName={item.icon_name}
                  label={item.name}
                  setSelectedCategoryID={setSelectedCategoryID}
                />
              )
            })
          }  
        </div>
        <button onClick={handleAddTransaction} className="w-32 rounded-2xl bg-cyan-100 text-lg h-10 m-4 border-none">Add</button>
    
      </div>
    )
}

export default TransactionForm;