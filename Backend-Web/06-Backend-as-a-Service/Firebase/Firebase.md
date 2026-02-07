# Firebase

## Introduction

## Quick Reference Guide

Firebase is Google's comprehensive platform for building web and mobile applications with backend services included.

## Core Services
1. **Realtime Database**: NoSQL cloud database
2. **Firestore**: Document-based database
3. **Authentication**: User authentication
4. **Cloud Functions**: Serverless functions
5. **Cloud Storage**: File storage
6. **Hosting**: Static site hosting
7. **Analytics**: User analytics
8. **Messaging**: Push notifications

## Getting Started

### Setup Project
```bash
npm install firebase

# Initialize
firebase init
```

### Initialize in Application
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
```

## Firestore Examples

### Add Data
```javascript
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

async function addUser(user) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: user.name,
      email: user.email,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
```

### Read Data
```javascript
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

async function getUsersByEmail(email) {
  const q = query(
    collection(db, "users"),
    where("email", "==", email)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### Update Data
```javascript
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

async function updateUser(userId, updates) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);
}
```

### Delete Data
```javascript
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config";

async function deleteUser(userId) {
  await deleteDoc(doc(db, "users", userId));
}
```

## Authentication

### Sign Up
```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
  }
}
```

### Sign In
```javascript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
  }
}
```

### Sign Out
```javascript
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

async function logout() {
  await signOut(auth);
}
```

## Cloud Functions

### Create Function
```bash
firebase init functions
cd functions
npm install
```

### Example Function
```javascript
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const userData = snap.data();
    console.log("New user created: ", userData);
    // Custom logic
  });
```

### HTTP Trigger
```javascript
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
```

## Deployment

### Deploy to Firebase
```bash
# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting
```

## Pricing
- **Spark Plan**: Free tier (limited)
- **Blaze Plan**: Pay as you go

## Alternatives Comparison

| Feature | Firebase | Supabase | AWS Amplify |
|---------|----------|----------|-------------|
| Database | Firestore | PostgreSQL | DynamoDB |
| Auth | Built-in | Built-in | Cognito |
| Cost Model | Pay-per-use | Per instance | Pay-per-use |
| Open Source | No | Yes | No |

## When to Use Firebase
- Rapid prototyping
- Real-time applications
- Mobile apps
- Small to medium projects
- Tight integration with Google services

## When to Use Alternatives
- Complex relational data → Supabase
- Large enterprise projects → AWS
- Need open-source → Supabase
- Advanced backend logic → Strapi/Hasura

## Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase Community](https://firebase.community/)

---

## Summary

Firebase is Google's comprehensive BaaS platform perfect for rapid development.

✅ Fast setup  
✅ Real-time database  
✅ Built-in authentication  
✅ Serverless functions  
✅ Excellent for prototyping  

**Ideal for startups and rapid prototyping!**

