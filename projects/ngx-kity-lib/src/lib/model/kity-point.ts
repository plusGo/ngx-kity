export class KityPoint {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * 使用极坐标创建点
   *
   * @param radius 极坐标中的半径
   * @param angle 极坐标中的角度
   * @param unit 角度使用的单位，默认为 'deg' (角度)，可以取值为 'rad'，表示传入的是弧度值
   */
  public static fromPolar(radius: number, angle: number, unit: 'deg' | 'rad' = 'deg'): KityPoint {
    if (unit !== 'rad') {
      // deg to rad
      angle = angle / 180 * Math.PI;
    }
    return new KityPoint(radius * Math.cos(angle), radius * Math.sin(angle)); // 逆时针
  }

  public static parse(unknown: any): KityPoint {
    if (!unknown) {
      return new KityPoint();
    }
    if (unknown instanceof KityPoint) {
      return unknown;
    }
    if (typeof (unknown) === 'string') {
      return KityPoint.parse(unknown.split(/\s*[\s,]\s*/));
    }
    if ('0' in unknown && '1' in unknown) {
      return new KityPoint(unknown[0], unknown[1]);
    }
  }

  /**
   * 不会修改原有的点，而是产生新的点
   */
  offset(offsetX: number, offsetY: number): KityPoint {
    return new KityPoint(this.x + offsetX, this.y + offsetY);
  }

  valueOf(): [number, number] {
    return [this.x, this.y];
  }

  toString(): string {
    return this.valueOf().join('');
  }

  spof(): KityPoint {
    return new KityPoint((this.x | 0) + 0.5, (this.y | 0) + 0.5);
  }

  round(): KityPoint {
    return new KityPoint((this.x | 0), (this.y | 0));
  }

  isOrigin(): boolean {
    return this.x === 0 && this.y === 0;
  }


}
