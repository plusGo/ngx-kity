declare const kity: any;

/**
 * 矩形
 */
export class KityRect {
  private rect: KityRect;

  constructor() {
    if (!kity) {
      throw new Error('you must import kity.js');
    }
    this.rect = new kity.Rect();
  }

  setBox(box: any): void {
    this.rect.setBox(box);
  }

  setRadius(radius: number): void {
    this.rect.setRadius(radius);
  }

  fill(color: string): void {
    this.rect.fill(color);
  }
}
