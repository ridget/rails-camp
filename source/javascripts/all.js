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


  // Helper functions
  // submit the form and return a promise
  function submitForm(serializedData) {
    return $.ajax({ url: gappsUrl, type: "post", data: serializedData });
  }

  function showResult(result) {
    $('#result').html(result)
  }

  function enableForm(enabled) {
    $form
      .find("input, select, button, textarea")
      .prop("disabled", !enabled);
  }

  $("$sponsorship-form").validate({
    $form.submit(function(event){
      $("#sponsorship-form").validate();
      event.preventDefault();

      var serializedData = $form.serialize();
      enableForm(false);
      showResult('Sending data...');

      // fire off the request to /form.php
      submitForm(serializedData)
        .done(function() {
          showResult("Thanks for your submission!");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          showResult("Sorry, but something went wrong...");
          console.error("The following error occured: "+ textStatus, errorThrown);
        })
        .always(function () {
          enableForm(true);
        });
    });
  });
});
