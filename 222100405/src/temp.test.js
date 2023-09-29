import {getRes} from './calculate'
import { transStr } from './calculator'

test('adds 1 + 2 to equal 3', () => {
    var res = "-1+2*3/2+sin(-1*cos(0+0)%1-tan(1.5-1.5*2))*8^(9-0)^-1+2*2^1";
    res = transStr(res);
    expect(getRes(res)).toBe(7.259116142081281);
})