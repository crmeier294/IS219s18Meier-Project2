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


// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


if($_GET["json"] != undefined)
{
	mUrl = $_GET["json"];
}

// swap photo function
function swapPhoto() 
{; 		
	$("#photo").attr("src", mImages[mCurrentIndex].imgPath); 
	$(".location").text("Location: " + mImages[mCurrentIndex].imgLocation);
	$(".description").text("Description: " + mImages[mCurrentIndex].description); 
	$(".date").text("Date: " + mImages[mCurrentIndex].date); 
	mCurrentIndex++;		
		
	if (mCurrentIndex >= mImages.length)
	{
		mCurrentIndex = 0;
	}
	
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
			
			for( var i = 0; i < mJson.images.length; i++)
			{
				var j = mJson.images[i];
				mImages.push(new GalleryImage(j.imgLocation, j.description, j.date, j.imgPath));
			}
			console.log(mImages);
			
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
function makeGalleryImageOnloadCallback(galleryImage) 
{
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() 
{
	
	// This initially hides the photos' meta data information
	$('.details').eq(0).show();
	
	$('#nextPhoto').click(function() {
    swapPhoto();})
	
	$('#prevPhoto').click(function() 
	{			
		if(mCurrentIndex == 0)
		{
			mCurrentIndex = mImages.length-2;
		}
		else if(mCurrentIndex == 1)
		{
			mCurrentIndex = mImages.length-1;
		}
		else
		{
			mCurrentIndex -= 2;			
		}
		swapPhoto();
	})
	
	
	$('.moreIndicator').click(function()
	{
		$("img.rot90").toggleClass("rot270", 3000);
		$('.details').slideToggle(1000);
	})
	
	
	
	
	
});

window.addEventListener('load', function() 
{
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLocation, description, date, imgPath) 
{
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	this.imgLocation = imgLocation;
	//2. description of photo
	this.description = description;
	//3. the date when the photo was taken
	this.date = date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.imgPath = imgPath;
}
//$('moreIndicator rot90').rot90;
