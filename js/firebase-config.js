// js/firebase-config.js
// BUNU KENDİ BİLGİLERİNLE DEĞİŞTİR!

const firebaseConfig = {
    apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "gundemx-news.firebaseapp.com",
    databaseURL: "https://gundemx-news-default-rtdb.firebaseio.com",
    projectId: "gundemx-news",
    storageBucket: "gundemx-news.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const haberlerRef = database.ref('haberler');

// Cloudinary Config (Resim upload için)
const CLOUDINARY_CLOUD_NAME = 'senin-cloud-adin'; // DEĞİŞTİR!
const CLOUDINARY_UPLOAD_PRESET = 'gundemx_upload'; // DEĞİŞTİR!

