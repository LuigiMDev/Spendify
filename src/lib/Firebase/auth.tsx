import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth"
import { auth, db } from "./firebaseConfig"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { userData } from "@/context/UserContext";


export const signUpUser = async (name: string, email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user

        const userDoc = await getDoc(doc(db, "users", user.uid))

        if(!userDoc.exists()) {
            const nameNormalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const nameReplaceded = nameNormalized.replace(/\s+/g, "+")

            const avatarResponse = await fetch(`https://ui-avatars.com/api/?name=${nameReplaceded}&background=random`);
            const avatar = avatarResponse.url;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                avatar,
                expenses: [],
            })
        }

        return user
}

export const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

        const popup = await signInWithPopup(auth, provider)
        const user = popup.user

        const userDoc = await getDoc(doc(db, "users", user.uid))

        if(!userDoc.exists()) {

            const nameNormalized = user.displayName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const nameReplaceded = nameNormalized?.replace(/\s+/g, "+")

            const avatarResponse = await fetch(`https://ui-avatars.com/api/?name=${nameReplaceded}&background=random&format=svg`);
            const avatar = user.photoURL ?? avatarResponse.url;

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                avatar,
                expenses: [],
            })
        }

        return user
}

export const signInUser = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if(!user) {
            throw new Error("Email ou senha incorretos")
        }

        return user
}

export const ForgetPassword = async (email: string) => {
       return await sendPasswordResetEmail(auth, email)
}

export const Logout =  () => {
    signOut(auth)
}

