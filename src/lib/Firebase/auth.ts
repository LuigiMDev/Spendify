import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth"
import { auth, db } from "./firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


export const signUpUser = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user

        const userDoc = await getDoc(doc(db, "users", user.uid))

        if(!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                expenses: [],
            })
        }

        return user
    } catch (error) {
        console.log(error)
    }
}

export const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    try {
        const popup = await signInWithPopup(auth, provider)
        const user = popup.user

        const userDoc = await getDoc(doc(db, "users", user.uid))

        if(!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                expenses: [],
            })
        }

        return user
    } catch (error) {
        console.log(error)
    }
}

export const signInUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        return user
    } catch (error) {
        console.log(error)
    }
}

export const ForgetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(error)
    }
}

export const Logout =  () => {
    signOut(auth)
}

export const SaveAuth = async (user: User) => {
    try{
        return (await getDoc(doc(db, "users", user.uid))).data()
    } catch (error) {
        console.log(error)
        return null
    }
}

