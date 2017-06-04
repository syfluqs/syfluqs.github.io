---
title: Pure CSS console-like code display
layout: post
---

I am having a really boring day today. So, I decided to do something with my blog. I saw these cool console-like code display things somewhere (I don't know the correct name for this) on some website, so I made one for my blog, in pure CSS!

Still confused? It looks something like this

<div class="console"><div>
<pre prompt="$ ">
git status
On branch master
Changes not staged for commit:
  (use "git add &lt;file&gt;..." to update what will be committed)
  (use "git checkout -- &lt;file&gt;..." to discard changes in working directory)

    modified:   _layouts/default.html
    modified:   public/css/poole.css

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)

    _drafts/console-code.markdown
    _drafts/images.markdown
    _includes/image_modal.html
    _layouts/debug.html
    assets/img/

no changes added to commit (use "git add" and/or "git commit -a")

</pre>
<pre prompt="$ ">
git add .
</pre>
</div></div>

The code for embedding this thing looks like this

{% highlight html linenos %}
<div class="console">
    <div>
        <pre prompt="$ ">
            git status
            On branch master
            Changes not staged for commit:
              (use "git add &lt;file&gt;..." to update what will be committed)
              (use "git checkout -- &lt;file&gt;..." to discard changes in working directory)

                modified:   _layouts/default.html
                modified:   public/css/poole.css

            Untracked files:
              (use "git add &lt;file&gt;..." to include in what will be committed)

                _drafts/console-code.markdown
                _drafts/images.markdown
                _includes/image_modal.html
                _layouts/debug.html
                assets/img/

            no changes added to commit (use "git add" and/or "git commit -a")

        </pre>
        <pre prompt="$ ">
            git add .
        </pre>
    </div>
</div>
{% endhighlight %}

This can be embedded in markdown as well, but just put the div in a new block. It won't work inline, at least doesn't work with kramdown.

I will walk-through the insides of this thing and explain how it all comes together, but first lets clear up some jargons.

# CSS ```:after``` and ```:before``` pseudo-elements

The pseudo-elements are nice little things that simplify the HTML that you may have to write. So instead of creating multiple nested ```div```s, you could use one of these pseudo-elements. A very descriptive ad interesting list of possible use cases of pseudo-elements can be found [here](https://css-tricks.com/pseudo-element-roundup/).

The ```:after``` and ```:before``` pseudo-elements are used to insert and style contents after and before the actual content in a tag. Without these, you would have to manually add ```div```s and style them individually.

# &lt;pre&gt; tag

HTML ignores whitespace, so if you want, for example, to have multiple space characters, you can't just write them as space characters, or you can't put multiple newlines if you want a larger gap in text. The code that we would like to show on our console display, might have a number of whitespace characters, but ultimately, the HTML renderer i.e. your browser, will ignore all or some of them. To get around that, we will use the &lt;pre&gt; tags. This tag will preserve all whitespaces and will generally show the text in monospace font, although you can totally override the font with CSS.

# ```attr()``` CSS function

Up until sometime in the recent past, I did not even know that CSS has functions. Well, not like full-fledged functions, but they are quite useful.  Anyways, the ```attr()``` is a function which will put the value of an attribute of the selected HTML element in CSS. This only works for ```content``` CSS property, though. It works something like this

<p data-height="265" data-theme-id="dark" data-slug-hash="qjBvyP" data-default-tab="css,result" data-user="syfluqs" data-embed-version="2" data-pen-title="qjBvyP" class="codepen">See the Pen <a href="https://codepen.io/syfluqs/pen/qjBvyP/">qjBvyP</a> by syfluqs (<a href="https://codepen.io/syfluqs">@syfluqs</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

So, a custom attribute ```first_char``` for the ```div``` is used. And, for the pseudo-element before, we assign the value of attribute to ```content``` property.

Okay, so lets now move on to the actual code for this thing.

<script async src="//jsfiddle.net/syfluqs/2cbd1tzu/embed/html,css,result/"></script>

Lets look at the titlebar first.

# Title Bar

The title bar is made with the ```:before``` pseudo-element of the ```.console``` div.

{% highlight css linenos %}
.console:before {
    content: "\2022 \2022 \2022";
    position: relative;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 0px;
    margin: 0;
    padding: 18px 0;
    margin-bottom: 0.5rem;
    background: #cecfd1;
    background: -webkit-linear-gradient(#E9E8E8, #D0D0D0);
    background: -o-linear-gradient(#E9E8E8, #D0D0D0);
    background: -moz-linear-gradient(#E9E8E8, #D0D0D0);
    background: linear-gradient(#E9E8E8, #D0D0D0);
    color: #ADADAD;
    font-size: 50px;
    line-height: 0;
    text-indent: 0.2rem;
    box-sizing: border-box;
}
{% endhighlight %}

- The buttons on the title bar are made with the ```content``` property. The ```content``` is set to ```\2022``` which gives us the &#8226; unicode character.
- The ```:before``` pseudo-element is actually inline by default, so we use ```display: block;``` to turn it into a block instead. This will allow us to expand it to whole width of the ```div```, by using ```width: 100%;```. Additionally ```position: relative;```, ```top: 0; left: 0;``` and ```margin: 0;``` ensure that the title bar will stay at the beginning of the ```.console``` div. 
- Now we set the ```padding: 18px 0;``` which makes the total height of this element to be 36px. Note that the actual height is set to 0px. So only the padding area will take the space.
- We set the background color to a top-to-bottom linear gradient using 
  ```css
  background: -webkit-linear-gradient(#E9E8E8, #D0D0D0);
  background: -o-linear-gradient(#E9E8E8, #D0D0D0);
  background: -moz-linear-gradient(#E9E8E8, #D0D0D0);
  background: linear-gradient(#E9E8E8, #D0D0D0);
  ```
  A fallback background color is set with ```background: #cecfd1;```, if the browser does not support gradients.
- The ```font-size``` is set to 50px and the ```color``` to #ADADAD. This will make the buttons look more realistic and in-scale with the rest of the thing.
- Now we nudge the buttons just a little to the right with ```text-indent: 0.2rem;```. ```text-indent``` only nudges the first line of the text in a ```div```.
- The ```margin-bottom: 0.5rem;``` is used to leave some space between the title bar and the actual content area.

# The content section

The content section uses the ```<pre>``` tag to display the code content.

{% highlight css linenos %}
.console pre {
  padding:0 0.5rem;
  display: block;
  float: left;
  border-radius: 0;
  font-size: 1rem;
}
{% endhighlight %}

- ```padding: 0 0.5rem;``` gives an equal left and right padding to the content.
- ```float: left;``` makes the content to stick to the left edge of the root element. 

{% highlight css linenos %}
.console div {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
{% endhighlight %}

- This is the code for the container for all the ```<pre>``` tags. 
- Multiple ```<pre>``` tags can be used as the children of this ```div```.
- The ```overflow-x: auto;``` will allow a horizontal scrollbar to be placed at the bottom of the ```div```, if any of the ```pre``` are wider than the ```div```.
- The ```padding-bottom: 0.5rem;``` provides some space between the content and the bottom edge.

# The prompt

Remember, that multiple ```pre``` tags can be placed inside the ```div```. Each ```pre``` may represent a command entered in the console and its output. One thing we were missing, was a prompt.

If you do not know, what a prompt is, it is the small phrase or a couple of words that you see before the cursor in a terminal emulator.

![A prompt](/assets/img/prompt.png "A fancy prompt")

Well, I was not able to create a fancy prompt like that in CSS, so I settle d for a simple ```$``` prompt commonly found in the ```bash``` shell.

So, the prompt is made by utilizing the ```:before``` pseudo-element of each of the ```pre``` tags.

{% highlight css linenos %}
.console pre:before {
  content: attr(prompt);
  display: inline-block;
  position: relative;
  border-radius: 0;
  color: #56A1E1;
}
{% endhighlight %}

- We set the ```content``` to ```attr(prompt)```. So we can specify any prompt phrase that we want, or none. Note that a space is required behind the prompt phrase, like this
  ```html
  <pre prompt="$ "> text </pre>
  ```
- A color is specified with ```color: #56A1E1;``` .
- The ```border-radius``` is not required. I used it just to override it, because of other CSS applied on the ```pre``` tag on my blog.