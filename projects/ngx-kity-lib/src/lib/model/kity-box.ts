/**
 * 矩形
 */
export class KityBox {
  x: number;
  y: number;
  width: number;
  height: number;
  // 矩形区域的最左侧坐标，等价于 x 的值
  left: number;
  // 矩形区域的最右侧坐标，等价于 x + width 的值
  right: number;
  // 矩形区域的最上侧坐标，等价于 y 的值
  top: number;
  // 矩形区域的最下侧坐标，等价于 y + height 的值
  bottom: number;
  // 矩形区域的中心 x 坐标
  cx: number;
  // 矩形区域的中心 y 坐标
  cy: number;

  public static createFrom(box: KityBox | { [key: string]: number }): KityBox {
    return new KityBox(box.x, box.y, box.width, box.height);
  }

  public static parse(value: any): KityBox {
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value === 'string') {
      return KityBox.parse(value.split(/[\s,]+/).map(parseFloat));
    }
    if (value instanceof Array) {
      return new KityBox(value[0], value[1], value[2], value[3]);
    }
    if ('x' in value) {
      return KityBox.createFrom(value);
    }
    return null;
  }

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    if (width < 0) {
      x -= (width = -width);
    }
    if (height < 0) {
      y -= (height = -height);
    }

    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.left = this.x;
    this.right = this.x + this.width;
    this.top = this.y;
    this.bottom = this.y + this.height;
    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
  }

  /**
   * 获得矩形区域的 x 值域
   */
  getRangeX(): [number, number] {
    return [this.left, this.right];
  }

  /**
   * 获得矩形区域的 y 值域
   */
  getRangeY(): [number, number] {
    return [this.top, this.bottom];
  }

  /**
   * 把当前矩形区域和指定的矩形区域合并，返回一个新的矩形区域（即包含两个源矩形区域的最小矩形区域）
   */
  merge(another: KityBox): KityBox {
    if (this.isEmpty()) {
      return new KityBox(another.x, another.y, another.width, another.height);
    }
    const left = Math.min(this.left, another.left);
    const right = Math.max(this.right, another.right);
    const top = Math.min(this.top, another.top);
    const bottom = Math.max(this.bottom, another.bottom);
    return new KityBox(left, top, right - left, bottom - top);
  }

  /**
   * 求当前矩形区域和指定的矩形区域重叠的矩形区域
   */
  intersect(another: KityBox): KityBox {
    const left = Math.max(this.left, another.left);
    const right = Math.min(this.right, another.right);
    const top = Math.max(this.top, another.top);
    const bottom = Math.min(this.bottom, another.bottom);

    if (left > right || top > bottom) {
      return new KityBox();
    }

    return new KityBox(left, top, right - left, bottom - top);
  }

  /**
   扩展（或收缩）当前的盒子，返回新的盒子
   */
  expand(top: number, right?: number, bottom?: number, left?: number) {
    if (arguments.length < 1) {
      return KityBox.createFrom(this);
    }
    if (arguments.length < 2) {
      right = top;
    }
    if (arguments.length < 3) {
      bottom = top;
    }
    if (arguments.length < 4) {
      left = right;
    }
    const x = this.left - left;
    const y = this.top - top;
    const width = this.width + right + left;
    const height = this.height + top + bottom;
    return new KityBox(x, y, width, height);
  }

  isEmpty(): boolean {
    return !this.width || !this.height;
  }

  toString(): string {
    return this.valueOf().join(' ');
  }

  valueOf(): [number, number, number, number] {
    return [this.x, this.y, this.width, this.height];
  }


}
