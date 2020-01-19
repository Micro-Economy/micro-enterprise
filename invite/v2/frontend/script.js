var enteredCode;
var firstName;
var membershipType;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const checkCodeUrl = "http://155.138.128.168/invite/backend2/CheckCode.php";
const addMemberUrl =  "http://155.138.128.168/invite/backend2/AddMember.php";


$("#submit-code").click(()=>handleInput())


function handleInput(){
  enteredCode = $('#validation-input').val();
  if (isCorrectInput(enteredCode)){
      $('#validation-container').css('display','none');
      $('#form-container').css('display','table');
      $('#savedMembershipType').text(membershipType);
  }
  else{ 
      M.toast({html: 'Oops, Invalid Code!', classes:'teal lighten-2',inDuration:0,outDuration:10});
  }
}

function isCorrectInput(code){
    var returnStatus;
    var settings = {
      "async": false,
      "url": proxyurl+checkCodeUrl,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({"code":code}),
    };
    $.ajax(settings).done(function (response) {
      response = JSON.parse(response).response;
      console.log(response);
      if(response){
        returnStatus = response.result.status==="Valid Code" && response.result!="Invalid Code"
        
        if (returnStatus){
          membershipType = response.result.membership_type;
        }

      } else{
        returnStatus = false;
      }
    })
    return returnStatus
  }


$("#form-btn").click(()=>formSubmit())

const form = document.getElementById('psnl-form');
function formSubmit(){
    if(form.reportValidity()){
        if(sendData(enteredCode)){
            render_msg();
        }else{
            alert("An error occurred while submitting data to the server.")        
        }
    }}

function sendData(code){
  var returnStatus;
  firstName = $('#first-name').val()
  var settings = {
    async: false,
    type: "POST",
    url: proxyurl+addMemberUrl,
    data:JSON.stringify({  "first_name":firstName ,
            "last_name" : $('#last-name').val(),
            "student_number": $('#std-no').val(),
            "email_id": $('#email').val(),
            "utor_id": $('#utorid').val(),
            "code_used": code,
            "member_type": membershipType
        })}
  $.ajax(settings).done(function (response){
    // POST was successful - do something with the response
    jsonData=JSON.parse(response).response;
    // console.log('Form Authentication response below')
    // console.log(jsonData)
    if (jsonData){
    returnStatus=(jsonData.status==="success" && jsonData.result.status==="success")}
    else{
    returnStatus = false;
    }
  });
  return returnStatus;
}

function render_msg(){
    $('#savedFirstName').text(firstName);
    $('#form-container').css('display', 'none');
    $("#onboard-msg").css('display', 'block');
}