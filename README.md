Symfony Grunt Sass Edition
=====================

This is a Symfony Edition that uses a grunt configuration for styles and javascripts.  I built 
a way where i can create and edit my styles and javascripts and symfony does not need to worry about a 
configuration. You can build check and create a complete javascript file using es6. Watch your files
being created on the fly and test your application. And when you are done create the minified files
you want and use on a real project.

## Requirements

- npm
- grunt (`sudo npm install -g grunt-cli`)

## Installation

```
> composer install
> npm run build
> npm run watch
> npm run prod (when deploying)
```

## Grunt Tasks

- `clean`: removes `web/_static` contents
- `jshint`: detect errors in your javascipt
- `browserify`: compile javascript in one file using browserify and babel
- `uglify`: minify your javascipt
- `sasslint`: detect malfunctions in the sass files
- `sass`: compiles the scss files into one css file
- `cssmin`: minify your css
- `modernizr`: install/configure modernizr based on your javascript files\
- `watch`: watches filechanges and runs development compile
- *(default)*: runs all development tasks
- *(watcher)*: runs the watcher (use `npm run watch`)
- *(prod)*: runs all the above and compiles tje js and css

## Summary of changes from the Symfony Standard Edition

### New Files

- `gruntfile.js`: configures grunt, assets for minification are pulled from the above `assets.json`
- `web/demo/scss/*`: sass files (for compilation)
- `web/demo/scripts/*`: javascript files for your project (for compilation)

### Modified Files

- `app/Resources/views/base.html.twig`: modified the `stylesheets` and `javascripts` block to load these assets
 based on the style and javascript files created in the grunt environment.

### Bower files and info

I added a default setup for bootstrap and font-awesome for example usage. The demo.scss has a link to these files. 
In a grunt task i use a copy command to copy the fonts to the web/demo/fonts directory. These are just used for example 
usage, if you want to use some other library you can just change them and create something awesome. I also 
added a plain old javascipt file using jQuery data as an example you can use your old files.

### Other Changes

- Changed the demo page using my styles and javascript.

### Info
Based on [https://github.com/kbond/symfony-grunt-edition]