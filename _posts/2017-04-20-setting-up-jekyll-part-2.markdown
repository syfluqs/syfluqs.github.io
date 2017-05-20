---
title: 'Jekyll Part 2, Hosting on Github'
layout: post
description: Setting up a local or gh-pages Jekyll website
tags: [jekyll, web, github]
---

In the [last part]({% link _posts/2017-04-09-setting-up-jekyll-part-1.markdown %}), I gave a (very lame) introduction to the Jekyll platform. Lets see how to actually set up a Jekyll website. This post is targeted to *slightly-more-than-beginner-ish* people in handling the Linux command line. Those who fall below this (rather very vague) category may follow through. A basic knowledge about Web Design (basic HTML and CSS, really) is a plus.

Frankly, some steps in this part were a little bit confusing for me, and they might be for you too. I'll tell you about the confusing steps when we get there. Consequently, I am going [maximum borkdrive](https://www.google.co.in/search?q=maximum+borkdrive) and will try to give a full detail of the process. Hopefully, you will get it. As mentioned above, the process involves *git* and some command line stuff, but I will explain everything as I walk through. If you still feel perplexed, you may comment below, contact me, mail me, drop by my house or creepily follow me on a deserted street with a knife, I will get back to you! :+1:

Now, if you want a website on Jekyll, the simplest way is to use Github (more detail below). But the thing is, the rendering is all done by github itself, you have no say in that. Say, you added a shiny new plugin for Jekyll on your local system, you can not use it on Github pages *(By Github pages, I mean a Jekyll site hosted on Github. Actually, Github pages is a name for github project website which resides in the 'gh-pages' branch of the project)*. Github runs a limited set of plugins on its servers, which may be a problem for some. Also you are bound to use the Github default markdown parsers and syntax-highlighters.

To overcome this, you may host your website on a dedicated web server or a POS (Platform-as-a-Service) provider like Microsoft Azure. You would have to build the site locally and push it to the server manually though. The catch is, that with increasing size of your website, building it will take more and more time. I tested it with a vanilla Jekyll installation on my PC, and it took about a minute to build a site with 25 pages, but the speed may vary. You could also use an experimental feature in Jekyll 3, known as *incremental building*, which builds only the posts edited. IMO, that may be a lot of work for some, but hey!, your new shiny plugin will work now! :grimacing:

# The Github way #

Looking at the simple way first.

Jekyll follows a strict directory layout, and the native Jekyll directories and files start with an underscore. Following are the directories and files that Jekyll looks into, by default:

- **_config.yml** : This file contains all the user configuration in [YML](https://en.wikipedia.org/wiki/YAML) format. An example
{% highlight yml linenos %}
# Dependencies
markdown: kramdown
kramdown:
  input: GFM
  syntax_highlighter: rouge
  hard_wrap: false

# Permalinks
permalink:          /blog/:title
relative_permalinks: false

# Setup
title:            'your site title'
tagline:          'your site tagline'
description:      'your site description'
url:              http://site-url.com
baseurl:          /

author:
  name:           'your name'
  url:            url-to-be-displayed
{% endhighlight %}
Many of the options above may not work for your installation, they are setup-dependent.

- **_drafts** : This directory contains posts that are in drafting stage. They will not be rendered unless you use the <code>--drafts</code> switch during building (more on that later).

- **_posts** : This directory will contain all your posts in markdown format. The naming scheme is very particular. It should be in the order **YYYY-MM-DD-name.markdown**. Here YYYY represents year in 4-digits, MM represents month number in 2-digit and DD represents day of the month in 2-digit form. The name is the title of your post. The file name should not contain any spaces.

- **_site** : This directory is where all the site is built into. If your hosting your Jekyll site on a dedicated server, the contents of _site must be in your root (more on that later).

- **\_layouts** and **\_includes** : You may not see these directories if you are using Jekyll 3 or above. These directories contain the theme layout files. Starting with Jekyll 3.2, these directories are hidden from the user in the theme gem files, so as to obtain a lighter base directory structure. 

*More on directory structure [here](https://jekyllrb.com/docs/structure/).*

## Setting up Jekyll and Github

Head to [Jekyll Theme Chooser](https://pages.github.com/themes/). This will create a repository with the Jekyll directory structure with the name <code>username.github.io</code> in the <code>master</code> branch.

If you think, this is too easy for you, you can do this manually too. For that we need to setup Jekyll on your local machine first.

### Requirements:
+ GNU/Linux, MacOS or Unix (Windows is not officially supported, but it can be used with the Windows Subsystem for Linux. More [here](https://jekyllrb.com/docs/windows/). There is also a way to do it in Git Bash [here](http://programminghistorian.org/lessons/building-static-sites-with-jekyll-github-pages#on-windows-))
+ Ruby 2 or above and RubyGems
+ GCC and Make (build-essentials package in ubuntu)
+ Python 2.7 (if you decide to use Pygments highlighter, which is not used in Github Pages)

### Installing Jekyll
- Install <code>Jekyll</code> with gems
```
gem install jekyll
```
- Install <code>bundler</code>
```
gem install bundler
```
Bundler is a Ruby gem to manage a Ruby application environment with the exact gem versions needed. We will use Bundle to create a Jekyll build environment resembling that of Github, so that the our local builds will exactly match that of Github.

Before proceeding, remember to add the Ruby gem directory location to your ```$PATH``` environment variable. Just add this to your ```.bashrc```:
```
export PATH=/home/user/.gem/ruby/2.4.0/bin:$PATH
```
Replace *user* with your username and *2.4.0* part with the ruby version number. To know the ruby version number run ```ruby -v``` in your terminal emulator. The user configurable ```.bashrc``` is located under the user home directory in your Linux or \*nix system, often referenced as ```~```.

### The Jekyll skeleton
If you used the [Jekyll Theme Chooser](https://pages.github.com/themes/), a new repository will be created. You can clone the repository to your local machine, by:
```
git clone https://github.com/username/username.github.io.git
```
Now you can <code>cd</code> into the new directory created and run
```
bundle exec jekyll serve
```
This will spawn a web server on [http://127.0.0.1:4000](http://127.0.0.1:4000) by default, and you can check it out by going to the address. The above command is verbose, so it will show the Server Address it is using. If you want to see the changes you are making on-the-fly use the <code>--watch</code> switch. You have to reload it in the browser, though.
```
bundle exec jekyll serve --watch
```
Also, if you want to include the drafts in processing, use the <code>--drafts</code> switch.
```
bundle exec jekyll serve --drafts
```

#### Gem-Based Themes

If you didn't use the Jekyll Theme Chooser and went on a more adventurous way, you can create the default Jekyll directory structure in the current working directory using 
```
bundle exec jekyll new .
```
For theming, you have to use Gem based themes. These are regular gems, which contain the layout files. 

To install a Gem based theme
- Add the following to your sites <code>Gemfile</code> (if there is no <code>Gemfile</code>, create one)
```
gem "gem-based-theme-name"
```
- and then run
```
bundle install
```
- Incorporate the theme into your site by adding this line in <code>_config.yml</code>
```
theme : gem-based-theme-name
```

One advantage of such a system is that it is easily upgradeable with a simple command
```
bundle update
```
For a matter of fact only one gem may also be upgraded with
```
bundle update gem-name
```

When you are satisfied with your hard-work, you can build and spawn a local web server* for the Jekyll site with
```
bundle exec jekyll serve
```
<span style="font-size: 30px; margin: 0px;">\*</span><cite style="color: #bdbdbd; font-size: 0.9rem">*The local web server is simply provided for reviewing and debugging. It is spawned by the jekyll parser itself and does not serve the website to the internet. Although, it is possible to do so, with port-forwarding, it may involve security risks and flaws.*</cite>


*For more details on Jekyll gem based themes, look [here](https://jekyllrb.com/docs/themes/)*



<p style="color: #888888" class="message">If you made it to this point, give yourself a pat on your back, because you just read a very ill-constructed post by a person who has no experience in writing. But then, we humans learn from our own mistakes. Kindly provide your constructive criticism <sup style="font-size: 9px">abuses</sup> in the comment box below, I will be glad that you gave me <sup style="font-size: 9px">wasted</sup> your precious time on this post and will help me improve my writing.<br/><br/>But seriously, Thank you for reading!</p> 


[Jekyll Part 3 : The non-Github way]({% link _posts/2017-04-20-setting-up-jekyll-part-2.markdown %})