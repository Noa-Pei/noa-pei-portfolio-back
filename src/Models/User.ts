class User {
    u_id: number;
    first_name: string;
    surname: string;
    email: string;

  
    constructor(u_id: number, first_name: string, surname: string, email: string) {
      this.u_id = u_id;
      this.first_name = first_name;
      this.surname = surname;
      this.email = email;
    }
  }
  export default User;