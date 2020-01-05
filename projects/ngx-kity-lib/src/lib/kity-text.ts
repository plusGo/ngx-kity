declare const kity: any;

/**
 * 矩形
 */
export class KityText {
  private rect: KityText;

  constructor() {
    if (!kity) {
      throw new Error('you must import kity.js');
    }
    this.rect = new kity.Text();
  }

  setContent(content: any): void {
    this.rect.setContent(content);
  }

  setX(x: number): void {
    this.rect.setX(x);
  }

  setY(y: number): void {
    this.rect.setX(y);
  }

  fill(color: string): void {
    this.rect.fill(color);
  }

  getBoundaryBoX(): any {
    this.rect.getBoundaryBoX();
  }
}
