# Simple gulp package

## Quickstart

- download package
- extract to your folder with project
- install [node.js](https://nodejs.org/en/)
- install [ruby](http://railsinstaller.org/en)

After install do tis steps:

- run ruby command line
- in ruby command line run
```
gem install sass
```
- run node command line
- in node command line install gulp global
```
npm install -g gulp
```
Done. Now you have everithing to use this package

## Manually

- in node command line go to folder with your project
```
cd ~/path/to/project
```
- install npm
```
npm  install
```

## Usage

### Available Commands

- gulp : default command - Rebuild all project files
- gulp clean : remove files from build folder
- gulp watch : run local server and detect changes in files from app folder
- gulp css : optimize and minimize css in build folder

### Files and folders

- app : developer folder.
- build : production folder. Include files that compiled from app folder. generated automatically when run gulp command.


## Features
- CSS Autoprefixing
- Automagically compile Sass with libsass
- Image, css, js optimization
- Errors notification
- Css, js minimization
