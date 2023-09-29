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
                    throw "expression error";
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
    throw "expression error";
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
                data_stack.push(data1 + data2);
                break;
            case "-":
                data_stack.push(data1 - data2);
                break;
            case "*":
                data_stack.push(data1 * data2);
                break;
            case "/":
                if (data2 !== 0) {
                    data_stack.push(data1 / data2)
                    break;
                } else {
                    throw "divide by zero";
                }
            case "%":
                data_stack.push(data1 % data2);
                break;
            case "^":
                data_stack.push(Math.pow(data1, data2))
                break;
            default:
                throw "expression error";
        }
        return true;
    }
    // let t4;
    // if (opa_stack.length !== 0) {
    //     t4 = opa_stack.pop();
    //     opa_stack.push(t4)
    // }
    // if (data_stack.length > 0 &&
    //     (opa_stack.length === 0 || t4 === "(" || t4 === "{" || t4 === "[" || t4 === "<")) {
    //     return true;
    // }
    throw "expression error";
}