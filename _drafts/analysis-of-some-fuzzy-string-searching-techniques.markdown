---
title: Analysis of some fuzzy string searching techniques
layout: post
---

One of my current personal projects involves searching a query in a huge list of strings. Now, I want the search to be fuzzy i.e. it should not only return the exact matches but also some approximate matches. So, in case the user provides a wrong spelling for the query, the search can still find matches.

Some similar implementations of this functionality are

- Vim fuzzy file search
  
  If you have used Vim, pressing ```^P``` invokes the fuzzy file search in the current project folder. In the newer implementation of Vim, called the nvim or Neovim, there is a specific plugin to extend this functionality to filesystem and even searching in project code.

- Sublime Text's ```Ctrl+Shift+P```

  Another excellent example is the ```Ctrl+Shift+P``` search in Sublime Text. One thing to note is that the Sublime Text search was way faster than the neovim fuzzy search plugin, at least on my machine. This may be because the neovim plugin uses a separate executable program for the searching, while the feature is built-in in Sublime Text.

## Case Study : Sublime Text Fuzzy Search

Let's analyze the Sublime Text fuzzy search and figure out how it might work. So, I will provide various kinds of queries and make a list of the nature of outputs the search gives.

![Searching a correctly spelled query](/assets/img/fuzzy_sublime_text_1.png "Searching a correctly spelled query")

As you can see the search returns some strings with exact matches with the query "bower", but also some approximate matches, for example, "Su<b>b</b>limeREPL : P<b>ower</b>Shell". Notice, how there is no exact match for "bower", but it searched for the characters present in the query and it returned a possible match.

Moving on

![Searching with misspelled query](/assets/img/fuzzy_sublime_text_2.png "Searching with misspelled query")

Notice that the query has been changed to "boewr", i.e. two characters places have been swapped. But still, the search returns the supposedly correct results. Although, it is interesting that the characters are not highlighted anymore, so the highlighting may be done using a separate algorithm, probably using Regular Expressions, as it is done in the order of occurrence of the characters in the query. This may be done by breaking the query down into individual characters and constructing a RegExp filter for ```b.*o.*w.*e.*r```. The time complexity for this search depends on the Regular Expression Engine's implementation in the particular programming language. The average time-complexity of a DFA Regular Expression Engine is $$ \mathcal{O}(n) $$.

So if I now substitute a character in the query instead of swapping

![Searching with character substituted query](/assets/img/fuzzy_sublime_text_3.png "Searching with character substituted query")

Notice how there is no result corresponding to "bower", the query that we actually meant to search for. Still there are some approximate results. My first thought was that the position of substitution may matter, i.e. if the user types the first character of the query correctly it should at-least match a result approximately. Apparently it doesn't.

## Meet the Levenshtein

Further research into fuzzy string matching (by 'further research' I mean the very first Google search result), I stumbled upon a metric that represents the difference between two strings, the Levenshtein distance. It is fundamentally similar to Hamming Distance, most commonly studied in Communication Systems, used in error-detection and correction.

Essentially Hamming Distance tells us how many bits (or bytes in case of strings) need to be changed to move from one string to another. The problem with Hamming distance, though, is that it works only for strings of equal length. 

An example of computing the Hamming distance for two bit arrays with 8 bits

$$
    \begin{array}{ l | c | r }
        \hline
        \text{Byte-A} & 1 & 0 & 0 & 0 & 1 & 1 & 1 & 1 \\ \hline
        \text{Byte-B} & 1 & 0 & 0 & 1 & 0 & 0 & 1 & 1 \\ \hline
               & \checkmark & \checkmark & \checkmark & \times & \times & \times & \checkmark & \checkmark \\ \hline
    \end{array} \\
    \eqalign{\text{Computing the Hamming Distance}} 
$$

As the difference between Byte-A and Byte-B is of 3 bits, the Hamming Distance is 3.

**Levenshtein Distance** takes the approach one step further, so bit additions are also taken into account when computing the distance. So, the strings can be of different sizes in the case of Levenshtein distance. Levenshtein Distance is also called **edit distance**, as it gives the number of character editions to be made in one string to convert it to another.

The algorithm for computing Levenshtein distance is follows:

1. Find the length of the two bit-arrays (or strings). Suppose Word-A is of length $$ m $$ and Word-B is of length $$ n $$.
2. Construct a 2-D matrix of size $$ m+1 \times n+1 $$ in the following fashion.
   
   $$ \text{Suppose Word-A = 0b10001111 } \\ \text{and Word-B = 0b100011} $$

   $$
   \begin{array}{c|lcr}
   
     & & {\bf 1} & {\bf 0} & {\bf 0} & {\bf 0} & {\bf 1} & {\bf 1} & {\bf 1} & {\bf 1} \\ \hline
     & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\ 
     {\bf 1} & 1 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
     {\bf 0} & 2 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
     {\bf 0} & 3 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
     {\bf 0} & 4 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
     {\bf 1} & 5 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
     {\bf 1} & 6 & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot & \cdot \\ 
   \end{array}
   $$

    The matrix has been initialized as follows

    $$
        x[j][0] = j \\
        x[0][i] = i \\
        \text{matrix is zero indexed}
    $$

3. The cost is defined as 

    $$ cost = \begin{cases} 
                0 & if A[i] = B[j] \\ 
                1 & if A[i] \ne B[j] 
               \end{cases} \\ \text{where } A[i] = i^{th} \text{ element of bit-array A} \\ \text{ and } B[j] = j^{th} \text{ element of bit-array B}   $$

    Now fill the matrix as follows 

    $$ 
    x[j][i] = min
        \begin{pmatrix}
            x[j-1][i]+1, \\
            x[j][i-1]+1, \\
            x[j-1][i-1]+cost \\
        \end{pmatrix}
    \\
    \\ i = 1 \text{ to } m
    \\ j = 1 \text{ to } n
    \\
    \\ x[j-1][i] = \text{ element above i,j} \\
    x[j][i-1] = \text{ element to the left of i,j} \\
    x[j-1][i-1] = \text{ element diagonally }\\ \text{above to the left of i,j}\\
    $$

4. After the iteration over all the matrix is complete, we will get the Levenshtein distance at $$ x[n][m] $$ (lower right-most element). Solving the previous example
   
   $$
   \begin{array}{c|lcr}
   
     & & {\bf 1} & {\bf 0} & {\bf 0} & {\bf 0} & {\bf 1} & {\bf 1} & {\bf 1} & {\bf 1} \\ \hline
     & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\ 
     {\bf 1} & 1 & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\ 
     {\bf 0} & 2 & 1 & 0 & 1 & 2 & 3 & 4 & 5 & 6 \\ 
     {\bf 0} & 3 & 2 & 1 & 0 & 1 & 2 & 3 & 4 & 5 \\ 
     {\bf 0} & 4 & 3 & 2 & 1 & 0 & 1 & 2 & 3 & 4 \\ 
     {\bf 1} & 5 & 4 & 3 & 2 & 1 & 0 & 1 & 2 & 3 \\ 
     {\bf 1} & 6 & 5 & 4 & 3 & 2 & 1 & 0 & 1 & 2 \\ 
   \end{array}
   $$

   we get $$ \text{Levenshtein Distance} = x[6][8] = 2 $$
   which is evident from the fact that bit-arrays $$ A $$ and $$ B $$ are same except the two least significant bits of $$ A $$.

A naive implementation of this algorithm can be written in Python3 like this

{% highlight python linenos %}
import time

# A and B taken as byte strings
A = b"10101111"
B = b"100001"
m = len(A)
n = len(B)
matrix = []
cost = 0

if __name__ == '__main__':
    start = time.time()

    # Initializing the matrix
    for j in range(0,n+1):
        matrix.append([0]*(m+1))

    for i in range(0,m+1):
        matrix[0][i]=i

    for j in range(0,n+1):
        matrix[j][0]=j

    # Calculating Levenshtein distance
    for i in range(1,m+1):
        for j in range(1,n+1):
            if A[i-1]==B[j-1]:
                cost = 0
            else:
                cost = 1
            matrix[j][i] = min((matrix[j-1][i]+1), (matrix[j][i-1]+1), (matrix[j-1][i-1]+cost))


    stop = time.time()


    #printing result
    for i in matrix:
        print(i)

    print(f"Levenshtein Distance = {matrix[n][m]}")
    print(f"Done in {str(stop-start)}")
{% endhighlight %}

<br>
Running this script for $$ \text{A = 0b10101111 and B = 0b100001} $$.

<div class="console">
<div><pre prompt="$ ">python levenshtein_naive.py
[0, 1, 2, 3, 4, 5, 6, 7, 8]
[1, 0, 1, 2, 3, 4, 5, 6, 7]
[2, 1, 0, 1, 2, 3, 4, 5, 6]
[3, 2, 1, 1, 1, 2, 3, 4, 5]
[4, 3, 2, 2, 1, 2, 3, 4, 5]
[5, 4, 3, 3, 2, 2, 3, 4, 5]
[6, 5, 4, 3, 3, 2, 2, 3, 4]
Levenshtein Distance = 4
Done in 0.00021600723266601562
</pre></div></div>

## Optimizing Levenshtein

The naive approach to Levenshtein computes the distance in $$ \mathcal{O}(mn) $$ time complexity and $$ \mathcal{O}(mn) $$ space complexity.
Not much can be done with the time complexity, but the space complexity can be reduced. 

Notice that the algorithm can be applied to the 2D matrix column-wise or row-wise, thus eliminating the need to store the complete matrix in memory. Only the latest column or row can be stored, plus one memory location to store the element left to the current element.

## [python-Levenshtein](https://github.com/miohtama/python-Levenshtein)

There is a python module available for calculating a number of edit-distances like Hamming, Levenshtein, Jaro and Jaro-Winkler. The module is highly optimized for speed. Here is a comparison between my naive implementation and the python-Levenshtein module.

{% highlight python linenos %}
import time
import Levenshtein as L
# Because spelling 'Levenshtein' is tricky

A = b"10101111"
B = b"100001"


if __name__ == '__main__':
    start = time.time()
    d=L.distance(A,B)
    stop = time.time()

    print(f"Levenshtein Distance = {d}")
    print(f"Done in {str(stop-start)}")
{% endhighlight %}

<div class="console"><div>
<pre prompt="$ ">
python levenshtein_naive.py
Levenshtein Distance = 4
Done in 0.00021600723266601562
</pre>
<pre prompt="$ ">
python python-levenshtein.py
Levenshtein Distance = 4
Done in 4.5299530029296875e-06
</pre></div></div>

## String Similarity with Levenshtein Distance

Coming back again to the Fuzzy search problem, Levenshtein Distance gave us a metric to find the edit distance between two strings. Consequently, a similarity parameter can also be derived from the distance. The python-Levenshtein module presents a ```ratio()`` function which computes the similarity between two strings based on their Levenshtein distance. 

The ratio is computed as

$$
    \text{ratio} = (1-\frac{d}{m}) \\
    d = \text{Levenshtein Distance} \\
    m = \text{Longest length of the two strings}
$$

But there is a caveat. For computing the ratio, Levenshtein Distance is calculated with a cost of 2 for the replacement operation. Replacement, here refers to changing a character at a certain position in string. So, between ```hypothesis``` and ```hypothese```, the ```i``` has been replaced with ```e```. Another operation in the same example is the deletion operation. The last s in ```hypothesis``` has been deleted.

Thus, two strings with almost same number of characters will be regarded more alike than two strings with 

### References :

1. [Levenshtein Distance, in Three Flavors](https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm)
2. [Algorithm Implementation/Strings/Levenshtein distance](https://en.m.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#C)
3. [How python-Levenshtein.ratio is computed](https://stackoverflow.com/questions/14260126/how-python-levenshtein-ratio-is-computed)
5. [String similarity metrics in Python](https://stackoverflow.com/questions/1471153/string-similarity-metrics-in-python)