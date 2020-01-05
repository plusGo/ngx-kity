// import {KityPoint} from './kity-point';
//
// export interface KityMatrixValue {
//   a: number;
//   b: number;
//   c: number;
//   d: number;
//   e: number;
//   f: number;
// }
//
// /**
//  * 矩阵计算类
//  */
// export class KityMatrix {
//   public static mPattern = /matrix\s*\((.+)\)/i;
//
//   m: KityMatrixValue;
//
//   constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, e: number = 0, f: number = 0) {
//     this.setMatrix(a, b, c, d, e, f);
//   }
//
//   // 注意，合并的结果是先执行m2，再执行m1的结果
//   public static mergeMatrixData(m2: KityMatrixValue, m1: KityMatrixValue): KityMatrixValue {
//     return {
//       a: m1.a * m2.a + m1.c * m2.b,
//       b: m1.b * m2.a + m1.d * m2.b,
//       c: m1.a * m2.c + m1.c * m2.d,
//       d: m1.b * m2.c + m1.d * m2.d,
//       e: m1.a * m2.e + m1.c * m2.f + m1.e,
//       f: m1.b * m2.e + m1.d * m2.f + m1.f
//     };
//   }
//
//   public static d2r(deg: number) {
//     return deg * Math.PI / 180;
//   }
//
//   /**
//    * 用于解析数据转换为KityMatrix
//    *
//    */
//   public static parse(str: string | number[]) {
//     let match;
//     if (str instanceof Array) {
//       return new KityMatrix(str[0], str[1], str[2], str[3], str[4], str[5]);
//     }
//     match = KityMatrix.mPattern.exec(str);
//     if (match) {
//       let values = match[1].split(',');
//       if (values.length !== 6) {
//         values = match[1].split(' '); // ie
//       }
//       return new KityMatrix(
//         parseFloat(values[0]),
//         parseFloat(values[1]),
//         parseFloat(values[2]),
//         parseFloat(values[3]),
//         parseFloat(values[4]),
//         parseFloat(values[5]),
//       );
//     }
//     return new KityMatrix();
//   }
//
//
//   public static transformPoint(x: number, y: number, m: KityMatrixValue) {
//     if (typeof y === 'object') {
//       m = y;
//       y = (x as any).y;
//       x = (x as any).x;
//     }
//     return new KityPoint(
//       m.a * x + m.c * y + m.e,
//       m.b * x + m.d * y + m.f
//     );
//   }
//
//   public static transformBox(box, matrix) {
//     let xMin = Number.MAX_VALUE;
//     let xMax = -Number.MAX_VALUE;
//     let yMin = Number.MAX_VALUE;
//     let yMax = -Number.MAX_VALUE;
//     const bps = [
//       [box.x, box.y],
//       [box.x + box.width, box.y],
//       [box.x, box.y + box.height],
//       [box.x + box.width, box.y + box.height]
//     ];
//     let bp;
//     let rp;
//     const rps = [];
//     bp = bps.pop()
//     while (bp) {
//       rp = KityMatrix.transformPoint(bp[0], bp[1], matrix);
//       rps.push(rp);
//       xMin = Math.min(xMin, rp.x);
//       xMax = Math.max(xMax, rp.x);
//       yMin = Math.min(yMin, rp.y);
//       yMax = Math.max(yMax, rp.y);
//     }
//     box = new Box({
//       x: xMin,
//       y: yMin,
//       width: xMax - xMin,
//       height: yMax - yMin
//     });
//     utils.extend(box, {
//       closurePoints: rps
//     });
//     return box;
//   };
//
//   setMatrix(a: number, b: number, c: number, d: number, e: number, f: number): KityMatrix {
//     this.m = {a, b, c, d, e, f};
//     return this;
//   }
//
//   translate(x, y): KityMatrix {
//     this.m = KityMatrix.mergeMatrixData(this.m, {
//       a: 1,
//       c: 0,
//       e: x,
//       b: 0,
//       d: 1,
//       f: y
//     });
//     return this;
//   }
//
//   rotate(deg: number): KityMatrix {
//     const rad = KityMatrix.d2r(deg);
//     const sin = Math.sin(rad);
//     const cos = Math.cos(rad);
//     this.m = KityMatrix.mergeMatrixData(this.m, {
//       a: cos,
//       c: -sin,
//       e: 0,
//       b: sin,
//       d: cos,
//       f: 0
//     });
//     return this;
//   }
//
//   scale(sx: number, sy: number): KityMatrix {
//     if (sy === undefined) {
//       sy = sx;
//     }
//     this.m = KityMatrix.mergeMatrixData(this.m, {
//       a: sx,
//       c: 0,
//       e: 0,
//       b: 0,
//       d: sy,
//       f: 0
//     });
//     return this;
//   }
//
//   /**
//    * 倾斜
//    */
//   skew(degX: number, degY: number): KityMatrix {
//     if (degY === undefined) {
//       degY = degX;
//     }
//     const tx = Math.tan(KityMatrix.d2r(degX));
//     const ty = Math.tan(KityMatrix.d2r(degY));
//     this.m = KityMatrix.mergeMatrixData(this.m, {
//       a: 1,
//       c: tx,
//       e: 0,
//       b: ty,
//       d: 1,
//       f: 0
//     });
//     return this;
//   }
//
//   /**
//    * 获得反转矩阵
//    *
//    * 这是我解方程算出来的
//    */
//   inverse() {
//     const m = this.m;
//     const a = m.a;
//     const b = m.b;
//     const c = m.c;
//     const d = m.d;
//     const e = m.e;
//     const f = m.f;
//     let k;
//     let aa;
//     let bb;
//     let cc;
//     let dd;
//     let ee;
//     let ff;
//     k = a * d - b * c;
//     aa = d / k;
//     bb = -b / k;
//     cc = -c / k;
//     dd = a / k;
//     ee = (c * f - e * d) / k;
//     ff = (b * e - a * f) / k;
//     return new KityMatrix(aa, bb, cc, dd, ee, ff);
//   }
//
//   getMatrix(): KityMatrixValue {
//     return Object.assign({}, this.m);
//   }
//
//   getTranslate(): { x: number, y: number } {
//     const m = this.m;
//     return {
//       x: m.e / m.a,
//       y: m.f / m.d
//     };
//   }
//
//   mergeMatrix(matrix: KityMatrix) {
//     return new KityMatrix(KityMatrix.mergeMatrixData(this.m, matrix.m) as any);
//   }
//
//   merge(matrix: KityMatrix) {
//     return this.mergeMatrix(matrix);
//   }
//
//   valueOf(): [number, number, number, number, number, number] {
//     const m = this.m;
//     return [m.a, m.b, m.c, m.d, m.e, m.f];
//   }
//
//   toString() {
//     return this.valueOf().join(' ');
//   }
//
//   equals(matrix): boolean {
//     const m1 = this.m;
//     const m2 = matrix.m;
//     return m1.a === m2.a &&
//       m1.b === m2.b &&
//       m1.c === m2.c &&
//       m1.d === m2.d &&
//       m1.e === m2.e &&
//       m1.f === m2.f;
//   }
//
//   transformPoint() {
//     // todo
//     return this.transformPoint.apply(null, [].slice.call(arguments).concat([this.m]));
//   }
//
//   transformBox(box) {
//     return Matrix.transformBox(box, this.m);
//   }
//
// }
