---
title: Jekyll Part 3, Not using Github
layout: post
---

# The other way #

This is for you if
1. You want to host your website on a dedicated web-server.
2. You want to bypass Githubs Jekyll parser.
3. You want to use your own Jekyll installation to build your web site.

If you dig a little bit deeper, you may find an entry for the <code>_site</code> directory in the <code>.gitignore</code> file, which means that, Github totally neglects your locally built site. 

1. So, first of all remove this entry from the <code>.gitignore</code> file and add a <code>.nojekyll</code> file in the same directory. This will tell Github not to build the site on its end.

2. For the hosting to work we need the <code>_site</code> directory as our site root. So, the contents of <code>_site</code> directory should be at the root of the <code>master</code> branch of our repository. The simple way is to create two separate repositories for the <code>source</code>**\*** and <code>destination</code>**\*** of the Jekyll builds, but that does not make sense. Your whole website should be contained in one repository. It is time-consuming to switch between two different repositories and push them separately. We can create nested git repositories for this. Now comes the tricky part. :smiling_imp:
<br/><span style="font-size: 30px; margin: 0px;">\*</span><cite style="color: #bdbdbd; font-size: 0.9rem">*The **source** of a Jekyll build is the root directory containing the Jekyll directory structure. The **destination** of the Jekyll build is the **\_site** directory. Jekyll takes all the configuration and post files from the **source** and translates them to a website at the **destination** directory.*</cite>

3. You should have a little understanding about git and its inner workings. This part is not as complicated as I will make it sound, though.

