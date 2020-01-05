import {async} from '@angular/core/testing';
import {KityBox} from '../lib/model/kity-box';
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



});
