/** Version: 1.0
 *  Project: Sorrento by the Sea - luxury apartment located on the picturesque Mornington Peninsula
 *  Company: Sorrento
 *  Program: Images - Include a slideshow of images to showcase the apartment’s features on the home page. 
 * 			 The slideshow provides multiple visual navigation mechanisms, 
 *			 including previous and next buttons, and thumbnails.
 */
var slideIndex = 1;
showSlides(slideIndex);

/**
 * Next/previous controls
 * @param {n} the index of the slide show
 */
function plusSlides(n) {
	showSlides(slideIndex += n);
}

/**
 * Thumbnail image controls
 * @param {n} the index of the current slide show
 */
function currentSlide(n) {
	showSlides(slideIndex = n);
}

/**
 * Show the images in the slideshow
 * @param {n} the index of the slide show
 */
function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slideShow");
	var thumbnail = document.getElementsByClassName("thumbnail");
	var captionText = document.getElementById("caption");
	if (n > slides.length) 
	{
		slideIndex = 1;
	}
	if (n < 1)
	{
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) 
	{
		slides[i].style.display = "none";
	}
	for (i = 0; i < thumbnail.length; i++) 
	{
		thumbnail[i].className = thumbnail[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	thumbnail[slideIndex-1].className += " active";
	captionText.innerHTML = thumbnail[slideIndex-1].alt;
} 