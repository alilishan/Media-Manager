
# Media-Manager
Project Independent Media Manager


###Dependencies
* jQuery
* Fancybox - http://fancyapps.com/fancybox/
* $Q - https://github.com/kriskowal/q

###Used
* Pixie - Image Editor - http://codecanyon.net/item/pixie-image-editor/10721475
* Flexbox Grid - http://flexboxgrid.com/
* ngThumb - https://github.com/nervgh/angular-file-upload/blob/master/examples/image-preview/directives.js
* Drag Hover jQuery Plugin - 
  * http://stackoverflow.com/questions/10253663/how-to-detect-the-dragleave-event-in-firefox-when-dragging-outside-the-window/10310815#10310815
  * http://stackoverflow.com/questions/14194324/firefox-firing-dragleave-when-dragging-over-text
* [Recursive ng-repeat template](http://stackoverflow.com/questions/15661289/how-can-i-make-recursive-templates-in-angularjs-when-using-nested-objects)  
* [ng ui-sortable](https://github.com/angular-ui/ui-sortable)
* [tg-dynamic-directive used with ui-sort](https://github.com/thgreasi/tg-dynamic-directive)
* [ngRepeat filter: comparator](http://stackoverflow.com/questions/21519794/angular-function-filter-comparator-example)

##Config

###Global 
```javascript
MediaManager.Initialize(({
	path: 'path-to/mm-app/',
	postmessageParent: '*', //Please set a domain for security reasons
	fileuploadPath: 'example_files/ajax_image_upload.php',
	getMediaListing: 'example_files/mm-data.json', 
	postMediaUpdates: '',
	postMediaDelete: '',
	postVirtualFile: '',
	postFolderSave: '',
	postPixieImageCreate: '/mm-app/pixie/save-image.php',
	flf_image: true, // flf_First Level Filters
	flf_video: true,
	flf_page: true
});
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
		selectMode: '', //single or multiple or manage [default, single]
		filterType: '',  // image, video, page [default, all]
		selectFolder: '0' //Target Folder
	}
	
	//Fancybox Methods & Callbacks are exposed - http://fancyapps.com/fancybox/
	MediaManager.fancybox.afterClose = function(){
		console.log('closed')
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
	"folders": {
		"version": "1.0.0",
		"items": [
			{
				"id":"", 
				"name": "", 
				"items": []
			}
		]
	},
	"media": [
		{
			"id": "",
			"name": "",
			"selected": false,
			"type": "",
			"folder": "",
			"width": "",
			"height": "",
			"ext": "png",
			"url": "", //Maybe thumbnail or preview
			"path": "" //Full Path to the File
		}
	]
}
```
Example:
```javascript
{
	"folders": {
		"version": "1.0.0",
		"items": [
			{
				"id":"1", 
				"name": 
				"Project A", 
				"items": [
					{
						"id":"", 
						"name": "", 
						"items": []
					},
					{....}
				]
			},
			{...},
			{...}
		]
	},
	"media": [
		{
			"id": "1",
			"name": "Motorbike",
			"selected": false,
			"type": "image",
			"folder": "1",
			"width": "1080px",
			"height": "1920px",
			"ext": "png",
			"url": "http://rs1225.pbsrc.com/.../JBHDWallpapers2.jpg~c200",
			"path": "http://rs1225.pbsrc.com/.../JBHDWallpapers2.jpg~c200"
		},
		{...},
		{...}
	]
}
```

###Required Folder Update Responses
```javascript
{
	"status": "true", /"false"
	"message": "",
	"data": {...}
}
```

##Screenshots
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-1.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-2.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-3.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-4.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-5.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-6.jpg)
![alt tag](https://raw.githubusercontent.com/alilishan/Media-Manager/master/example_files/screenshot-7.jpg)


##Good Read
* [Recursive data strunctures](http://blog.wax-o.com/2014/01/how-to-find-deep-and-get-parent-in-javascript-nested-objects-with-recursive-functions-and-the-reference-concept-level-beginner/)


###PHP Helper Function to Build Tree
http://stackoverflow.com/questions/13877656/php-hierarchical-array-parents-and-childs
```php
function buildTree(array $elements, $parentId = 0) {
    $branch = array();

    foreach ($elements as $element) {
        if ($element['parent_id'] == $parentId) {
            $children = buildTree($elements, $element['id']);
            if ($children) {
                $element['children'] = $children;
            }
            $branch[] = $element;
        }
    }

    return $branch;
}

$tree = buildTree($rows);

print_r( $tree );
```