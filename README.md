# Media-Manager
Project Independent Media Manager

###Todo
* Info Dropdown
* Media List filter animation
* Nice screenshots in readme
* Reduce dependency on Fancybox and $Q
* Idea for Add Menu - http://codepen.io/hone/pen/jERzmd
* Minify and Pack assets - Use Grunt or Gulp
* Css preprocess - Less or Sass

###Dependencies
* jQuery
* Fancybox - http://fancyapps.com/fancybox/
* $Q - https://github.com/kriskowal/q

###Used
* Flexbox Grid - http://flexboxgrid.com/
* ngThumb - https://github.com/nervgh/angular-file-upload/blob/master/examples/image-preview/directives.js

##Config

###Global 
```javascript
{
	path: 'media-manager/',
	postmessageParent: 'http://localhost/',
	fileuploadPath: 'example_files/ajax_image_upload.php',
	getMediaListing: 'example_files/mm-data.json', 
	postMediaDelete: '',
	postVirtualFile: ''
}
```
###Open 
```javascript
{
	selectMode: '', //single or multiple [default, single]
	filterType: ''  // image, video, page [default, all]
}
```