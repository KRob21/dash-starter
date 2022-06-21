import { Component, OnInit } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import {
  query,
  where,
  collection,
  collectionChanges,
  CollectionReference,
  getFirestore,
  collectionData,
  getDocs,
  DocumentChange,
  onSnapshot,
} from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  db = getFirestore();
  user$!: Observable<User | null>;
  regMembers: any[] = [];
  qList: any[] = [];
  colRef = collection(this.db, 'members');
  constructor(auth: Auth) {
    this.user$ = user(auth);

    // getDocs(this.colRef).then((snapshot) => {
    //   snapshot.docs.forEach((doc) => {
    //     this.regMembers.push({ ...doc.data(), id: doc.id });
    //   });
    // });

    const q = query(this.colRef, orderBy('created', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as Member;
        if (change.type === 'added') {
          const member = {
            ...data,
            id: change.doc.id,
          };
          console.log('New member: ', change.doc.data());
          this.regMembers.splice(change.newIndex, 0, member);
        }
        if (change.type === 'modified') {
          console.log('Modified member: ', change.doc.data());
          if (change.newIndex === change.oldIndex) {
            this.regMembers[change.oldIndex] = {
              ...data,
              id: change.doc.id,
            };
          } else {
            this.regMembers.splice(change.oldIndex, 1);
            this.regMembers.splice(change.newIndex, 0, {
              ...data,
              id: change.doc.id,
            });
          }
        }
        if (change.type === 'removed') {
          console.log('Removed member: ', change.doc.data());
          this.regMembers.splice(change.oldIndex, 1);
        }
      });
    });
    // unsubscribe();
    console.log(this.regMembers);
  }

  ngOnInit(): void {
    console.log(this.regMembers);
  }
}
