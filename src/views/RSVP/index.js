import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Main } from 'components'
import RsvpList from './RsvpList'
import RsvpForm from './RsvpForm'

export default function Rsvp (props) {
  const { category } = props.match.params
  const titles = {'list-rsvp':'List RSVP', 'moderasi':'Moderasi','arsip':'Arsip', 'buat-rsvp':'Form RSVP'}
  return (
    <Main title={titles[category]}>
      <Switch>
        {['list-rsvp', 'moderasi', 'arsip'].map(function (rsvp, key) {
          return (
            <Route
              exact
              path={`/admin/rsvp/${rsvp}`}
              render={props => <RsvpList {...props} category={category} />}
              key={key}
            />
          )
        })}
        <Route
          exact
          path={`/admin/rsvp/buat-rsvp`}
          component={RsvpForm}
        />
      </Switch>
    </Main>
  )
}
