/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import { Forbidden, NotFound } from '@totalsoft_oss/rocket-ui.core'
import HelloWorld from 'features/helloWorld/HelloWorld'
import BookListContainer from 'features/book/list/components/BookListContainer'
import BookContainer from 'features/book/edit/components/BookContainer'

export default function AppRoutes() {
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/books' component={BookListContainer} />
      <CustomRoute isPrivate={false} exact path='/books/:id(\d+)' component={BookContainer} />
      <CustomRoute isPrivate={false} exact path='/books/:id(new)' component={BookContainer} />
      <CustomRoute isPrivate={false} exact path='/welcome' component={HelloWorld} />
      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
}
