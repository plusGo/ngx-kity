import {async} from '@angular/core/testing';
import {KityBox} from '../../lib/model/kity-box';
import {KityPoint} from '../../lib/model/kity-point';


describe('Kity Point', () => {

  beforeEach(async(() => {

  }));

  beforeEach(() => {

  });

  it('should create KityPoint', () => {
    const kityPoint = new KityPoint();
    expect(kityPoint).toEqual(new KityPoint(0, 0));
  });

  it('should offset', () => {
    const kityPoint = new KityPoint();
    kityPoint.offset(1, 1);
    expect(kityPoint.offset(1, 1)).toEqual(new KityPoint(1, 1));
  });

  it('should isOrigin', () => {
    expect(new KityPoint().isOrigin).toBeTruthy();
  });
});
