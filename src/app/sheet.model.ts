export class Sheet {
  id: number;
  title: string;
  create_by: number;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }
}
