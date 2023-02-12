const operator = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
};

function process (num1, num2, operand) {
    let value = 0;
    num1 = Number(num1);
    num2 = Number(num2);

    switch(operand) {
        case '+' :
            value = num1 + num2;
            break;
        case '-' :
            value = num1 - num2;
            break;
        case '*' :
            value = num1 * num2;
            break;
        case '/' :
            value = num1 / num2;
            break;
    }

    return value;
}

let vm = new Vue({
    el: '#app',
    data() {
        return {
            input: '',
            total: '',
        }
    },
    methods: {
        addNumber(num) {
            this.input += num;
        },
        addOperand(ope) {
            let inputStr = this.input.replace(/\s+/g, '');
            if (!inputStr) {
                return window.alert("演算子から入力することはできません。");
            }

            if (inputStr.charAt(inputStr.length - 1) in operator) {
                this.input = this.input.slice(0, -3) + ` ${ope} `;
            } else {
                this.input += ` ${ope} `;
            }
        },
        calculation() {
            let inputStr = this.input.replace(/\s+/g, '');
            if (inputStr.charAt(inputStr.length - 1) in operator) {
                return window.alert("末尾が演算子の状態で計算することはできません。");
            }

            let numStack = new Array;
            let opeStack = new Array;
            let number = '';

            for (i = 0; i < inputStr.length; i++) {
                let current = inputStr.charAt(i);
                if (isNaN(current)) {
                    numStack.push(number);
                    while(opeStack.length > 0) {
                        let num1 = numStack.pop();
                        let num2 = numStack.pop();
                        let op = opeStack.pop();
                        numStack.push(process(num2, num1, op));
                    }

                    opeStack.push(current);
                    number = '';
                } else {
                    number += current;
                }
            }

            let ans = process(numStack.pop(), number, opeStack.pop());
            this.input = '';
            this.total = ans;
        }
    }

})