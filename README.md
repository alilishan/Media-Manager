
# Media-Manager
Project Independent Media Manager


###Dependencies
* jQuery
* Fancybox - http://fancyapps.com/fancybox/
* $Q - https://github.com/kriskowal/q

###Used
* Flexbox Grid - http://flexboxgrid.com/
* ngThumb - https://github.com/nervgh/angular-file-upload/blob/master/examples/image-preview/directives.js
* Drag Hover jQuery Plugin - 
  * http://stackoverflow.com/questions/10253663/how-to-detect-the-dragleave-event-in-firefox-when-dragging-outside-the-window/10310815#10310815
  * http://stackoverflow.com/questions/14194324/firefox-firing-dragleave-when-dragging-over-text
* [Recursive ng-repeat template](http://stackoverflow.com/questions/15661289/how-can-i-make-recursive-templates-in-angularjs-when-using-nested-objects)  


##Config

###Global 
```javascript
{
	path: 'path-to/mm-app/',
	postmessageParent: '*', //Please set a domain for security reasons
	fileuploadPath: 'example_files/ajax_image_upload.php',
	getMediaListing: 'example_files/mm-data.json', 
	postMediaDelete: '',
	postVirtualFile: '',
	flf_image: true, // flf_First Level Filters
	flf_video: true,
	flf_page: true
}
```
###Usage 
```html
	<!-- Dependencies -->
	<link rel="stylesheet" href="path-to/mm-dependencies/jq-fancybox/jquery.fancybox.css"> 

	<script src="path-to/mm-dependencies/jquery-1.12.0.min.js"></script>
	<script src="path-to/mm-dependencies/q.js"></script>
	<script src="path-to/mm-dependencies/jq-fancybox/jquery.fancybox.pack.js"></script>
	
	<!-- Media Manager  -->
	<script src="path-to/MediaManager.js"></script>
```

```javascript
	var data = {
		selectMode: '', //single or multiple [default, single]
		filterType: '',  // image, video, page [default, all]
		selectFolder: '0' //Target Folder
	}

	$('your button').on('click', function(e){
		e.preventDefault();
		
		MediaManager.Open(data).then(function(resp){
			//Do Your Thing
			//Will return an array of the selected objects.
		});

	});
```
###Required GET data format
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
Example:
```javascript
[
	{
		"id": "1",
		"name": "Motorbike",
		"selected": false,
		"type": "image",
		"width": "1080px",
		"height": "1920px",
		"ext": "png",
		"url": "http://rs1225.pbsrc.com/.../JBHDWallpapers2.jpg~c200"
	},
	{...},
	{...}
]
```

##Screenshots
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-1.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-2.jpg)