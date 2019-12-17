# BlueValue assignment 
(by Evgeny Tomsen)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `npm ci` install from the prj folder with `ci` to respect the package-lock

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Issues

* Graph model is not fully synchronized with the go-js component (first sync is top-down model->gojs model, but then on go-js graph update the model is not recomputed)
* there are some model serializer issues which you can see in console log, but not critical
* [ember-cli-summernote-editor](https://www.npmjs.com/package/ember-cli-summernote-editor) was not use as it has an opened bug for the `@babel/runtime` incompatibility with the latest ember. had to import summernote manually as the third party vendor lib
* summernote editor computes height automatically on assignment, so I've calculated the scroll height, but don't set it as it is already there.
