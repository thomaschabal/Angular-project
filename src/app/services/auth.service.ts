export class AuthService {
  isAuth = true;

  signIn(){
    this.isAuth = true;
    //return new Promise (
      //(resolve, reject) => {
        //setTimeout(
          //() => {
            //this.isAuth=true;
            //resolve(true);
          //}, 500
        //);
      //}
    //);
  }

  signOut() {
    this.isAuth = false;
  }

}
