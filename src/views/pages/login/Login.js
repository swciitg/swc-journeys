/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import {withRouter} from 'react-router'

const clientId = '398500418397-csmd0de4p1l7b6smiclfbhafubv96vpi.apps.googleusercontent.com';

const Login = () => {
  const history = useHistory();
  const onSuccess = async (res) => {
    console.log(res);
    let res1 = await axios.post(
      "https://swc.iitg.ac.in/swc_journeys/social_auth/google/",
      {
        auth_token: res.tokenId
      }
    );
    console.log(res1.data);
    Cookies.set("access", res1.data.tokens.access);
    Cookies.set("refresh", res1.data.tokens.refresh);
    Cookies.set("username", res1.data.username);
    Cookies.set("email", res1.data.email);
    history.push('/');
  }
  const loginURL = "https://swc.iitg.ac.in/swc_journeys/auth/login/"

  const loginWithEmail = async () => {
    var data = {
      email: document.getElementById('emailInput').value,
      password: document.getElementById('passwordInput').value
    }
    if (data.email !== "" && data.password !== "") {
      axios.post(loginURL, data).then(res => {
        Cookies.set("access", res.data.tokens.access);
        Cookies.set("refresh", res.data.tokens.refresh);
        Cookies.set("username", res.data.username);
        Cookies.set("email", res.data.email);
        history.push('/');
      }).catch(error => {
        if (error.response.status === 401) {
          alert("Incorrect Credentials")
        } else {
          alert("Something went wrong")
        }
      });
    }
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput id="emailInput" placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="passwordInput"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={loginWithEmail} color="primary" className="greenbtn">
                          Login
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CNavLink to="/register" component={NavLink} activeClassName="active">
                          <CButton color="link" className="px-0">
                            Create an account
                          </CButton>
                        </CNavLink>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ backgroundColor: '#005b54' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Login with Google</h2>
                    <br></br>
                    <br></br>
                    <GoogleLogin
                      clientId={clientId}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withRouter(Login)
