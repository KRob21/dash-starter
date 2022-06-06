import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  auth = getAuth();
  db = getFirestore();

  constructor() {}

  // * collection reference

  async createBoard(data: Board) {
    const user = await this.auth.currentUser;
    const colRef = collection(this.db, 'boards');
    return addDoc(colRef, data).then(() => {
      console.log('then is done.');
    });
  }
}
