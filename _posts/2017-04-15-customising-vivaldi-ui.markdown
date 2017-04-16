---
title: Customising Vivaldi UI
layout: post
description: Customising Vivaldi UI with CSS
tags: [Vivaldi,modding]
---

Vivaldi is an awesome browser. Built on the chromium project, it can act as a perfect replacement for Google Chrome and Chromium browser. But, there are some quirks, that I felt needed to be straightened out.

The browser features an omnibox, which is one of the selling features of the Chrome Browser. In addition, Vivaldi also features a separate search box, with a number of search engines pre-configured. This arrangement gives Vivaldi an Opera-esque feel, which was probably the developers initial intention with the project.

Personally, I feel the search bar is a redundant feature, when there is an omnibar already present. Sure, the omnibar can't be used to search URLs and so, but for me, the search bar acts as a vestige.

Fortunately, the Vivaldi Browsers look and feel is quite customisable, that too with CSS! I didn't go into the details of the Vivaldi UI implementation, but taking a quick look at the Chrome Debug Tools interface, the Vivaldi UI is actually built in a Chrome extension. So, the look and feel can be customised very easily with only some CSS and JavaScript files. I actually tried hooking up the UI with jQuery, but that didn't seem to work.

## Getting under the Hood ##

The Vivaldi installation directory contains a <code>Resources</code> folder, which has all the files we need to mod. I am on an Arch Linux system, so for me the files were in <code>/opt/vivaldi/resources/vivaldi</code> location. For Windows, look into your <code>Program Files</code> folder for <code>Vivaldi</code>. 

### browser.html ###

This is the file which defines the UI for Vivaldi.

The default code in <code>browser.html</code> should be like this (may vary with version)

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Vivaldi</title>
    <link rel="stylesheet" href="style/common.css" />
  </head>
  <body>
    <div id="app" />
    <script src="localeSettings-bundle.js"></script>
    <script src="vendor-bundle.js"></script>
    <script src="settings-bundle.js"></script>
    <script src="urlbar-bundle.js"></script>
    <script src="components-bundle.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
{% endhighlight %}

Add a <code>link</code> tag under line 6, with href to <code>"style/custom.css"</code>. This file will contain all our custmisations. **Note that the browser.html file will be overwritten everytime the Vivaldi Browser is updated. So this line must be added again, after updating.**

After adding the new <code>link</code> tag, <code>browser.html</code> should look like this.

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Vivaldi</title>
    <link rel="stylesheet" href="style/common.css" />
    <link rel="stylesheet" href="style/custom.css" />
  </head>
  <body>
    <div id="app" />
    <script src="localeSettings-bundle.js"></script>
    <script src="vendor-bundle.js"></script>
    <script src="settings-bundle.js"></script>
    <script src="urlbar-bundle.js"></script>
    <script src="components-bundle.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
{% endhighlight %}

### custom.css ###

Now navigate to the <code>style</code> folder and create a <code>custom.css</code> file. Write the following in <code>custom.css</code> and save it.

{% highlight css linenos %}
.searchfield {
    display:none;
}
{% endhighlight %}

You can customise more eements of the UI. For example to hide the home button you can add this in <code>custom.css</code>.

{% highlight css linenos %}
.button-toolbar.home {
    display: none;
}
{% endhighlight %}

The UI elements are assigned various CSS classes. You can find out more about them in the <code>common.css</code> file. You can customise every element of the browser, just find the appropriate class and modify it in <code>custom.css</code>. Be sure to use the <code>!important</code> CSS rule, if your changes do not get reflected as they may be over-ridden.
{% highlight css linenos %}
.searchfield {
    display:none !important;
}
{% endhighlight %}