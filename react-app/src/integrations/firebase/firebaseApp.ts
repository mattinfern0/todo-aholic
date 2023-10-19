import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseConfig } from "./config.ts";

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

let currentUser: User | null = null;

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    currentUser = user;
  } else {
    currentUser = null;
  }
});

export const getIdToken = async (): Promise<string | null> => {
  return (await currentUser?.getIdToken()) ?? null;
};
