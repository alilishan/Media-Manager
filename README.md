
# Media-Manager
Project Independent Media Manager
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-1.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-2.jpg)

###Todo
* Media List filter animation
* Nice screenshots in readme
* Dark theme
* Reduce dependency on Fancybox and $Q
* Idea for Add Menu - http://codepen.io/hone/pen/jERzmd
* Minify and Pack assets - Use Grunt or Gulp

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
	postmessageParent: '*', //Please set a domain for security reasons
	fileuploadPath: 'example_files/ajax_image_upload.php',
	getMediaListing: 'example_files/mm-data.json', 
	postMediaDelete: '',
	postVirtualFile: ''
}
```
###Usage 
```javascript
	var data = {
		selectMode: '', //single or multiple [default, single]
		filterType: ''  // image, video, page [default, all]
	}

	$('your button').on('click', function(e){
		e.preventDefault();
		
		MediaManager.Open(data).then(function(resp){
			//Do Your Thing
			//Will return an array of the selcted objects.
		});

	});
```
###Required Format
```javascript
{
	"id": "",
	"name": "",
	"selected": false,
	"type": "",
	"width": "",
	"height": "",
	"ext": "png",
	"url": ""
}
```