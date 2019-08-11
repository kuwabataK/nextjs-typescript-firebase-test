import firebase from 'firebase/app'
import 'firebase/auth'

try {
    const config = {
        apiKey: "AIzaSyBUmCuf36CPTI6HGfPoN1qCRRr7fJWTIAI",
        authDomain: "fire-base-test-3f82a.firebaseapp.com",
        databaseURL: "https://fire-base-test-3f82a.firebaseio.com",
        projectId: "fire-base-test-3f82a",
        storageBucket: "",
        messagingSenderId: "302476652530",
        appId: "1:302476652530:web:18bb3b188483201b"
    };

    firebase.initializeApp(config)
} catch (e) {
    console.log(e)
}

export default firebase