import {async} from '@angular/core/testing';
import {KityMatrix} from '../lib/model/kity-matrix';


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


});
