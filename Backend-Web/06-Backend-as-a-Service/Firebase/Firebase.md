# Firebase

## Introduction

Firebase is Google's comprehensive Backend-as-a-Service (BaaS) platform that provides a complete suite of tools and services for building web and mobile applications. Launched in 2011 and acquired by Google in 2014, Firebase has become one of the most popular platforms for rapid application development, serving millions of developers worldwide.

Firebase offers a managed backend infrastructure, allowing developers to focus on building great user experiences without worrying about server management, databases, or scaling infrastructure. With its tight integration into the Google Cloud ecosystem, Firebase provides enterprise-grade reliability and performance.

## When to Use Firebase

Firebase is ideal for:
- **Rapid Prototyping**: Build and launch MVPs in days, not weeks
- **Real-Time Applications**: Chat apps, collaborative tools, live dashboards
- **Mobile-First Development**: Native SDKs for iOS, Android, Flutter
- **Serverless Architecture**: No backend code or server management needed
- **Small to Medium Projects**: Fast growth without infrastructure complexity
- **Google Ecosystem**: Leveraging Google Cloud, Analytics, Ads integration

## Core Services

### 1. Firestore (Cloud Firestore)
**Modern NoSQL document database**
- **Document-based**: Store data in JSON-like documents
- **Real-time Sync**: Automatic data synchronization across clients
- **Offline Support**: Local cache with automatic sync when online
- **Scalability**: Automatically scales to millions of users
- **Querying**: Powerful queries with indexing
- **Security Rules**: Declarative security at the database level

### 2. Realtime Database
**Original Firebase database (legacy but still supported)**
- **JSON Tree**: Data stored as one large JSON tree
- **Real-time Sync**: Millisecond latency updates
- **Offline Persistence**: Data available offline
- **Simple Structure**: Easy to understand for beginners
- **Lower Cost**: Cheaper than Firestore for simple use cases

### 3. Authentication
**Complete authentication solution**
- **Email/Password**: Traditional authentication
- **OAuth Providers**: Google, Facebook, Apple, Twitter, GitHub, Microsoft
- **Phone Authentication**: SMS-based verification
- **Anonymous Auth**: Temporary accounts
- **Custom Auth**: Integrate existing auth systems
- **Multi-factor Authentication (MFA)**: Enhanced security

### 4. Cloud Functions
**Serverless backend code**
- **Event-Driven**: Respond to database, auth, storage events
- **HTTP Triggers**: Create REST APIs
- **Scheduled Functions**: Cron-like scheduled tasks
- **Node.js Runtime**: Write in JavaScript/TypeScript
- **Auto-scaling**: Handles any load automatically
- **Google Cloud Integration**: Access to all GCP services

### 5. Cloud Storage
**Object storage for user-generated content**
- **File Upload/Download**: Images, videos, audio, documents
- **Security Rules**: Control access at file level
- **Resumable Uploads**: Handle large files reliably
- **Google Cloud Storage**: Built on GCS infrastructure
- **CDN Integration**: Fast global content delivery
- **Image Processing**: On-the-fly transformations via extensions

### 6. Hosting
**Static site and web app hosting**
- **Global CDN**: Fast content delivery worldwide
- **SSL Certificates**: Automatic HTTPS
- **Custom Domains**: Use your own domain
- **One-Command Deploy**: `firebase deploy`
- **Rollback**: Revert to previous versions easily
- **Preview Channels**: Test changes before production

### 7. Analytics
**App usage and behavior analytics**
- **Unlimited Reporting**: Free unlimited event logging
- **User Properties**: Track custom user attributes
- **Audiences**: Create user segments
- **Integration**: Links to Google Analytics 4
- **Crash Reporting**: Combined with Crashlytics
- **Funnel Analysis**: Track user journeys

### 8. Cloud Messaging (FCM)
**Push notifications and messaging**
- **Cross-Platform**: iOS, Android, Web
- **Targeted Messaging**: Send to specific users or segments
- **Topic Messaging**: Broadcast to subscribed users
- **Scheduled Notifications**: Plan ahead
- **Rich Media**: Images, actions, sounds
- **Analytics Integration**: Track notification engagement

### 9. Crashlytics
**Crash reporting and analytics**
- **Real-time Crash Reports**: Know immediately when app crashes
- **Issue Prioritization**: Identify most impactful crashes
- **Stack Traces**: Detailed debugging information
- **Custom Logging**: Add context to crashes
- **Velocity Alerts**: Get notified of sudden crash spikes

### 10. Performance Monitoring
**App performance insights**
- **Automatic Metrics**: Startup time, network requests
- **Custom Traces**: Measure specific code paths
- **Network Monitoring**: API response times
- **Real User Monitoring**: Actual user experience data

---

## Getting Started

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name
4. Enable/disable Google Analytics
5. Select Analytics account (if enabled)
6. Click "Create Project"

### Step 2: Register Your App
1. In project overview, click platform icon (Web, iOS, Android)
2. Register app with nickname
3. Copy configuration object
4. Add Firebase SDK

### Step 3: Install Firebase SDK

#### Web (JavaScript/TypeScript)
```bash
npm install firebase

# Or with yarn
yarn add firebase
```

#### React Native
```bash
npm install @react-native-firebase/app
```

#### Flutter
```bash
flutter pub add firebase_core
```

#### iOS (Swift)
```bash
pod 'Firebase/Core'
```

#### Android (Kotlin)
```gradle
implementation 'com.google.firebase:firebase-bom:32.7.0'
```

### Step 4: Initialize in Application

#### JavaScript/TypeScript
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

#### React Native
```javascript
import { initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize is automatic with React Native Firebase
export default app;
```

#### Flutter
```dart
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: FirebaseOptions(
      apiKey: "YOUR_API_KEY",
      appId: "YOUR_APP_ID",
      messagingSenderId: "YOUR_SENDER_ID",
      projectId: "YOUR_PROJECT_ID",
    ),
  );
  runApp(MyApp());
}
```

---

## Cloud Firestore (Recommended Database)

### Data Model
Firestore is a NoSQL document database with collections and documents:
```
Collection: users
  ├─ Document: user123
  │   ├─ name: "John Doe"
  │   ├─ email: "john@example.com"
  │   └─ Subcollection: posts
  │       ├─ Document: post1
  │       └─ Document: post2
  └─ Document: user456
```

### Firestore Examples

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
  # Query with Filters
```javascript
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

// Single filter
const q = query(
  collection(db, "posts"),
  where("published", "==", true)
);

// Multiple filters
const advancedQuery = query(
  collection(db, "posts"),
  where("author", "==", userId),
  where("published", "==", true),
  orderBy("createdAt", "desc"),
  limit(10)
);

const querySnapshot = await getDocs(advancedQuery);
const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### Real-time Listeners
```javascript
import { onSnapshot } from "firebase/firestore";

// Listen to document changes
const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
  console.log("Current data: ", doc.data());
});

// Listen to collection changes
const unsubscribeCollection = onSnapshot(
  query(collection(db, "messages"), orderBy("timestamp")),
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New message: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified message: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed message: ", change.doc.data());
      }
    });
  }
);

// Stop listening
unsubscribe();
```

### Batch Writes
```javascript
import { writeBatch, doc } from "firebase/firestore";

const batch = writeBatch(db);

batch.set(doc(db, "users", "user1"), { name: "Alice" });
batch.update(doc(db, "users", "user2"), { status: "active" });
batch.delete(doc(db, "users", "user3"));

await batch.commit();
console.log("Batch write completed");
```

### Transactions
```javascript
import { runTransaction, doc } from "firebase/firestore";

try {
  await runTransaction(db, async (transaction) => {
    const postRef = doc(db, "posts", postId);
    const postDoc = await transaction.get(postRef);
    
    if (!postDoc.exists()) {
      throw new Error("Post does not exist!");
    }
    
    const newLikes = postDoc.data().likes + 1;
    transaction.update(postRef, { likes: newLikes });
  });
  console.log("Transaction successfully committed!");
} catch (e) {
  console.error("Transaction failed: ", e);
}
```

### Pagination
```javascript
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";

//# OAuth Authentication (Google, Facebook, etc.)
```javascript
import { 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider 
} from "firebase/auth";

// Google Sign In (Popup)
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const { user } = await signInWithPopup(auth, googleProvider);

// Google Sign In (Redirect) - better for mobile
await signInWithRedirect(auth, googleProvider);

// Handle redirect result
import { getRedirectResult } from "firebase/auth";
const result = await getRedirectResult(auth);
if (result) {
  const user = result.user;
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
}

// Facebook Sign In
const facebookProvider = new FacebookAuthProvider();
await signInWithPopup(auth, facebookProvider);
# Firestore Triggers
```javascript
// On document create
exports.onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const newUser = snap.data();
    const userId = context.params.userId;
    
    // Send welcome email
// Upload file
const file = event.target.files[0];
const storageRef = ref(storage, `uploads/${userId}/${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  },
  (error) => {
    console.error('Upload error:', error);
  },
  async () => {
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log('File available at:', downloadURL);
  }
);
```

### Download File
```javascript
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const url = await getDownloadURL(ref(storage, 'images/photo.jpg'));
console.log('Download URL:', url);

// Use in img tag
document.getElementById('myImg').src = url;
```

### Delete File
```javascript
import { ref, deleteObject } from "firebase/storage";

const fileRef = ref(storage, 'uploads/file.pdf');
await deleteObject(fileRef);
console.log('File deleted');
```

### List Files
```javascript
import { ref, listAll } from "firebase/storage";

const listRef = ref(storage, 'uploads/');
const result = await listAll(listRef);

result.items.forEach((itemRef) => {
  console.log('File:', itemRef.name);
});

result.prefixes.forEach((folderRef) => {
  console.log('Folder:', folderRef.name);
});
```

### Storage Security Rules
```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Anyone can read
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users can only access their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Only allow image uploads < 5MB
    match /images/{imageId} {
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## Firebase HostreatedAt: admin.firestore.FieldValue.serverTimestamp(),
      role: 'user'
    });
  });

// On document update
exports.onPostUpdate = functions.firestore
  .document('posts/{postId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    
    if (before.published === false && after.published === true) {
      // Post just got published
      console.log('Post published:', context.params.postId);
    }
  });

// On document delete
exports.onUserDelete = functions.firestore
  .document('users/{userId}')
  .onDelete(async (snap, context) => {
    const userId = context.params.userId;
    
    // Clean up user data
    const batch = admin.firestore().batch();
    const posts = await admin.firestore()
      .collection('posts')
      .where('authorId', '==', userId)
      .get();
    
    posts.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  });
```

### Authentication Triggers
```javascript
// On user creation
exports.onUserSignUp = functions.auth.user().onCreate(async (user) => {
  console.log('New user:', user.email);
  
  // Create Firestore profile
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  
  // Send welcome email (using SendGrid, etc.)
});

// On user deletion
exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  console.log('User deleted:', user.uid);
  
  // Clean up user data
  await admin.firestore().collection('users').doc(user.uid).delete();
});
```
# Initialize Hosting
```bash
firebase init hosting

# Select project
# Choose public directory (usually 'build' or 'dist')
# Configure as single-page app? (Yes for React/Vue/Angular)
# Set up GitHub Actions? (Optional)
```

### Deploy
```bash
# Build your app
npm run build
---

## Pricing (2026)

### Spark Plan (Free)
- **Firestore**: 1 GB storage, 50K reads/day, 20K writes/day
- **Realtime Database**: 1 GB storage, 10 GB/mo Hasura |
|---------|----------|----------|-------------|--------|
| **Database** | Firestore (NoSQL) | PostgreSQL (SQL) | DynamoDB (NoSQL) | PostgreSQL/Others |
| **Open Source** | No | Yes | No | Yes |
| **Self-Hosting** | No | Yes | No | Yes |
| **Auth** | Built-in | Built-in | Cognito | Basic |
| **Realtime** | Native | Native | AppSync | Native |
| **Functions** | Cloud Functions | Edge Functions | Lambda | Event Triggers |
| **Cost (Small)** | Free tier friendly | Free tier friendly | Complex pricing | Free tier friendly |
| **Cost (Scale)** | Can get expensive | More predictable | Can get expensive | Moderate |
| **Learning Curve** | Easy | Moderate | Steep | Moderate |
| **Vendor Lock-in** | High | Low | Very High | Low |
| **Mobile SDKs** | Excellent | Good | Excellent | Moderate |
| **Best For** | MVPs, mobile apps | SQL-based apps | AWS ecosystem | GraphQL APIs |

### When to Choose Firebase
✅ Need to ship MVP quickly  
✅ Building mobile-first application  
✅ Want fully managed infrastructure  
✅ Prefer NoSQL document model  
✅ Need Google ecosystem integration (Analytics, Ads, etc.)  
✅ Real-time features are critical  
✅ Small to medium scale projects  

### When to Choose Alternatives
- **Supabase**: Need SQL/PostgreSQL, open-source, self-hosting
- **AWS Amplify**: Already on AWS, complex enterprise requirements
- **Hasura**: GraphQL-first approach, existing PostgreSQL database
- **Strapi**: Need full CMS with custom content types

---

## Troubleshooting Common Issues

### Issue 1: "Permission Denied" Errors
**Solution:**
- Check Firestore/Storage security rules
- Ensure user is authenticated
- Verify RLS policies allow the operation
- Check custom claims if using role-based access

### Issue 2: "Too Many Reads" (Cost)
**Solution:**
- Implement pagination
- Use client-side caching
- Enable offline persistence
- Optimize real-time listeners (narrow down queries)

### Issue 3: "Function Timeout"
**Solution:**
- Increase timeout limit (max 540s)
- Optimize function code
- Use background functions for long tasks
- Break into smaller functions

### Issue 4: "Storage Upload Failed"
**Solution:**
- Check file size limits
- Verify CORS configuration
- Review storage security rules
- Check internet connection

---

## Best Practices

### Security
1. **Always use Security Rules**: Never rely on client-side security
2. **Validate Input**: Check data types and required fields in rules
3. **Principle of Least Privilege**: Grant minimum necessary permissions
4. **Audit Regularly**: Review security rules and user access
5. **Rotate API Keys**: Regenerate keys periodically

### Performance
1. **Denormalize Data**: Optimize for reads, not writes
2. **Use Subcollections**: Keep documents small (<1MB)
3. **Batch Writes**: Group multiple writes together
4. **Index Wisely**: Create indexes for all queries
5. **Monitor Usage**: Use Firebase Console analytics

### Development
1. **Use Emulators**: Test locally before deploying
2. **Version Control**: Store rules files in Git
3. **Environment Variables**: Separate dev/staging/prod configs
4. **Error Handling**: Always handle async errors
5. **Type Safety**: Use TypeScript for better DX

---

## Learning Resources

### Official Resources
- **Website**: <https://firebase.google.com>
- **Documentation**: <https://firebase.google.com/docs>
- **Console**: <https://console.firebase.google.com>
- **YouTube**: <https://youtube.com/firebase>
- **Codelabs**: <https://firebase.google.com/codelabs>

### Community
- **Discord**: Firebase community servers
- **Stack Overflow**: `firebase` tag
- **Reddit**: r/Firebase
- **Twitter**: @Firebase

### Tutorials & Courses
- **Fireship.io**: Quick Firebase tutorials
- **Firebase Blog**: <https://firebase.blog>
- **Google Developers**: Official tutorials and guides

---

## Summary

Firebase is Google's comprehensive BaaS platform that enables rapid application development with minimal backend code.

✅ **Complete backend solution**  
✅ **Real-time synchronization**  
✅ **Scalable infrastructure**  
✅ **Built-in authentication**  
✅ **Serverless functions**  
✅ **Global CDN hosting**  
✅ **Rich mobile SDKs**  
✅ **Google Cloud integration**  

**Perfect for startups, MVPs, and mobile-first applications that need to ship fast!**

---

## References

- **Official Website**: <https://firebase.google.com>
- **Documentation**: <https://firebase.google.com/docs>
- **Firebase Console**: <https://console.firebase.google.com>
- **Community**: <https://firebase.community>
- **GitHub Samples**: <https://github.com/firebase>
- **Status Page**: <https://status.firebase.google.com>
- **Pricing Calculator**: <https://firebase.google.com/pricing>
- **Blog**: <https://firebase.blog>re-x

# Expires after 7 days by default
firebase hosting:channel:deploy preview-feature-x --expires 30d
```

### Rollback
```bash
# View hosting releases
firebase hosting:channel:list

# Rollback to previous version (via Console)
```

---

## Security Rules

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins have full access
    match /admin/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Published posts are public, drafts are private
    match /posts/{postId} {
      allow read: if resource.data.published == true 
                  || request.auth.uid == resource.data.authorId;
      allow create: if request.auth != null 
                    && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Validate data types and required fields
    match /users/{userId} {
      allow create: if request.auth != null
                    && request.resource.data.email is string
                    && request.resource.data.createdAt is timestamp;
    }
  }
}
```

### Realtime Database Security Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "posts": {
      ".read": true,
      "$postId": {
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() === auth.uid)"
      }
    }
  }
}
```

---

## Real-World Use Cases

### 1. Social Media Application
```javascript
// User profiles with posts and followers
const createPost = async (userId, content, imageFile) => {
  // Upload image to Storage
  const imageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
  await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(imageRef);
  
  // Create post in Firestore
  const postRef = await addDoc(collection(db, 'posts'), {
    authorId: userId,
    content,
    imageUrl,
    likes: 0,
    comments: 0,
    createdAt: serverTimestamp()
  });
  
  // Update user's post count
  await updateDoc(doc(db, 'users', userId), {
    postCount: increment(1)
  });
  
  return postRef.id;
};

// Real-time feed subscription
const subscribeTofeed = (callback) => {
  const q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );
  
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(posts);
  });
};
```

### 2. Real-Time Chat Application
```javascript
// Send message
const sendMessage = async (roomId, userId, text) => {
  await addDoc(collection(db, 'rooms', roomId, 'messages'), {
    userId,
    text,
    timestamp: serverTimestamp()
  });
  
  // Update room's last message
  await updateDoc(doc(db, 'rooms', roomId), {
    lastMessage: text,
    lastMessageTime: serverTimestamp()
  });
};

// Subscribe to messages
const subscribeToMessages = (roomId, callback) => {
  const q = query(
    collection(db, 'rooms', roomId, 'messages'),
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};
```

### 3. E-Commerce Platform
```javascript
// Cloud Function: Process order
exports.processOrder = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const order = snap.data();
    
    // Decrease inventory
    const batch = admin.firestore().batch();
    
    for (const item of order.items) {
      const productRef = admin.firestore().collection('products').doc(item.productId);
      batch.update(productRef, {
        stock: admin.firestore.FieldValue.increment(-item.quantity)
      });
    }
    
    await batch.commit();
    
    // Send confirmation email (using SendGrid extension)
    await admin.firestore().collection('mail').add({
      to: order.customerEmail,
      template: {
        name: 'orderConfirmation',
        data: { orderId: context.params.orderId, ...order }
      }
    });
    
    // Create Stripe payment intent
    const stripe = require('stripe')(functions.config().stripe.secret);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.total * 100,
      currency: 'usd',
      metadata: { orderId: context.params.orderId }
    });
    
    await snap.ref.update({ paymentIntentId: paymentIntent.id });
  });
```

### 4. Task Management / Project Collaboration
```javascript
// Create project with real-time updates
const createProject = async (name, members) => {
  const projectRef = await addDoc(collection(db, 'projects'), {
    name,
    createdAt: serverTimestamp(),
    members: members // Array of user IDs
  });
  
  // Add each member to project
  const batch = writeBatch(db);
  members.forEach(memberId => {
    const memberRef = doc(db, 'projects', projectRef.id, 'members', memberId);
    batch.set(memberRef, {
      role: 'member',
      joinedAt: serverTimestamp()
    });
  });
  await batch.commit();
  
  return projectRef.id;
};

// Real-time task updates
const subscribeToTasks = (projectId, callback) => {
  const q = query(
    collection(db, 'projects', projectId, 'tasks'),
    where('status', '!=', 'completed'),
    orderBy('status'),
    orderBy('priority', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};
```

---

## Firebase Extensions

Pre-built solutions you can install with one click:

### Popular Extensions
1. **Delete User Data**: Automatically delete user data when account is deleted
2. **Resize Images**: Automatically resize images on upload
3. **Trigger Email**: Send emails via SendGrid, Mailchimp, etc.
4. **Translate Text**: Auto-translate with Google Cloud Translation
5. **Export Collections to BigQuery**: Sync Firestore to BigQuery for analytics
6. **Stripe Payments**: Handle subscriptions and payments
7. **Algolia Search**: Add full-text search to Firestore

### Install Extension
```bash
firebase ext:install extension-name

# Example: Install Resize Images extension
firebase ext:install storage-resize-images
```

---

## Performance Optimization

### Best Practices
1. **Index Optimization**: Create composite indexes for complex queries
2. **Pagination**: Always paginate large datasets
3. **Denormalization**: Duplicate data to avoid JOINs
4. **Batch Operations**: Use batch writes for multiple updates
5. **Offline Persistence**: Enable for better UX
6. **Connection Pooling**: Reuse database connections

### Enable Offline Persistence
```javascript
import { enableIndexedDbPersistence } from "firebase/firestore";

try {
  await enableIndexedDbPersistence(db);
  console.log('Offline persistence enabled');
} catch (err) {
  if (err.code === 'failed-precondition') {
    console.error('Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.error('Browser not supported');
  }
}
```

### Caching Strategy
```javascript
import { getDocFromCache, getDocFromServer } from "firebase/firestore";

try {
  // Try cache first
  const doc = await getDocFromCache(docRef);
  console.log('From cache:', doc.data());
} catch (e) {
  // Fallback to server
  const doc = await getDocFromServer(docRef);
  console.log('From server:', doc.data());
}
```

---

## Migration & Backup

### Export Firestore Data
```bash
# Using gcloud CLI
gcloud firestore export gs://your-bucket-name

# Import
gcloud firestore import gs://your-bucket-name/backup-folder
```

### Backup Strategy
1. **Automated Daily Backups**: Use Cloud Scheduler + Cloud Functions
2. **Export to BigQuery**: Use Firestore extension for continuous sync
3. **Versioned Backups**: Keep multiple backup versions

### Migrate from Other Platforms
```javascript
// Example: Import from MongoDB to Firestore
const batch = writeBatch(db);

mongoData.forEach((doc) => {
  const firestoreRef = doc(db, 'collection', doc._id.toString());
  batch.set(firestoreRef, {
    ...doc,
    createdAt: Timestamp.fromDate(new Date(doc.createdAt))
  });
});

await batch.commit();
```

---

## Cost Optimization Tips

1. **Use Firestore Wisely**: Minimize reads with caching
2. **Optimize Queries**: Fetch only needed fields  
3. **Delete Unused Data**: Clean up old logs and temporary data
4. **Use Functions Efficiently**: Reduce cold starts, optimize memory
5. **Compress Storage**: Resize images before upload
6. **Monitor Usage**: Set budget alerts in Google Cloud Console

---

## Deploymente.log('Creating thumbnail...');
  }
});

exports.onFileDelete = functions.storage.object().onDelete(async (object) => {
  console.log('File deleted:', object.name);
});
```

### Scheduled Functions (Cron)
```javascript
// Run every day at midnight
exports.dailyCleanup = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    console.log('Running daily cleanup...');
    
    // Delete old logs
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    
    const snapshot = await admin.firestore()
      .collection('logs')
      .where('createdAt', '<', cutoff)
      .get();
    
    const batch = admin.firestore().batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    
    console.log(`Deleted ${snapshot.size} old logs`);
  });
```

### Callable Functions (Client-friendly)
```javascript
// Server-side
exports.addAdminRole = functions.https.onCall(async (data, context) => {
  // Check auth
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }
  
  // Check admin status
  if (!context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Must be admin');
  }
  
  // Add admin claim
  await admin.auth().setCustomUserClaims(data.userId, { admin: true });
  
  return { message: 'Admin role granted' };
});

// Client-side
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const addAdminRole = httpsCallable(functions, 'addAdminRole');

try {
  const result = await addAdminRole({ userId: 'user123' });
  console.log(result.data.message);
} catch (error) {
  console.error(error.message);
}
```

### Deploy Functions
```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:helloWorld

# View logs
firebase functions:log

# Delete function
firebase functions:delete functionName
```

---

## Cloud Storage
// GitHub Sign In
const githubProvider = new GithubAuthProvider();
await signInWithPopup(auth, githubProvider);
```

### Phone Authentication
```javascript
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential 
} from "firebase/auth";

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha-container',
  { size: 'invisible' },
  auth
);

// Send verification code
const confirmationResult = await signInWithPhoneNumber(
  auth,
  '+1234567890',
  window.recaptchaVerifier
);

// User enters the code
const code = window.prompt('Enter verification code:');
const result = await confirmationResult.confirm(code);
const user = result.user;
```

### Anonymous Authentication
```javascript
import { signInAnonymously } from "firebase/auth";

const { user } = await signInAnonymously(auth);
console.log('Anonymous user ID:', user.uid);

// Convert anonymous to permanent account
import { linkWithCredential, EmailAuthProvider } from "firebase/auth";

const credential = EmailAuthProvider.credential(email, password);
await linkWithCredential(user, credential);
```

### Email Verification
```javascript
import { sendEmailVerification } from "firebase/auth";

// Send verification email
await sendEmailVerification(auth.currentUser);

// Check if email is verified
if (auth.currentUser.emailVerified) {
  console.log('Email is verified');
}
```

### Password Reset
```javascript
import { sendPasswordResetEmail } from "firebase/auth";

await sendPasswordResetEmail(auth, 'user@example.com');
console.log('Password reset email sent');
```

### Update Profile
```javascript
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

// Update display name and photo
await updateProfile(auth.currentUser, {
  displayName: "John Doe",
  photoURL: "https://example.com/photo.jpg"
});

// Update email
await updateEmail(auth.currentUser, "newemail@example.com");

// Update password
await updatePassword(auth.currentUser, "newSecurePassword123");
```

### Delete Account
```javascript
import { deleteUser } from "firebase/auth";

await deleteUser(auth.currentUser);
```

### Custom Claims (Admin SDK)
```javascript
// Server-side (Cloud Functions or Admin SDK)
const admin = require('firebase-admin');

// Set custom user claims
await admin.auth().setCustomUserClaims(uid, { admin: true });

// Client-side: Access custom claims
const idTokenResult = await auth.currentUser.getIdTokenResult();
if (idTokenResult.claims.admin) {
  console.log('User is an admin');
}
```

---

## First page
const first = query(collection(db, "posts"), orderBy("createdAt"), limit(10));
const documentSnapshots = await getDocs(first);
const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

// Next page
const next = query(
  collection(db, "posts"),
  orderBy("createdAt"),
  startAfter(lastVisible),
  limit(10)
);
const nextSnapshot = await getDocs(next);
```

### Compound Queries
```javascript
// Requires composite index
const q = query(
  collection(db, "posts"),
  where("status", "==", "published"),
  where("category", "==", "tech"),
  orderBy("views", "desc"),
  limit(5)
);

// Firebase will prompt you to create the index via console
```

### Array Operations
```javascript
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Add item to array
await updateDoc(doc(db, "users", userId), {
  favoriteColors: arrayUnion("blue")
});

// Remove item from array
await updateDoc(doc(db, "users", userId), {
  favoriteColors: arrayRemove("red")
});
```

### Increment/Decrement
```javascript
import { updateDoc, increment } from "firebase/firestore";

// Increment counter
await updateDoc(doc(db, "posts", postId), {
  views: increment(1)
});

// Decrement
await updateDoc(doc(db, "products", productId), {
  stock: increment(-1)
});
```

---

##  console.log("Document written with ID: ", docRef.id);
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

