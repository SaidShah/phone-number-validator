const APIkey = ""
const URL = "http://apilayer.net/api/validate"
// to use you need
//url+APIkey+&number=435435345+&country_code=&format=1
// after the url you need a ? then the access_key= YOUR ACCESS KEY
// then you add a & to state you will enter more data so the next part would be
// &number=YOUR PHONE NUMBER HERE       then you have to enter another & to enter more data so the next part would be
// &country_code=YOUR COUNTRY CODE      then you have to enter another & to enter more data so the next part would be
// &format=1   the 1 is to specify you would like the response in json format
document.addEventListener("DOMContentLoaded",(event)=>{

  document.getElementsByClassName("submit-button")[0].addEventListener("click", grabNumber)

})

function grabNumber(givenEvent) {
  const number = givenEvent.target.previousElementSibling.value
  if(number.length != 10){
      giveError(number)
  }else{
      checkNumber(number)
  }
}

function giveError(givenNumber){
  const div = document.getElementById("response-div")
  let h2;
  if(givenNumber.length > 0){
    h2 = `<h2 style=color:red>${givenNumber} is an invalid number, please enter a valid 10-digit number</h2>`
    div.innerHTML=h2
  }else{
    h2 = `<h2 style=color:red>Please enter a valid 10-digit number</h2>`
    div.innerHTML=h2
  }
}

function checkNumber(givenNumber){
  let urlLink = URL+"?"+APIkey+"&number="+givenNumber+"&country_code=US&format=1"
  fetch(urlLink)
  .then(res=>res.json())
  .then(displayResults)
}

function displayResults(givenResults) {
  const div = document.getElementById("response-div")
  let result;
    if (givenResults.valid === true){
            result = `<h3>Carrier: ${givenResults.carrier}</h3><br>
                      <h3>Country Name: ${givenResults.country_name}<h3><br>
                      <h3>Registered City: ${givenResults.location}</h3><br>
                      <h3>Phone Type ${givenResults.line_type}</h3><br>`
   }else{
      result = "<h2>THE NUMBER IS NOT VALID<h2>"
   }
   div.innerHTML = result
}
