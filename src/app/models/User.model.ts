export class User {
  constructor(public firstname: string,
              public lastname: string,
              public email: string,
              public promotion: string,
              public password: string,
              // tslint:disable-next-line: variable-name
              public confirmation_password: string) {}
}
