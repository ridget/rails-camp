//= require_tree .

var map;
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.986682, lng: 138.691938},
    zoom: 10
  });

  var marker = new google.maps.Marker({
    position: {lat: -35.0655083, lng: 138.75600800000007},
    map: map
  });
}


// ***************************************************************
// @author = Abhinav Rana, abhinav.rana1990@gmail.com
// @date = 13 Feb, 2015
//  @version = 0.1
//
// *************************************************************************************************************************
// functions: a sample code to store data from html form to google sheet
// *************************************************************************************************************************
jQuery( document ).ready(function( $ ) {
	// variable to hold request
	var request;
	// bind to the submit event of our form
	$("#foo").submit(function(event){
		// abort any pending request
		if (request) {
			request.abort();
		}
		// setup some local variables
		var $form = $(this);
		// let's select and cache all the fields
		var $inputs = $form.find("input, select, button, textarea");
		// serialize the data in the form
		var serializedData = $form.serialize();

		// let's disable the inputs for the duration of the ajax request
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
		$inputs.prop("disabled", true);
		$('#result').text('Sending data...');

		// fire off the request to /form.php
		request = $.ajax({
			url: "https://script.google.com/macros/s/AKfycbxzteFiAyW9BubEPux_pNE6yx_fKE2MB21Sz4tPpbMGuPPAJurX/exec", //url to web app created by us from our Google spreadsheet
			type: "post",
			data: serializedData
		});

		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// log a message to the console
			$('#result').html('<a href="https://docs.google.com/spreadsheets/d/1mxswRx4Af4yKxj5sRDUdjvRkgl-ggcEhhv0SpPyyyN4/edit#gid=0" target="_blank">Success - see Google Sheet</a>');
			console.log("Hooray, it worked!");
		});

		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			console.error(
				"The following error occured: "+
				textStatus, errorThrown
			);
		});

		// callback handler that will be called regardless
		// if the request failed or succeeded
		request.always(function () {
			// reenable the inputs
			$inputs.prop("disabled", false);
		});

		// prevent default posting of form
		event.preventDefault();
	});
});
