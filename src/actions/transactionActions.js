import { listTransactionApi } from 'services/api'
import { persistor } from 'store'

export function transactionList() {
    return async function(dispatch, getState) {
      dispatch({
        type: 'TRANSACTION_REQUEST'
      })
      
      const transactionListResponse = await listTransactionApi()
      console.log(transactionListResponse)
  
      persistor.purge()
      
      dispatch({
        type: 'TRANSACTION_SUCCESS'
      })
    }
}