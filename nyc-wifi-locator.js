//NEW YORK CITY PUBLIC WI-FI LOCATOR APP: FULFILLMENT OF CREATE TASK REQUIREMENTS
// Instructions for Input: Yes (5 instances of instructions for user input)
// List: Yes (12 lists)
// Procedure that contributes to overall app purpose: Yes (1 procedure)
// Parameter: Yes (1 parameter)
// Algorithm that includes sequencing, selection, and iteration: Yes (1 algorithm)
// Call to Procedure: Yes (1 call to procedure)
// Instructions for Output: Yes (1 instance of instructions for output)
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GLOBAL VARIABLES
// Dataset Lists:
//  lists created from columns from the dataset "NYC Public Wifi Locations"
var providers = getColumn("NYC Public Wifi Locations", "Provider");
var streetAddresses = getColumn("NYC Public Wifi Locations", "Location");
var postalCodes = getColumn("NYC Public Wifi Locations", "Postal Code");
var accessLocations = getColumn("NYC Public Wifi Locations", "Access Location");
var boroughs = getColumn("NYC Public Wifi Locations", "Borough");
var neighborhoods = getColumn("NYC Public Wifi Locations", "Neighborhood");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//ON EVENTS
// Search by Postal Code Button On Event:
//  when "buttonHome" (Search by Postal Code button) on "screenHome" is clicked, the screen changes from "screenHome" to "screenSearch"
onEvent("buttonHome", "click", function() {
  setScreen("screenSearch");
});

// Back Arrow Button On Event:
//  when "buttonBackSearch" (the back arrow button) in the upper left-hand corner of the "screenSearch" is clicked:
//  the screen changes from "screenSearch" to "screenHome"
//  "inputSearch", the input field on "screenSearch", is cleared
//  "outputSearch", the output text area on "screenSearch", is set to contain specific text
onEvent("buttonBackSearch", "click", function() {
  setScreen("screenHome");
  setText("inputSearch", "");
  setText("outputSearch", "(Wi-Fi locations in the postal code area you entered above will appear here. " + 
  "Information about the provider, street address, access location, borough, and neighborhood will also appear here for each Wi-Fi location.)");
});

// Input Search On Event:
//  when there is user input in "inputSearch" on "screenSearch", the function postalCodeFilter runs
onEvent("inputSearch", "change", function() {
  postalCodeFilter(getText("inputSearch"));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCTION DECLARATIONS
// Filter by Postal Code Function:
//  the function postalCodeFilter takes in the parameter postalCode, which is equal to the user input into "inputSearch"
//  "outputSearch", the output text area on "screenSearch", is cleared
//  empty lists are created for lists that will take in filtered items from the Dataset Lists (see GLOBAL VARIABLES for Dataset Lists declarations)
//  a new variable, postalCodePresent, is created. postalCodePresent will change in value depending on the value of the postalCode parameter
function postalCodeFilter(postalCode) {
  setText("outputSearch", "");
  var filteredProviders = [];
  var filteredStreetAddresses = [];
  var filteredAccessLocations = [];
  var filteredBoroughs = [];
  var filteredNeighborhoods = [];
  var output = [];
  var postalCodePresent;
//  for loop that filters through the postalCodes lists 
//  for every item in postalCode list at position i (i < length of postalCodes list), if postalCode equals a postalCode in the list at position i . . .
//  . . . then items at position i in Dataset Lists are appended to filtered dataset lists and the variable postalCodePresent is set equal to "yes"
  for(var i=0; i<postalCodes.length; i++){
    if(postalCode == postalCodes[i]) {
        appendItem(filteredProviders, providers[i]);
        appendItem(filteredStreetAddresses, streetAddresses[i]);
        appendItem(filteredAccessLocations, accessLocations[i]);
        appendItem(filteredBoroughs, boroughs[i]);
        appendItem(filteredNeighborhoods, neighborhoods[i]);
        postalCodePresent = "yes";
    }
  }
//  if statement that, if postalCodePresent is equal to  "yes", then a for loop runs . . .
//  . . . else,(postalCodePresent does not equal "yes"), the for loop does not run and a message is displayed in "outputSearch"
  if(postalCodePresent == "yes") {
//  for loop that appends items to the output list from filtered dataset lists
//  for every value of k (k < length of filteredStreetAddresses list), items are appended to the output list from filtered lists at position k
  for(var k=0; k<filteredStreetAddresses.length; k++){
      appendItem(output, "•Provider: " + filteredProviders[k]);
      appendItem(output, "•Street Address: " + filteredStreetAddresses[k]);
      appendItem(output, "•Access Location: " + filteredAccessLocations[k]);
      appendItem(output, "•Borough: " + filteredBoroughs[k]);
      appendItem(output, "•Neighborhood: " + filteredNeighborhoods[k]);
      appendItem(output, "");
      }
  setText("outputSearch", output.join("\n"));
  } else {
    setText("outputSearch", "The text you entered may not be a postal code or it may not be present in the dataset. " 
    + "Please enter a five-digit number that corresponds to a postal code in New York City, i.e. 10004.");
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SOURCES
// Dataset:
//  "NYC Public Wifi Locations": studio.code.org/docs/concepts/data-library/nyc-public-wifi-locations/
// Images:
//  NYC Skyline: thejewelny.com/gallery/neighborhood/new-york-city-skyline-midtown-and-empire-state-building-2/
//  Back Button (code.org icon): icon://fa-arrow-circle-o-left
