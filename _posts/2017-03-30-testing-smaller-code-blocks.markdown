---
title: testing smaller code blocks
layout: post
---
<div>
{% highlight c linenos%}
#include <stdio.h>
#define ABC

int main(){
    /*
    comments and all
     */
    uint32_t bullshittery_counter = some_bulllshit_code_with_a_very_long_function_name();
    while (bullshitting_continues()) {
    do_something();
    }
}
{% endhighlight %}
</div>

<div>
{% highlight c linenos %}
// more code here

#define more_code_here 1

int some_bullshit_function() {
    return 0;
}
{% endhighlight %}
</div>

<div>
{% highlight c %}
// more code here without line numbers

#define more_code_here 1

int some_bullshit_function() {
    return 0;
}
{% endhighlight %}
</div>

```c
#include <stdio.h>

#define some bullshit

int main() {
    do_something();
    // code in backtick format
}
```

```
some random backtick text
```

> blockquote text here
> > nested blockquote
 
<code>
hello </code>
