import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Alert, Button, Container, Form, FormFeedback, FormGroup, Label, Input, Row } from 'reactstrap'
import { Formik, Field } from 'formik'
import { login } from 'actions'
import LoginSchema from 'validators/login'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (credentials) {
    this.props.dispatch(login(credentials))
  }

  render () {
    const { user } = this.props
    let initialValues = {}
    if (process.env.NODE_ENV === 'development') {
      initialValues = { email: 'admin@mail.com', password: 'Open1234' }
    }
    return (
      <div className='log-in'>
        <div id='login'>
          <Container>
            <img src={require('assets/images/logo-pmi.svg')} className='rounded mx-auto d-block logo' alt='logo-pmi' />
            {user.loginError && <Alert color='danger'>{user.loginError}</Alert>}
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                this.handleLogin(values)
                // setSubmitting(false)
              }}
            >
              {({
                errors,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor='email'>E-mail</Label>
                    <Field
                      name='email'
                      render={({ field }) => (
                        <Input {...field} type='email' id='email' placeholder='Masukkan E-mail' invalid={errors.email !== undefined} />
                      )}
                    />
                    {errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor='password'>Kata Sandi</Label>
                    <Field
                      name='password'
                      render={({ field }) => (
                        <Input {...field} type='password' id='password' placeholder='Kata Sandi' invalid={errors.password !== undefined} />
                      )}
                    />
                    {errors.password !== undefined ? <FormFeedback>{errors.password}</FormFeedback> : ''}
                  </FormGroup>
                  <Row>
                    <div className='col-sm'>
                      <Link to='/forgot-password' className='forgot-pass'>Lupa Kata Sandi?</Link>
                    </div>
                    <div className='col-sm'>
                      <div className='float-right'>
                        <Button type='submit' color='success' disabled={user.isLoggingIn}>Masuk</Button>
                      </div>
                    </div>
                  </Row>
                </Form>
              )}

            </Formik>
          </Container>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(withRouter(Login))
