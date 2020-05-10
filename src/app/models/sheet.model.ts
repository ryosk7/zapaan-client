export class Sheet {
  id: number;
  content: string;
  count: number;
  start_time: string;
  current_time: string;
  finish_time: string;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

  isFirstGoOnSheet(): boolean {
    let isFirstTime = false;
    const startTime = this.changeStringDateTimeToDateType(this.start_time);
    if (startTime.getHours() == 0 && startTime.getSeconds() == 0) {
      isFirstTime = true;
    }
    return isFirstTime;
  }

  changeStringDateTimeToDateType(stringDate: string): Date {
    let milliSeconds = Date.parse(stringDate);
    let date = new Date(milliSeconds)
    // FIXME: サーバー側でやりたい
    // 9時間戻す
    milliSeconds = date.setHours(date.getHours() - 9);
    return date = new Date(milliSeconds);
  }
}
