---
title: 'Setting up a website with Jekyll : Part 1'
layout: post
---

If you are an avid blogger or aspire to be one, you might be looking towrads setting up a blog using one of the many popular CMS like Wordpress, Joomla, etc. Well, there is a better alternative to all those, which is way more simple and lightweight than any of the above. The name is... 

Oh come on!! Didn't you read the title?

It's ***Jekyll***.


## Going beyond the fancy name ##

Jekyll is a static-site generator. So, you would not want to use it for the following scenarios:

- You want to host a full fledged website, complete with databases and dynamic content.
- You are a hardcore guy, who likes useless challenges and want to endure a lifetime of pain setting up a Wordpress blog.

If you are not in the above categories, congratulations! You qualify for using Jekyll.

## But what is Jekyll? ##

I'll tell you what Jekyll is not. It is not a blogging platform. Yes, you read that right. In fact, it is a ruby program, that generates a specific layout of files that you can upload to your web host, and they turn magically into a web site.


## Some background ##

Jekyll is the default platform for Github pages. Github pages is used by developers to easily generate and host a web site for their projects. Github pages is a fully automated solution and the only requirement is that you need to know *Markdown*. 

Markdown is simple and light-weight markup language. A *markup language* is a fancy name for a thing that converts some text, which is 'marked up' or surrounded by some tags or identifiers, to a human understandable and aesthetically conistent (*not always*) format. Just like HTML (Hyper Text Markup Language), Markdown has a precise set of rules which can be found [here](https://daringfireball.net/projects/markdown/). 

But unlike HTML, which is parsed by a web browser, Markdown cannot be directly loaded in a web browser. The browser will open it as a simple text file. In the hindsight, built-in markdown processing can be an attractive feature for browsers. So, markdown needs an additinal parser. Fortunately, jekyll has not only one but many options for the markdown parser. The default parser Jekyll prior to version 3.x was [redcarpet](https://github.com/vmg/redcarpet), but now it is [kramdown](https://kramdown.gettalong.org). 

Kramdown is a ruby based parser, which can parse GFM ('Github Flavored Markdown') and Kramdown syntax text. Both of these are based on the original Markdown syntax. Kramdown sports a built-in syntax highlighter named 'Rouge' (notice the spelling, it's not *Rogue* from X-Men), which comes in handy for us, coders.


So, that was all that we needed to know about Jekyll. Now lets get our hands dirty with setting it up...


