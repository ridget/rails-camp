//= require_tree .

var map;
function initMap() {
  var mapDiv = document.getElementById('map');
  if (!mapDiv) return;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.986682, lng: 138.691938},
    zoom: 10
  });

  var marker = new google.maps.Marker({
    position: {lat: -35.0655083, lng: 138.75600800000007},
    map: map
  });
}


jQuery( document ).ready(function( $ ) {
  var $form = $('#sponsorship-form');
  var gappsUrl = "https://script.google.com/macros/s/AKfycbxzteFiAyW9BubEPux_pNE6yx_fKE2MB21Sz4tPpbMGuPPAJurX/exec"

  // Don't fire if no form on page
  if ($form.length === 0) return

  // submit the form and return a promise
  function submitForm(serializedData) {
    return $.ajax({ url: gappsUrl, type: "post", data: serializedData });
  }

  // show a result -- what happened?
  function showResult(result) {
    $('#result').html(result).show()
  }

  // enable or disable the form during submission
  function enableForm() {
    toggleForm(true);
  }

  function disableForm() {
    toggleForm(false);
  }

  function toggleForm(enabled) {
    $form
      .find("input, select, button, textarea")
      .prop("disabled", !enabled);

    if (enabled) $form.show()
    else $form.slideUp()
  }

  // handle the form submission -- coordination
  function submitHandler (form, event) {
    event.preventDefault();

    var serializedData = $form.serialize();
    showResult("<div class='alert alert-notice'>Just a moment, submitting your form now...</div>");
    disableForm()

    // fire off the request
    submitForm(serializedData)
      .done(function() {
        showResult("<div class='alert alert-info'>Thanks for your submission! We'll review it shortly.</div>");
      })
      .fail(function() {
        showResult("<div class='alert alert-error'>Sorry, but something went wrong...>");
        console.error("The following error occured: ", arguments);
        enableForm();
      })
  }

  // Setup validator, and submit handler pass through when valid
  $form.validate({
    submitHandler: submitHandler,
    errorPlacement: function(error, element) {
      if (element.is(":checkbox")) {
        error.appendTo(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
  });
});
