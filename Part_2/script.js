var KEY = 'f36d09f45b99bbd15ea79fc4b85882d97d1a44a3';

function getAddress(query){
 $.ajax({
    url: "https://geocoding.geo.census.gov/geocoder/geographies/address?",
    data: {
       q: query,
       appid: KEY
    },
    success: function(response){
      console.log(response);
     $("#address").text(response.main);
    },
    error: function(response) {
      console.log(response);
     $("#address").text(response.main);
    }
 });
}

$(document).ready(function() {
  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    getAddress(document.getElementById('address-1').value);
}, false);
});