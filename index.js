// question 1:--------------------------------------------------------- 

// Sol1:
function findMissingUsingSum(arr, total) {
    let sumOfN = total * (total + 1) / 2;
    let sumOfArr = arr.reduce((sum, val) => sum + val, 0);
    return sumOfN - sumOfArr;
}

console.log(findMissingUsingSum([5, 4, 8, 6], 5));



// Sol2:
function findMissingUsingXOR(arr, total) {
    let xorAll = 0;
    for (let i = 1; i <= total; i++) {
        xorAll ^= i;
    }
    for (let val of arr) {
        xorAll ^= val;
    }
    return xorAll;
}

console.log(findMissingUsingXOR([5, 4, 6, 2], 5)); 



// Question 2: ----------------------------------------------------------

function findTwoSum(arr, target) {
    const indexMap = {};
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (indexMap[complement] !== undefined) {
            return [indexMap[complement], i];
        }
        indexMap[arr[i]] = i;
    }
    return [];
}

console.log(findTwoSum([20, 1, 5, 2, 11], 3)); 


// Question 3:------------------------------------------------------------------

function permuteString(s) {
    const results = [];

    if (s.length === 0) {
        return [''];
    }

    const stack = [{ str: s, perm: '' }];

    const processStack = (stack) => {
        if (stack.length === 0) {
            return;
        }

        const { str, perm } = stack.pop();

        if (str.length === 0) {
            results.push(perm);
        } else {
            for (let i = 0; i < str.length; i++) {
                stack.push({
                    str: str.slice(0, i) + str.slice(i + 1),
                    perm: perm + str[i]
                });
            }
        }

        processStack(stack);
    };

    processStack(stack);

    return results;
}


const testInput1 = "XYZ";
console.log(permuteString(testInput1)); 

const testInput2 = "ABCD";
console.log(permuteString(testInput2)); 

const testInput3 = "EF";
console.log(permuteString(testInput3)); 


// Question 4:--------------------------------------------------------------------------

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

function hasCycle(head) {
    let seenNodes = new Set();
    let currentNode = head;

    while (currentNode !== null) {
        if (seenNodes.has(currentNode)) {
            return true;
        }
        seenNodes.add(currentNode);
        currentNode = currentNode.next;
    }

    return false;
}


function buildLinkedListWithLoop(values, loopIndex) {
    if (values.length === 0) return null;

    let head = new Node(values[0]);
    let current = head;
    let loopNode = null;

    if (loopIndex === 0) {
        loopNode = head;
    }

    for (let i = 1; i < values.length; i++) {
        current.next = new Node(values[i]);
        current = current.next;
        if (i === loopIndex) {
            loopNode = current;
        }
    }

    if (loopIndex >= 0) {
        current.next = loopNode;
    }

    return head;
}


let head1 = buildLinkedListWithLoop(["A", "B", "C", "A"], 0);
console.log(hasCycle(head1)); 

let head2 = buildLinkedListWithLoop(["1", "2", "3"], -1);
console.log(hasCycle(head2)); 

let head3 = buildLinkedListWithLoop(["1", "2", "3", "1"], 0);
console.log(hasCycle(head3)); 



// Question 5:--------------------------------------------------------------------------

function checkIfValidParenthesis(str) {
    const stack = [];
    const matchingPairs = { '(': ')', '{': '}', '[': ']' };

    function isOpeningBracket(char) {
        return matchingPairs.hasOwnProperty(char);
    }

    function isMatchingPair(open, close) {
        return matchingPairs[open] === close;
    }

    for (let char of str) {
        if (isOpeningBracket(char)) {
            stack.push(char);
        } else {
            if (stack.length === 0) {
                return false;
            }
            const top = stack.pop();
            if (!isMatchingPair(top, char)) {
                return false;
            }
        }
    }

    return stack.length === 0;
}


console.log(checkIfValidParenthesis("()")); 
console.log(checkIfValidParenthesis("(){}[]")); 
console.log(checkIfValidParenthesis("([})")); 
console.log(checkIfValidParenthesis("[({})]")); 


// -------------------------------------------------------------------------------------