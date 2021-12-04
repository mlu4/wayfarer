import { resolve } from 'dns';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { toast } from './toast';

const config = {
    apiKey: "AIzaSyB2KZU6C5lqJXPq286h3N51UZRs_eVoOuU",
    authDomain: "wayfarer-1f350.firebaseapp.com",
    projectId: "wayfarer-1f350",
    storageBucket: "wayfarer-1f350.appspot.com",
    messagingSenderId: "322744038644",
    appId: "1:322744038644:web:ff452da3b39a739d0d1aa1"
}

firebase.initializeApp(config)

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export async function loginUser(username: string, password: string) {
    const email = `${username}@gmail.com`

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return true
    } catch(e: unknown) {
        const u = e as Error
        toast(u.message, 4000)
        return false
    }
}

export async function registerUser(username: string, password: string) {
    const email = `${username}@gmail.com`
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(username, password)
        console.log(res)
        return true
    } catch (e: unknown) {
        const u = e as Error
        toast(u.message, 4000)
        return false
    }
}

const db = firebase.firestore()
export default db;