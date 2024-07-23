// import { ref, getDatabase, push, get, query, limitToFirst } from "firebase/database";
// import { app } from "./configs/firebase.config.mjs";

// console.log('Get database!');

// const db = getDatabase(app);

// // Function to get a limited number of random comments
// function GetRandom(limit) {
//     const reference_comment = ref(db, 'publication/');

//     // Fetch all comments
//     get(reference_comment)
//         .then((snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const keys = Object.keys(data);
//                 const randomKeys = keys.sort(() => 0.5 - Math.random()).slice(0, limit);
//                 const randomItems = randomKeys.map(key => data[key]);

//                 console.log('Random items:', randomItems.length);
//             } else {
//                 console.log('No data available');
//             }
//         })
//         .catch((error) => {
//             console.log('Error:', error.code);
//         })
//         .finally(() => {
//             console.log('Finally!');
//         });
// }

// // Example usage: Get 10 random comments
// GetRandom(10);