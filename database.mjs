import { update, ref, getDatabase } from "firebase/database";
import { app } from "./configs/firebase.config.mjs";

console.log('Get database!');

const db = getDatabase(app)

for (let i = 0; i <= 14; i++) {
    console.log('Make:',i);
    const reference = ref(db, 'publication/' + i)
    update(reference, { STATUS: 'Initial', DATE_TIME: '21/07/2024', CATEGORY: 'Filosofica' })
        .then(() => {
            console.log('Then');
        })
        .catch((error) => {
            console.log('Error');
        })
        .finally(() => {
            console.log('Finally');
        })
}