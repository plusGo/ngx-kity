import {async} from '@angular/core/testing';
import {KityMatrix} from '../../lib/model/kity-matrix';
import {KityPoint} from '../../lib/model/kity-point';


describe('KityMatrix Test', () => {

  beforeEach(async(() => {

  }));

  beforeEach(() => {

  });

  it('should create KityMatrix', () => {
    const matrix = new KityMatrix();
    expect(matrix).toEqual(new KityMatrix(1, 0, 0, 1, 0, 0));

    const matrix2 = KityMatrix.createFrom(matrix);
    expect(matrix2).toEqual(new KityMatrix(1, 0, 0, 1, 0, 0));

  });

  it('should mergeMatrixData', () => {
    const matrix = new KityMatrix();
    const matrix2 = KityMatrix.createFrom(matrix);

    expect(KityMatrix.mergeMatrixData(matrix.m, matrix2.m)).toEqual(new KityMatrix(1, 0, 0, 1, 0, 0).m);
  });

  it('should parse', () => {
    const source = [1, 1, 1, 1, 1, 1];
    const kityMatrix = KityMatrix.parse(source);
    expect(kityMatrix).toEqual(new KityMatrix(1, 1, 1, 1, 1, 1));
    // todo 测试正则解析
  });

  it('should transformPoint', () => {
    const kityPoint = KityMatrix.transformPoint(0, 0, {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1});
    expect(kityPoint).toEqual(new KityPoint(1, 1));
  });

  it('should clone', () => {
    const kityMatrix = new KityMatrix();
    const kityMatrix1 = kityMatrix.clone();
    expect(kityMatrix === kityMatrix1).toBeFalsy();
    expect(kityMatrix1).toEqual(kityMatrix);
  });

  it('should set matrix', () => {
    const matrix = new KityMatrix().setMatrix(2, 2, 2, 2, 2, 2);
    expect(matrix).toEqual(new KityMatrix(2, 2, 2, 2, 2, 2));
  });

  it('should translate', () => {
    const kityMatrix = new KityMatrix();

    const calcResult = KityMatrix.mergeMatrixData(kityMatrix.m, {
      a: 1,
      c: 0,
      e: 2,
      b: 0,
      d: 1,
      f: 2
    });
    const $expect = new KityMatrix();
    $expect.m = calcResult;

    const matrix = kityMatrix.translate(2, 2);
    expect(matrix).toBe(kityMatrix);
    expect(matrix).toEqual($expect);
  });

  it('should get matrix', () => {
    const kityMatrix = new KityMatrix();
    expect(kityMatrix.m === kityMatrix.getMatrix()).toBeFalsy();
    expect(kityMatrix.m).toEqual(kityMatrix.getMatrix());
  });


});
