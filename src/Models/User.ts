class User {
    u_id: number;
    first_name: string;
    surname: string;

  
    constructor(u_id: number, first_name: string, surname: string) {
      this.u_id = u_id;
      this.first_name = first_name;
      this.surname = surname;
    }
  }
  export default User;