$("#submit-message").click(()=>sendMessageToDatabase());

function sendMessageToDatabase(){
    fullName = $('#full-name').val();
    emailId = $('#email-id').val();
    subject = $('#subject').val();
    comments = $('#comments').val();
    console.log(fullName + emailId + subject + comments);
}