const db = firebase.firestore();

export const users = db.collection('users');
export const produtos = db.collection('produtos');
export const contato = db.collection('contato');
