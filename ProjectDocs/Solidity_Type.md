### 类型
#### 值类型
    - 布尔类型
    - bool ：可能的取值为常数值 true 和 false。
    运算符：
    !：逻辑非运算符，用于反转一个布尔值。如果一个值是 true，! 运算符会将其变为 false，反之亦然。

    &&：逻辑与运算符，也称为 "and"。它用于连接两个布尔表达式，只有当两个表达式都为 true 时，结果才为 true。

    ||：逻辑或运算符，也称为 "or"。它用于连接两个布尔表达式，只要有一个表达式为 true，结果就为 true。

    ==：等于运算符，用于比较两个值是否相等。如果两个值相等，结果为 true。

    !=：不等于运算符，用于比较两个值是否不相等。如果两个值不相等，结果为 true。
    - 整型

    int 和 uint 是两种整型变量的关键字，分别代表有符号和无符号的整数。有符号整数可以表示正数和负数，而无符号整数只能表示正数或零。

    uint8 到 uint256 和 int8 到 int256 是具体指定位数的整型关键字，它们分别表示无符号和有符号的整数类型，位数从8位到256位，每次增加8位。

    uint 和 int 是 uint256 和 int256 的别名，意味着它们是相同类型的简写形式。

    接下来描述了几种运算符：

    比较运算符：<=（小于等于）、<（小于）、==（等于）、!=（不等于）、>=（大于等于）、>（大于）。这些运算符用于比较两个值，并返回一个布尔值（真或假）。
    位运算符：&（位与）、|（位或）、^（异或）、~（位取反）。这些运算符在二进制层面上对整数进行操作。
    移位运算符：<<（左移）和 >>（右移）。左移运算符将一个数的二进制表示向左移动指定的位数，而右移运算符则向右移动。
    算数运算符：+（加）、-（减）、一元运算符 -（负号，只适用于有符号整数）、*（乘）、/（除）、%（取余）、**（幂）。这些运算符用于执行基本的数学运算。
    对于任何整数类型 X，可以使用 type(X).min 和 type(X).max 来获取该类型能表示的最小值和最大值。