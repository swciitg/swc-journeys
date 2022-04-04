/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useHistory } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const registerURL = "https://swc.iitg.ac.in/swc_journeys/auth/register/"
  const history = useHistory();
  const createAccount = () => {
    var username = document.getElementById('usernameInput').value
    var email = document.getElementById('emailInput').value
    var password = document.getElementById('passwordInput').value
    var repeatPassword = document.getElementById('repeatPasswordInput').value
    if(username!=="" && email!=="" && password!=="" && repeatPassword!=="") {
      if(password===repeatPassword) {
        var data = {
          username:username,
          email:email,
          password:password,
        }
        axios.post(registerURL,data).then(res => {
          alert("Registered successfully, Kindly proceed to login")
          history.push('/login');
        }).catch(error => {
          if (error.response.status === 400) {
            alert("Check your entered data again")
          } else {
            alert("Something went wrong")
          }
  
      });
      } else {
        alert("Passwords don't match")
      }
    } else {
      alert("Fields can't be blank")
    }
  }
  return (
    <div style={{backgroundColor:'#ECF8F3'}} className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput id="usernameInput" placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput id="emailInput" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="passwordInput"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="repeatPasswordInput"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton onClick={createAccount} className="greenbtn">Create Account</CButton>
                    <CNavLink to="/login" component={NavLink} activeClassName="active">
                    <CButton color="link" className="px-0">
                          Already have an account? 
                    </CButton>
                    </CNavLink>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
