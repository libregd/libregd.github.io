# 生活中的进制

- 60 seconds  =  1minute
- 24 hours =  1 day
- 7 days = 1 week
- 12 months = 1 year

# 常见进制对照表

| 十进制 | 二进制 | 八进制 | 十六进制 |
| ------ | ------ | ------ | -------- |
| 0      | 0      | 0      | 0        |
| 1      | 1      | 1      | 1        |
| 2      | 10     | 2      | 2        |
| 3      | 11     | 3      | 3        |
| 4      | 100    | 4      | 4        |
| 5      | 101    | 5      | 5        |
| 6      | 110    | 6      | 6        |
| 7      | 111    | 7      | 7        |
| 8      | 1000   | 10     | 8        |
| 9      | 1001   | 11     | 9        |
| 10     | 1010   | 12     | A        |
| 11     | 1011   | 13     | B        |
| 12     | 1100   | 14     | C        |
| 13     | 1101   | 15     | D        |
| 14     | 1110   | 16     | E        |
| 15     | 1111   | 17     | F        |

八进位制和十六进位制系统通常用于计算机领域，因为它们可方便当作二进位制的简写。

十六进位制数字对应于四位二进位制数字的序列，因为十六是二的四次方; 例如，十六进位制 78~16~ 是二进制 1111000~2~。

八进位制数和二进位制的数字序列之间也有类似关系，因为八是二的立方。底数通常是自然数。

#  BASE 2,8,16 → BASE 10

要点是从右到左，从0开始，先乘后加

## 整数部分

将八进制数字 53627 转换成十进制：

$$
53627 = 5×8^4 + 3×8^3 + 6×8^2 + 2×8^1 + 7×8^0 = 22423
$$

> 注意，这里我们需要以十进制形式来表示位权。

十六进制数字 9FA8C 转换成十进制：
$$
9FA8C \\= 9×16^4 + 15×16^3 + 10×16^2 + 8×16^1 + 12×16^0 \\= 653964
$$
将二进制数字转换成十进制：
$$
11010 = 1×2^4 + 1×2^3 + 0×2^2 + 1×2^1 + 0×2^0 = 26
$$

## 小数部分

将八进制数字 423.5176 转换成十进制：
$$
423.5176 \\= 4×8^2 + 2×8^1 + 3×8^0 + 5×8^{-1} + 1×8^{-2} + 7×8^{-3} + 6×8^{-4} \\= 275.65576171875
$$
将二进制数字 1010.1101 转换成十进制：
$$
1010.1101 \\= 1×2^3 + 0×2^2 + 1×2^1 + 0×2^0 + 1×2^{-1} + 1×2^{-2} + 0×2^{-3} + 1×2^{-4} \\= 10.8125
$$

## 练习

**base 2 → base 10：**

1001
$$
1001 = 1×2^3 + 0×2^2 + 0×2^1 + 1×2^0 = 8 + 0 + 0 + 1 = 9
$$
101.1001 
$$
101.1001  \\
		=1×2^2 + 0×2^1 + 1×2^0 + 1×2^{-1} + 0×2^{-2} + 0×2^{-3} + 1×2^{-4} \\
= 4 + 0 + 1 + 0.5 + 0 + 0 + 0.0625 \\= 5.5625
$$
**base 8 → base 10**

302
$$
302 = 3×8^2 + 0×8^1 + 2×8^0 = 192 + 0 + 2 = 194
$$
302.46
$$
302.46 \\= 3×8^2 + 0×8^1 + 2×8^0 + 4×8^{-1} + 6×8^{-2} \\= 192 + 0 + 2 + 0.5 + 0.09375\\= 194.59375
$$
**base 16 → base 10**

EA7
$$
EA7 = 14×16^2 + 10×16^1 + 7×16^0 = 3751
$$

# BASE 10 → BASE 2,8,16 

base 10 → base 2，8 ，16, 整数部分，不停的除下去, 直到商为0。每次的余数作为结果，从下到上写。小数部分不停乘起来对商取整数部分，从上到下写，直到商的小数部分为0.

(33.25)~10~ → (					)~2~

```
整数部分：
33/2=16 ......1
16/2=8  ......0
8/2=4   ......0
4/2=2   ......0
2/2=1   ......0
1/2=0   ......1
小数部分：
0.25*2=0.5  0
0.5*2=1     1
```

(33.25)~10~ = (100001.01)~2~

(36926)~10~ → (				)~8~

```
整数部分：
36926/8=4615 	......6
4615/8=576	    ......7
576/8=72   		......0
72/8=9   		......0
9/8=1   		......1
1/8=0   		......1
```

(36926)~10~ = (110076)~8~

( 0.930908203125 )~10~ → (                        )~8~

``` 
0.930908203125 * 8 = 7.447265625		......7 //去整
0.47265625     * 8 = 3.578125			......3
0.578125       * 8 = 4.625				......4
0.625	       * 8 = 5.0				......5 // 结束：小数部分为0
```

( 0.930908203125 )~10~ → ( 0.7345)~8~

## 练习

(42)~10~ → （101010)~2~

( 0.6875)~10~ → ( 0.1011)~2~

(88)~10~  → (130)~8~  → (58)~16~

(956)~10~  → (1674)~8~  → (1110111100)~2~ 







