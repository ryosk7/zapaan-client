export class Sheet {
  id: number;
  content: string;
  count: number;
  start_time: Date;
  current_time: Date;
  finish_time: Date;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }
}
