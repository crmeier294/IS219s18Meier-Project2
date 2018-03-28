// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function getQueryParams(qs) 
{
	 qs = qs.split("+").join(" ");
	 var params = {},
		tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;
		
	while (tokens = re.exec(qs)) 
	{
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}
	return params;
}
var $_GET = getQueryParams(document.location.search);
console.log($_GET["fname"]); // would output "John"

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrieved JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

mRequest.onreadystatechange = function() 
{
// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) 
	{
		try 
		{
			// Let’s try and see if we can parse JSON
			mJson = JSON.parse(mRequest.responseText);
			
			// LOOP THROUGH the mJSON array here and fill up the
			// mImages array with GalleryImage objects
			for( var i = 0; i < mJson.length; i++)
			{
				mImages.push(new GalleryImage(mJson));
			}
			
			// Let’s print out the JSON; It will likely show as "obj"
			console.log(mJson);
			console.log(mJson.images[1].date); // “01/02/2016”
		} 
		
		catch(err) 
		{
			console.log(err.message)
		}
	}
};
mRequest.open("GET",mUrl, true);
mRequest.send();

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() 
{
	
	// This initially hides the photos' meta data information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() 
{
	
	console.log('window loaded');

}, false);

function GalleryImage(imgPath, imgLocation, description, date) 
{
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	this.imgPath = imgPath;
	//2. description of photo
	this.imgLocation = imgLocation;
	//3. the date when the photo was taken
	this.description = description;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.date = date;
}
