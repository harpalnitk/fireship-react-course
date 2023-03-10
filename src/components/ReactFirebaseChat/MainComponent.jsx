import './MainComponent.css';
import React, { useRef, useState } from 'react';

import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider,signInWithPopup,signOut  } from "firebase/auth";
import { getFirestore, 
    collection,
    query,
orderBy,
limit,
serverTimestamp,
addDoc   } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const app = initializeApp({
    apiKey: "AIzaSyAgu4Z9n_x8U9QgvMzj-jpGtvtX6OfBP6Q",
    authDomain: "fireship-blog-react-firebase.firebaseapp.com",
    databaseURL: "https://fireship-blog-react-firebase-default-rtdb.firebaseio.com",
    projectId: "fireship-blog-react-firebase",
    storageBucket: "fireship-blog-react-firebase.appspot.com",
    messagingSenderId: "877791210413",
    appId: "1:877791210413:web:65580cc214ead2e4400f24",
    measurementId: "G-BPJZGYRGND"
  })
  
  const auth = getAuth(app);
  const db = getFirestore(app);
 


const MainComponent = (props) => {
    const [user] = useAuthState(auth);
    function SignIn() {

        const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        }
      
        return (
          <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
          </>
        )
      
      }

      function SignOut() {

        const signOutUser = async ()=>{
           await signOut(auth);
        }
        console.log('auth.currentUser', auth.currentUser);
        return auth.currentUser && (
          <button className="sign-out" onClick={signOutUser}>Sign Out</button>
        )
      }

      function ChatRoom() {
        const dummy = useRef();
        const messagesRef = collection(db,'messages');
        const q = query(messagesRef, orderBy("createdAt"), limit(25))
        const [messages] = useCollectionData(q, { idField: 'id' });

        const [formValue, setFormValue] = useState('');

        const sendMessage = async (e) => {
            e.preventDefault();
        
            const { uid, photoURL } = auth.currentUser;
        
            // await messagesRef.add({
            //   text: formValue,
            //   createdAt: serverTimestamp(),
            //   uid,
            //   photoURL
            // })
            await addDoc(messagesRef,{
                text: formValue,
                createdAt: serverTimestamp(),
                uid,
                photoURL
              });
        
            setFormValue('');
            dummy.current.scrollIntoView({ behavior: 'smooth' });
          }

          return (<>
            <main>
        
              {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        
              <span ref={dummy}></span>
        
            </main>
        
            <form onSubmit={sendMessage}>
        
              <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        
              <button type="submit" disabled={!formValue}>🕊️</button>
        
            </form>
          </>)
    }

    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;
      
        //applying different styling for sent or received messages
        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
      
        return (<>
          <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
          </div>
        </>)
      }

   
    
    return (
         <div className="App">
            
            <header className="App-header">
            <h1>⚛️🔥💬</h1>
            <SignOut />
            </header>

            <section>
            {user ? <ChatRoom /> : <SignIn />}
            </section>
         </div>
     );
        }


export default MainComponent;





//! function to be written in index.js file of firebase functions for banning user for
//! using profane words

// const functions = require('firebase-functions');
// const Filter = require('bad-words');
// const admin = require('firebase-admin');
// admin.initializeApp();

// const db = admin.firestore();

// exports.detectEvilUsers = functions.firestore
//        .document('messages/{msgId}')
//        .onCreate(async (doc, ctx) => {

//         const filter = new Filter();
//         const { text, uid } = doc.data(); 


//         if (filter.isProfane(text)) {

//             const cleaned = filter.clean(text);
//             await doc.ref.update({text: `🤐 I got BANNED for life for saying... ${cleaned}`});

//             await db.collection('banned').doc(uid).set({});
//         } 

//         const userRef = db.collection('users').doc(uid)

//         const userData = (await userRef.get()).data();

//         if (userData.msgCount >= 7) {
//             await db.collection('banned').doc(uid).set({});
//         } else {
//             await userRef.set({ msgCount: (userData.msgCount || 0) + 1 })
//         }

// });