import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import states from '../../assets/data/states.json';

interface Response {
  data: any;
}

@Injectable()
export class DataService {
  constructor() {}
}

/*
 * Get content for state select box
 */
function getStates() {
  return states;
}
