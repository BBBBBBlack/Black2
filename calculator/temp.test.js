import {transStr} from './static/calculator'
import { getRes } from './static/calculator'


test('adds 1 + 2 to equal 3', () => {
    var res = "-1+2*3/2+sin(-1*cos(0)+tan(1.5))-6*8^9";
    res = transStr(res);
    expect(getRes(res)).toBe(-805306365.4901165);
})