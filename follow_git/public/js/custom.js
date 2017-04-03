/* Write here your custom javascript codes */

/*confirm password*/
jQuery(document).ready(function() {
        $('#register').click(function(){
            var pass = $('#password').val();
            var pass2 = $('#repassword').val();
            if (pass == '')
                alert('Please enter a password');
            else if (pass2 == '')
                alert('Please re-enter the password');
            else if (pass != pass2)
                alert('The passwords do not match!');
            else
            	window.location.href = "login.html";

        });   
    });