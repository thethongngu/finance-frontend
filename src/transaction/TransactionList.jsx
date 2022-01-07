import { useSelector } from 'react-redux'

import List from '@mui/material/List';

import TransactionItem from "./TransactionItem";

export default function TransactionList(props) {

  // global state
  const transactions = useSelector(state => state.transaction.value)

  return (
    <List className="flex flex-col items-start w-full h-screen snap-start">
      {transactions.map((item) => {
          return (
            <TransactionItem 
              key={item.transaction_id}
              item={item}
            />
          )
      })}
    </List>
  )
}
