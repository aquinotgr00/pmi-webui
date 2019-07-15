import React from 'react'
import { Route } from 'react-router-dom'
import { Main } from 'components'
import ucwords from 'utils/string'
import TransactionList from 'components/TransactionList'

export default function Transactions (props) {
  const { transaction } = props.match.params
  const title = ucwords(transaction.split('-').join(' '))
  return (
    <Main title={title}>
      {['bulan-dana', 'donasi-dana', 'donasi-barang'].map(function (c,index) {
        return (
          <Route
            key={index}
            path={`/admin/transactions/${c}`}
            render={(props) => <TransactionList {...props} transaction={transaction} title={title} />}
          />
        )
      })}
    </Main>
  )
}
