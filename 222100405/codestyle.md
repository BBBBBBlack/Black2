## CODE_STYLE

* 界面展示和计算逻辑代码解耦合
  为实现代码的解耦合，将代码划分为三个部分
  * HTML负责网页的架构，如计算器的结构（输入输出显示屏、按键面板等）
  * CSS负责网页的样式与美化（计算器的各部分位置、大小、形状、颜色等）
  * JS负责网页的行为（点击按键触发的事件，何时开始计算、何时显示\清空结果等）

​		三部分依次完成，其中，HTML文件除了开头调用css、js文件外，不嵌入任何css、js代码 

* HTML

  * 标签与属性名小写

    ```html
    <div id="block">
        <div id="block1"></div>
        <div id="block2"></div>
    </div>
    ```

  * 标签闭合

    ```html
    <button type="button" id="(">(</button>
    ```

  * 属性换行

    ```html
        <p>
            <button type="button" id="(">(</button>
            <button type="button" id="C">C</button>
            <button type="button" id="/">/</button>
            <button type="button" id="*">*</button>
            <button type="button" id="d">del</button>
        </p>
    ```

* CSS

  * 语句后加分号

  * 花括号前留白，后换行

  * 冒号后跟空格

    ```css
    #get {
        height: 85px;
        width: 280px;
        font-size: 160%;
        font-family: "Calibri", sans-serif;
    }
    ```

  

* JavaScript

  * 四空格一缩进

  * 语句后加分号

    ```javascript
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
    ```

  * 在运算符后换行，下一行增加两个层级的缩进；当给变量赋值时，第二行的位置应当和赋值运算符的位置保持对齐。

  * 均使用===和!==进行比较

    ```javascript
    if (i === 0 || 
    	(res[i] === "-" && isNaN(res[i - 1]) && 
        	res[i - 1] !== ")" && res[i - 1] !== "}" && res[i - 1] !== "]" && res[i - 1] !== ">")) {
                        let [num, size] = getNum(res, i);
                        data_stack.push(num);
                        i += size - 1;
    }
    ```

  * 字符串均使用双引号

    ```javascript
    var bangbang = document.getElementById("bangbang");
    var block1 = document.getElementById("block1");
    var block2 = document.getElementById("block2");
    ```

  * switch语句都有default

    ```javascript
    switch (condition) {
        case "first":
        case "second":
            ...
            break;
        case "third":
            ...
     		break;
        default:
        	...
    }
    ```