export class Data  {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

  constructor() {
    this.email = '';
    this.first_name = '';
    this.last_name = '';
    this.avatar = '';
  }
}