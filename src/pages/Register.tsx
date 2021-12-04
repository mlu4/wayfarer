import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from '../toast';
import '../theme/Home.css';
import { registerUser } from '../firebaseConfig'
import { getCurrentUser } from '../firebaseConfig'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  async function register() {
    if (password !== cpassword) {
      return toast('Passwords do not match')
    }
    if (username.trim() === '' || password.trim() === '') {
      return toast('Username and password are required')
    }
    
    const res = await registerUser(username, password)
    if (res) {
      toast('You have registered successfully!')
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
                <IonTitle class="welcome">START PLANNING</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput 
              placeholder="Create Username" 
              onIonChange={(e: any) => setUsername(e.target.value)}
          />
          <IonInput
              type="password"
              placeholder="Create Password"
              onIonChange={(e: any) => setPassword(e.target.value)}
          />
          <IonInput
              type="password"
              placeholder="Confirm Password"
              onIonChange={(e: any) => setCPassword(e.target.value)}
          />
          <IonButton class="loginbtn" onClick={register}>Register</IonButton>

          <p>Already have an account? <Link to="/login"> Login</Link></p>
        </IonContent>
    </IonPage>
  );
};

export default Register;
