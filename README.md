# 🌐 web-accessibility-helper

It is a browser extension for making web more acessible.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

## Features

* Increases contrast on texts.
* Adds `onblur` event identical to `onmouseout` if element has `onmouseout` event.
* Adds `onfocus` event identical to `onmouseover` if element has `onmouseover` event.
* Adds `alt` and `longdesc` attributes to images which do not have.
* Sets the `lang` and `xml:lang` attributes of html element by predicting the language of a document.
* Removes empty links.
* Changes `<b/>` to `<strong/>` in the document
* Changes `<i/>` to `<em/>` in the document
* Changes `<font/>` to `<p/>` in the document
* Adds `<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtdd"` to document if not exists.
* Adds a `MutationObserver` in order to listen and inform the user about interactive html changes. Added, removed or updated nodes will be read to user.

### Prerequisites

Install browserify if not exists.

```
npm install -g browserify
```

### Installing

- Clone or download the repository
- Change directory to repository directory
- Use browserify to bundle
```
browserify index.js -o bundle.js
```
- Add directory to your favorite browser's extension

## Built With

* [Browserify](http://browserify.org) - Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details

