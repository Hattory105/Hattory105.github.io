var temp_cr_setSuspended = false;
jQuery(window).resize(function() {
	cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
});

jQuery(document).ready(function ()
{			
	console.log("=== TL ready ===");
	document.getElementById("splash").style.zIndex = "10";
	document.getElementById("splash").style.display = "inline";
	// Create new runtime using the c2canvas
	cr_createRuntime("c2canvas");
	console.log("=== TL ready 002 ===");
	
});

// Pause and resume on page becoming visible/invisible
function onVisibilityChanged() {
	if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
		temp_cr_setSuspended = false;
		cr_setSuspended(true); //pause
	}else if(document.hasFocus()){
		if(!temp_cr_setSuspended){
			cr_setSuspended(false);  //resume
		}
	}
};

//AW
function onFocused() {
	console.log("onFocused");
	if (document.hasFocus()) {
        temp_cr_setSuspended = true;
		window.focus();
		cr_setSuspended(false);
    }
};

document.addEventListener("visibilitychange", onVisibilityChanged, false);
document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
//AW
document.addEventListener("focus", onFocused, false);
function getPixelsPerCm()
{
	/*var o = document.getElementById("device_physic_pixels_per_cm");
	alert(o.offsetWidth)
	return o.offsetWidth
	*/
	return 38;
}