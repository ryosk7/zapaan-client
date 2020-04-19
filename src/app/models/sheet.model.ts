export class Sheet {
  id: number;
  content: string;
  time: Date;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }
}
