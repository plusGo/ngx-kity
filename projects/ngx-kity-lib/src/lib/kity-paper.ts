declare const kity: any;

/**
 * 画布
 */
export class KityPaper {
  private paper: any;

  constructor(selector: string | any) {
    if (!kity) {
      throw new Error('you must import kity.js');
    }
    this.paper = new kity.Paper(selector);
  }

  put<T>(el: T): T {
    debugger
    return this.paper.put(el);
  }
}
