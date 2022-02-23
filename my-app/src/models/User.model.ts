import { Data } from './Data.model';
import { Support } from './Support.model';

export class User {
  data: Data;
  support: Support;

  constructor() {
    this.data = new Data();
    this.support = new Support();
  }
}