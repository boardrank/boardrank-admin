import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignInPage = () => {
  const navigate = useNavigate();
  const { user, handleSuccessGoogleLogin, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      const { role } = user;
      if (role === 'ADMIN') {
        navigate('/');
      } else {
        alert(
          '운영 권한이 없습니다. 권한이 필요할 경우 관리자에게 연락해주세요.',
        );
        signOut();
      }
    }
  }, [navigate, signOut, user]);

  return (
    <StyledWrapper>
      <div className="side-bg"></div>
      <div className="sign-in-wrapper">
        <div className="sign-in-inner-wrapper">
          <div className="icon-lock-wrapper">
            <svg
              className="icon-lock"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              data-testid="LockOutlinedIcon"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </div>
          <h1 className="title">Sign in</h1>
          <GoogleLogin
            className="button-sign-in"
            clientId="47989076113-v9i17kn2i3bku3ko07pu287du8akot88.apps.googleusercontent.com"
            buttonText="Sign In"
            onSuccess={handleSuccessGoogleLogin}
          />
          <p className="copyright">Copyright © Board Rank 2021.</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  .side-bg {
    background-image: url('https://source.unsplash.com/random');
    box-sizing: border-box;
    margin: 0;
    background-repeat: no-repeat;
    background-color: #fafafa;
    background-size: cover;
  }

  .sign-in-wrapper {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 9px 3px 5px -1px rgb(0 0 0 / 20%),
      0px 6px 10px 0 rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
    box-sizing: border-box;
    margin: 0;
    flex: 1;
  }

  .sign-in-inner-wrapper {
    margin: 64px 32px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .icon-lock-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-size: 1.25rem;
      line-height: 1;
      border-radius: 50%;
      user-select: none;
      color: #fff;
      margin: 8px;
      background-color: #9c27b0;

      .icon-lock {
        user-select: none;
        width: 1em;
        height: 1em;
        display: inline-block;
        fill: currentColor;
        flex-shrink: 0;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-size: 1.5rem;
      }
    }

    .title {
      margin: 0;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 1.334;
      letter-spacing: 0em;
    }

    .button-sign-in {
      margin-top: 16px;
      width: 80%;
    }

    .copyright {
      margin: 0;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      text-align: center;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 40px;
    }
  }

  @media screen and (min-width: 600px) {
    .side-bg {
      flex-basis: 33.3333%;
      flex-grow: 0;
      max-width: 33.3333%;
    }

    .sign-in-wrapper {
      flex-basis: 66.6667%;
      flex-grow: 0;
      max-width: 66.6667%;
    }
  }

  @media screen and (min-width: 900px) {
    .side-bg {
      flex-basis: 58.3333%;
      flex-grow: 0;
      max-width: 58.3333%;
    }

    .sign-in-wrapper {
      flex-basis: 41.6667%;
      -webkit-box-flex: 0;
      flex-grow: 0;
      max-width: 41.6667%;
    }
  }
`;

export default SignInPage;
