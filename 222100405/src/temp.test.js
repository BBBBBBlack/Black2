import {getRes} from './calculate'
import { transStr } from './calculator'

test('test calculate', () => {
    let res1 = "-1+2*3/2+sin(-1*cos(0+0)%1-tan(1.5-1.5*2))*8^(9-0)^-1+2*2^1";
    res1 = transStr(res1);
    expect(getRes(res1)).toBe(7.259116142081281);
});
test('test exception1', () => {
    let res2 = "-1/0";
    res2 = transStr(res2);
    expect(() => getRes(res2)).toThrow("divide by zero");
});
test('test exception2', () => {
    let res3 = "-1*()))";
    res3 = transStr(res3);
    expect(() => getRes(res3)).toThrow("expression error");
});