Symfony Grunt Sass Edition
=====================

This is a Symfony Edition that replaces Assetic with a grunt configuration.  I have some taken some
liberties based on my development style.  When doing frontend development, I added a watch task to
the grunt configuration becouse i like watch tasks, i like my updates to be instant.  This edition
allows for your frontend assets to be linked to the source in development and linked to the minified
version in production.

## Requirements

- npm
- bower (`sudo npm install -g bower`)
- grunt (`sudo npm install -g grunt-cli`)

## Installation

```
> composer install
> bower install
> npm install
> grunt
> grunt prod (when deploying)
```

## Grunt Tasks

- `clean`: removes `web/_static` contents
- `jshint`: detect errors in your javascipt
- `concat`: compile javascript in one file
- `uglify`: minify your javascipt
- `cssmin`: minify your css
- `modernizr`: install/configure modernizr based on your javascript files\
- `watch`: watches filechanges and runs development compile
- *(default)*: runs all development tasks
- *(prod)*: runs all the above

## Configuration

To configure the assets for you project, add them to `app/config/assets.json`.  Both Symfony2 and grunt use
this configuration.

## Summary of changes from the Symfony Standard Edition

### New Files

- `bower.json`: bower package configuration
- `.bowerrc`: bower configuration to install frontend assets to `web/vendor`
- `package.json`: npm package configuration (for grunt)
- `app/config/assets.json`: global asset configuration
- `app/config/config.php`: sets a Symfony2 parameter based on the above `assets.json` configuration
- `gruntfile.js`: configures grunt, assets for minification are pulled from the above `assets.json`
- `app/Resources/scss/*`: sass files
- `app/Resources/js/*`: javascript files for your project

### Modified Files

- `app/config/config.yml`: added twig global variable `app_assets` which is set to the parameter set in `config.php`
- `app/Resources/views/base.html.twig`: modified the `stylesheets` and `javascripts` block to load these assets
 based on the above `app_assets` configuration (`app.debug=true`: source is used, `app.debug=false`: min is used)

### Bower files and info

I added a default setup for bootstrap and fontawesome for example usage. The source.scss has a link to these files. 
In a grunt task i use a copy command to copy the fonts to the web/fonts directory. These are just used for example 
usage, if you want to use some other library you can just change them and create something awesome.

### Other Changes

- Removed Assetic
- Simplifed AppBundle

### Info
Based on [https://github.com/kbond/symfony-grunt-edition]