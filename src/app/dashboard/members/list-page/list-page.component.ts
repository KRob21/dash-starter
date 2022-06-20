import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';
import {
  query,
  where,
  limit,
  getDocs,
  collection,
  doc,
} from 'firebase/firestore';

@Component({
  selector: 'member-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  // Collection/doc ref
  firestore = getFirestore();
  collectionRef = collection(this.firestore, 'members');

  members: any;
  constructor() {}
  getCollectionDocs = async () => {
    const collectionQuery = query(this.collectionRef, limit(25));
    const querySnapshot = await getDocs(collectionQuery);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);
      this.members.push(data);
    });
  };
  ngOnInit(): void {}
}
