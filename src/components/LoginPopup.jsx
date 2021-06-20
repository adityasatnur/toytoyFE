import React from "react";
import "../styles/LoginPopup.scss";
import {signInWithGoogle,signOut} from "../firebase/firebase"


const LoginPopup = (props) => {
  return (
    <>
      <div className="LoginPopup">
      {!props.currentUser &&
        <button className="signIn" onClick={props.signIn}>Sign in with Google</button>
      }
        {props.currentUser &&
        <button className="signOut" onClick={props.signOut}>Sign Out</button>}
      </div>
      <div className="backdrop"></div>
    </>
  );
};
export default LoginPopup;
