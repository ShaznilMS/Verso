import { ref, getDatabase, push, get, limitToFirst, query } from "firebase/database";
import { app } from "./configs/firebase.config.mjs";

console.log('Get database!');

const db = getDatabase(app)

// for (let i = 0; i <= 14; i++) {
//     console.log('Make:',i);
//     const reference = ref(db, 'publication/' + i)
//     update(reference, { STATUS: 'Initial', DATE_TIME: '21/07/2024', CATEGORY: 'Filosofica', QUOTE: "" })
//         .then(() => {
//             console.log('Then');
//         })
//         .catch((error) => {
//             console.log('Error');
//         })
//         .finally(() => {
//             console.log('Finally');
//         })
// }
const tm = new Date()
const reference_comment = ref(db, 'publication/16/COMMENTARY')

function Push() {
    push(reference_comment, { Name: 'Shaznil Mussagy Sulemane', Time: (tm.getUTCFullYear(), tm.getUTCMonth(), tm.getUTCDay()), Comment: 'Opah mo chapa' })
        .then(() => {
            console.log('Then');
        })
}

function Get() {

    const limitedQuery = query(reference_comment, limitToFirst(1));
    
    get(limitedQuery)
        .then((value) => {
            console.log(value.val());
        })
        .catch((error) => {
            console.log(error.code);
        })
        .finally(() => {
            console.log('Finally!');
        })
}

Get()