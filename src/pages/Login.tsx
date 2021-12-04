import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../firebaseConfig'
import { toast } from '../toast';
import { getCurrentUser } from '../firebaseConfig'
import '../theme/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const res = await loginUser(username.trim(), password.trim())
    if (res) {
      toast('You have logged in!')
      getCurrentUser().then(user => {
        console.log(user)
        if(user) {
          // user logged in
          // FIX BUG --> USER SCOPE ENDS AFTER LINE 76 
          if(!window.location.href.endsWith('/interest_1')) {
            // window.history.replaceState({} , '', '/interest_1');
            window.location.href = "/interest_1"
          }
        } else {
          window.history.replaceState({}, '', '/')
        }
      })
    }
  }

  return (
    <IonPage>
        <IonHeader class="ion-no-border">
            <IonToolbar>
                <IonTitle class="welcome">WELCOME BACK</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput 
              placeholder="Username?" 
              onIonChange={(e: any) => setUsername(e.target.value)}
          />
          <IonInput
              type="password"
              placeholder="Password?"
              onIonChange={(e: any) => setPassword(e.target.value)}
          />
          <IonButton class="loginbtn" onClick={login}>Login</IonButton>
          <p>New user? <Link to="/register">Register now</Link></p>
        </IonContent>
    </IonPage>
  );
};

export default Login;
