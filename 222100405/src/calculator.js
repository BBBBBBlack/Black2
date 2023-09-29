import $ from 'jquery';
import { getRes } from './calculate.js';
export var data_stack = [];
export var opa_stack = [];

$(function () {
    var res = "";
    // 获取包含所有按钮的div元素
    var bangbang = document.getElementById("bangbang");
    var block1 = document.getElementById("block1");
    var block2 = document.getElementById("block2");
    // 获取div内所有的button元素
    var buttons = bangbang.querySelectorAll("button");
    // 为每个按钮添加点击事件监听器
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            let value = button.id;
            if (value === "C") {
                clear(res);
                block1.innerHTML = "";
                block2.innerHTML = "";
            } else if (value === "d") {
                block1.innerHTML = block1.innerHTML.slice(0, -1);
            } else if (value === "=") {
                res = transStr(block1.innerHTML);
                try {
                    block2.innerHTML = getRes(res);
                } catch (e) {
                    alert(e);
                    clear(res);
                    block1.innerHTML = "";
                }
            } else {
                block1.innerHTML += value
            }
        });
    });

    res = block1.innerHTML;

});

function clear(res) {
    data_stack.length = 0;
    opa_stack.length = 0;
    res = "";
}

export function transStr(str) {
    let newStr = str.replace(/sin/g, "s").replace(/cos/g, "c").replace(/tan/g, "t");
    for (let i = 0; i < newStr.length; i++) {
        if (newStr[i] === "s") {
            newStr = replaceX(newStr, i, "{", "}");
        } else if (newStr[i] === "c") {
            newStr = replaceX(newStr, i, "[", "]");

        } else if (newStr[i] === "t") {
            newStr = replaceX(newStr, i, "<", ">");
        }
    }
    return newStr;
}

//为所有的sin cos tan添加括号
function replaceX(str, index, ch1, ch2) {
    let stack = [];
    for (let i = index; i < str.length; i++) {
        if (str[i] === "(") {
            if (stack.length === 0) {
                str = str.slice(0, i - 1) + ch1 + str.slice(i + 1);
            }
            stack.push(str[i]);
        } else if (str[i] === ")") {
            stack.pop();
            if (stack.length === 0) {
                str = str.slice(0, i) + ch2 + str.slice(i + 1);
                break;
            }
        }
    }
    return str;
}