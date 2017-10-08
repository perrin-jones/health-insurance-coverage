var KEY = 'f36d09f45b99bbd15ea79fc4b85882d97d1a44a3';
var countyCode;
var stateCode;
var years;

function getInsuranceInformation(year, age, income, sex) {
 $.ajax({
    url: "https://api.census.gov/data/timeseries/healthins/sahie?get=PCTUI_PT,PCTUI_MOE&for=county:" + countyCode + "&in=state:" + stateCode,
     
    data: {
       time: year,
       AGECAT: age,
       IPRCAT: income,
       SEXCAT: sex,
       key: KEY
    },
    success: function(response){
      console.log(response);
      if(typeof response != 'undefined') {
          $("#results").text("Percent Uninsured: " + response[1][0] + "% with a margin of error of +/-" + response[1][1] + "% for parameters selected");
      } else {
          $("#address").text("There is no data for those given parameters. Please select new parameters and select again.");        
      }
      
    },
    error: function(response) {
      console.log(response);
     $("#address").text("Connection to US Census API Failed: Try Search Again Later");
    }
 });
}


function getAddress(ad1, ct, st, zp, year, age, income, sex){
 $.ajax({
     url: "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?format=jsonp",
    dataType: "jsonp",
    data: {
       benchmark : "Public_AR_Census2010",
       vintage : "Census2010_Census2010",
       layers: "14",
       address: ad1 + " ," + ct + " ," + st + " ," + zp
    },
    success: function(response){
      console.log(response);
      if(response.result.addressMatches[0] != null) { 
        countyCode = response.result.addressMatches["0"].geographies["Census Blocks"]["0"].COUNTY;
        stateCode = response.result.addressMatches["0"].geographies["Census Blocks"]["0"].STATE;
        getInsuranceInformation(year, age, income, sex);
      } else {
        $("#address").text("Address Not Found: Please re-enter address"); 
      }
    },
    error: function(response) {
      console.log(response);
     $("#address").text("Connection to Address API Failed: Try Search Again Later");
    }
 });
}


$(document).ready(function() {
  document.getElementById('submit-form').addEventListener('click', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    getAddress(document.getElementById('address-1').value, document.getElementById('city').value,   
               document.getElementById('state').value, document.getElementById('postcode').value,
               document.getElementById('year').value, document.getElementById('age').value,   
               document.getElementById('income').value, document.getElementById('sex').value);
  });
});