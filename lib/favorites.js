/* 
  Filename: favorites.js
  Note: Classic wrapper for writing, deleting and fetching data from firestore collection
  taken from our group project "GymBuddy"
*/

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getFavorites(email) {
  const docRef = doc(db, "favorites", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().items || [] : [];
}

export async function saveFavorite(email, favorite) {
  const docRef = doc(db, "favorites", email);
  const docSnap = await getDoc(docRef);
  const existingItems = docSnap.exists() ? docSnap.data().items || [] : [];

  const alreadyExists = existingItems.find((item) => item.id === favorite.id);
  if (alreadyExists) return;

  await setDoc(
    docRef,
    { items: [...existingItems, favorite] },
    { merge: true }
  );
}

export async function deleteFavorite(email, id) {
  const docRef = doc(db, "favorites", email);
  const docSnap = await getDoc(docRef);
  const existingItems = docSnap.exists() ? docSnap.data().items || [] : [];

  const updatedItems = existingItems.filter((item) => item.id !== id);
  await setDoc(docRef, { items: updatedItems }, { merge: true });
}
