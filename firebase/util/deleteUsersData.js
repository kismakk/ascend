import { COLLECTION } from '../../constants/collections';
import {
  firestore,
  auth,
  collection,
  query,
  getDocs,
  deleteDoc,
  where,
  doc,
  deleteUser,
} from '../config';

const deleteUsersData = async (userId) => {
  try {
    const todoQuery = query(
      collection(firestore, COLLECTION.TODOS),
      where('userId', '==', userId)
    );

    const habitQuery = query(
      collection(firestore, COLLECTION.HABITS),
      where('userId', '==', userId)
    );

    const todoSnapshot = await getDocs(todoQuery);
    const habitSnapshot = await getDocs(habitQuery);

    const todoData = todoSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const habitData = habitSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    todoData.forEach((todo) => {
      const docRef = doc(firestore, COLLECTION.TODOS, todo.id);
      deleteDoc(docRef);
    });

    habitData.forEach((habit) => {
      const docRef = doc(firestore, COLLECTION.HABITS, habit.id);
      deleteDoc(docRef);
    });
    //Tähän pitäisi tehdä uudelleenkirjautuminen, että voi poistaa käyttäjän.
    deleteUserData();
  } catch (e) {
    console.log(e);
  }
};

const deleteUserData = () => {
  const user = auth.currentUser;

  deleteUser(user)
    .then(() => {
      console.log('User deleted succesfully');
    })
    .catch((error) => {
      console.error(error);
    });
};

export default deleteUsersData;
