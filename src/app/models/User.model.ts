export class User {
  constructor(public firstname: string,
              public lastname: string,
              public email: string,
              public promotion: string,
              public password: string,
              // @ts-ignore
              public confirmation_password: string) {}
}
