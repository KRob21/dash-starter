import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import {
  doc,
  addDoc,
  collection,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';

import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from '../models/board.model';
import { SnackService } from '../services/snack.service';
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  auth = getAuth();
  firestore = getFirestore();
  colRef = collection(this.firestore, 'boards');

  constructor(private snackService: SnackService) {}

  /** 
  // create a new board  in the 'boards' collection

  */
  async createBoard(data: Board) {
    const user = await this.auth.currentUser;
    const userId = user!.uid;
    console.log('user: ', user);
    const docRef = await addDoc(this.colRef, data).then((data) => {
      const boardId = data.id;
      this.addBoardIdToBoard(boardId, userId);
    });
  }

  /**
   * adds the auto generated board id to the board data model for ease of sorting
   * */

  addBoardIdToBoard(boardId: string, userId: string) {
    const docRef = doc(this.colRef, boardId);
    setDoc(
      docRef,
      {
        board_id: boardId,
        uid: userId,
      },
      { merge: true }
    );
    this.snackService.boardCreationSuccess();
  }
}
