import {data_stack,opa_stack } from './calculator.js'
export function getRes(res) {
    for (let i = 0; i < res.length; i++) {
        switch (res[i]) {
            case "{":
            case "[":
            case "<":
            case "(":
                opa_stack.push(res[i]);
                break;
            case "}":
                let t6;
                while (opa_stack.length > 0 && (t6 = opa_stack.pop()) !== "{") {
                    opa_stack.push(t6);
                    popCalculator();
                }
                let temp1 = data_stack.pop();
                data_stack.push(Math.sin(temp1));
                break;
            case "]":
                let t7;
                while (opa_stack.length > 0 && (t7 = opa_stack.pop()) !== "[") {
                    opa_stack.push(t7);
                    popCalculator();
                }
                let temp2 = data_stack.pop();
                data_stack.push(Math.cos(temp2));
                break;
            case ">":
                let t8;
                while (opa_stack.length > 0 && (t8 = opa_stack.pop()) !== "<") {
                    opa_stack.push(t8);
                    popCalculator();
                }
                let temp3 = data_stack.pop();
                data_stack.push(Math.tan(temp3));
                break;
            case ")":
                let t1;
                while (opa_stack.length > 0 && (t1 = opa_stack.pop()) !== "(") {
                    opa_stack.push(t1);
                    popCalculator();
                }
                break;
            case "+":
            case "-":
                if (i === 0 ||
                    (res[i] === "-" && isNaN(res[i - 1]) &&
                        res[i - 1] !== ")" && res[i - 1] !== "}" && res[i - 1] !== "]" && res[i - 1] !== ">")) {
                    let [num, size] = getNum(res, i);
                    data_stack.push(num);
                    i += size - 1;
                } else {
                    while (opa_stack.length > 0) {
                        let t3 = opa_stack.pop();
                        opa_stack.push(t3);
                        if (t3 !== "(" && t3 !== "{" && t3 !== "[" && t3 !== "<") {
                            popCalculator();
                        } else {
                            break;
                        }
                    }
                    opa_stack.push(res[i]);
                }
                break;
            case "*":
            case "/":
            case "%":
                while (opa_stack.length > 0) {
                    let t2 = opa_stack.pop();
                    opa_stack.push(t2);
                    if (t2 === "*" || t2 === "/" || t2 === "%" || t2 === "^") {
                        popCalculator();
                    } else {
                        break;
                    }
                }
                opa_stack.push(res[i]);
                break;
            case "^":
                opa_stack.push(res[i]);
                break;
            default:
                if (!isNaN(res[i])) {
                    let [num, size] = getNum(res, i);
                    data_stack.push(num);
                    i += size - 1;
                } else {
                    throw new Error("expression error");
                }
                break;
        }
    }
    while (data_stack.length >= 2 && opa_stack.length >= 1) {
        popCalculator();
    }
    if (data_stack.length === 1 && opa_stack.length === 0) {
        return data_stack.pop();
    }
    throw new Error("expression error");
}

 function getNum(res, index) {
    let i;
    for (i = index; i < res.length; i++) {
        if (isNaN(res[i])) {
            if (res[i] !== "." && !((res[i] === "-" || res[i] === "+") && i === index)) {
                break;
            }
        }
    }
    return [parseFloat(res.slice(index, i + 1)), i - index];
}

 function popCalculator() {
    if (data_stack.length >= 2 && opa_stack.length >= 1) {
        let data2 = data_stack.pop();
        let data1 = data_stack.pop();
        let opa = opa_stack.pop();
        switch (opa) {
            case "+":
                data_stack.push(accAdd(data1, data2));
                break;
            case "-":
                data_stack.push(accAdd(data1, -data2));
                break;
            case "*":
                data_stack.push(accMul(data1, data2));
                break;
            case "/":
                if (data2 !== 0) {
                    data_stack.push(accDiv(data1, data2));
                    break;
                } else {
                    throw new Error("divide by zero");
                }
            case "%":
                data_stack.push(data1 % data2);
                break;
            case "^":
                data_stack.push(Math.pow(data1, data2))
                break;
            default:
                throw new Error("expression error");
        }
        return true;
    }
    throw "expression error";
}

function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    t1 = arg1.toString().split(".")[1].length;
    t2 = arg2.toString().split(".")[1].length;
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}

function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    m += s1.split(".")[1].length;
    m += s2.split(".")[1].length;
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}