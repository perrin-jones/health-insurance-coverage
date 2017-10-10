var KEY = 'f36d09f45b99bbd15ea79fc4b85882d97d1a44a3';
var countyCode;
var stateCode;
var years;

// Return an array of the selected opion values
// select is an HTML select element
//Modified from https://stackoverflow.com/posts/5867262
//Does not work, so function has been taken out
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

//Did not work, so taken out to produce working model
//function goThroughVar(year,age,income,sex){
//  for(int i = 0; i < getSelectValues(year).length; i++) {
//      getInsuranceInformation(year[i],age,sex,income);
//  }
//}

function getInsuranceInformation(year, age, income, sex) {
 $.ajax({
    url: "https://api.census.gov/data/timeseries/healthins/sahie?get=NIC_PT,NIC_MOE,NUI_PT,NUI_MOE,PCTIC_PT,PCTIC_MOE,PCTUI_PT,PCTUI_MOE&for=county:" + countyCode + "&in=state:" + stateCode,
     
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
          var num = parseInt(response[1][0]) + parseInt(response[1][2]);
          var moe = (parseInt(response[1][0])*(.01)*parseInt(response[1][1]) + parseInt(response[1][2])*(.01)*parseInt(response[1][3]))/num;
          $("#address1").text("Numer of People: " + num + " with a margin of error of +/-" + moe + "% for parameters selected");
          $("#address2").text("Insured: " + response[1][4] + "% with a margin of error of +/-" + response[1][5] + "% for parameters selected");
          $("#address3").text("Uninsured: " + response[1][6] + "% with a margin of error of +/-" + response[1][7] + "% for parameters selected");
      } else {
          $("#address1").text("There is no data for those given parameters. Please select new parameters and select again.");        
      }
      
    },
    error: function(response) {
      console.log(response);
     $("#address1").text("Connection to US Census API Failed: Try Search Again Later");
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
        //goThroughVar(year,age,income,sex);
        getInsuranceInformation(year, age, income, sex);
      } else {
        $("#address1").text("Address Not Found: Please re-enter address"); 
      }
    },
    error: function(response) {
      console.log(response);
     $("#address1").text("Connection to Address API Failed: Try Search Again Later");
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