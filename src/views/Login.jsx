import React from 'react'
import { Button, Container, Form, FormGroup, Label, Input, Row } from 'reactstrap'

class Login extends React.Component {
  render() {
    return (
      <div className="log-in">
        <div id="login">
          <Container>
            <img src={ require('assets/images/logo-pmi.svg') } className="rounded mx-auto d-block logo" alt="logo-pmi" />
              <Form>
                <FormGroup>
                  <Label for="exampleInputEmail1">E-mail</Label>
                  <Input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukkan E-mail" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">Kata Sandi</Label>
                  <Input type="password" className="form-control" id="exampleInputPassword1" placeholder="Kata Sandi" />
                </FormGroup>
                <Row>
                  <div className="col-sm">
                    <a href="lupa-kata-sandi.html" className="forgot-pass">Lupa Kata Sandi?</a>
                  </div>
                  <div className="col-sm">
                    <div className="float-right">
                      <Button color="success">Masuk</Button>
                    </div>
                  </div>
                </Row>
              </Form>
          </Container> 
        </div>
      </div>
    )
  }
}



export default Login