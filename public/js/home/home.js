import { users } from '../services/service.js'

users.get().then(snapshot => {

    console.log(snapshot.docs)
    console.log(user.uid);


});

