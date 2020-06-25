export class User {
  id: number;
  name: string;
  nickname: string;
  image: string;
  email: string;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

  getName(): string {
    return this.name;
  }

  setName(nickname: string): void {
    this.nickname = nickname;
  }

  getImage(): string {
    return this.image;
  }

  getEmail(): string {
    return this.email;
  }
}
