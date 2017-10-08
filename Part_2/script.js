var KEY = 'f36d09f45b99bbd15ea79fc4b85882d97d1a44a3';

function getAddress(ad1, ad2, ct, st, zp){
 $.ajax({
     url: "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?format=jsonp",
    dataType: "jsonp",
    data: {
       format: "json",
       benchmark : "Public_AR_Census2010",
       vintage : "Census2010_Census2010",
       layers: "14",
       address: ad1 + ct + st + zp
    },
    success: function(response){
      console.log(response);
     $("#address").text("success");
    },
    error: function(response) {
      console.log(response);
     $("#address").text("error");
    }
 });
}

$(document).ready(function() {
  document.getElementById('submit-form').addEventListener('click', function (e) {
    alert("it worked");
    e.preventDefault(); //prevent a submit button from submitting a form.
    getAddress(document.getElementById('address-1').value, document.getElementById('city').value,   
               document.getElementById('state').value, document.getElementById('postcode').value);
  });
});