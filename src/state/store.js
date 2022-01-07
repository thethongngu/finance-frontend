import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from './transactionSlice'
import walletReducer from './walletSlice'
import categoryReducer from './categorySlice'
import userReducer from './userSlice'
import currencyReducer from './currencySlice'

export default configureStore({
  reducer: {
    transaction: transactionReducer,
    wallet: walletReducer,
    category: categoryReducer,
    user: userReducer, 
    currency: currencyReducer
  }
})