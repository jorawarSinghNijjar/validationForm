
let email = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
let phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
let validation = false;

function createTick(inputBoxId){
    
        $(`#${inputBoxId}`).after(`<img src='checked.png' id='tick-${inputBoxId}'></img>`);
        $(`#tick-${inputBoxId}`).css( 
            {
            "width":"40px",
            "float":"left",
            "position":"relative",
            "top":"-5px",
            "left":"10px"
            }
        );
        validation=true;
   
}
//Please try again! Email should be of this format yourname@yourmail.com
function createError(inputBoxId,message){
 
        $(`#${inputBoxId}`).after(`<img src='cancel.png' id='wrong-${inputBoxId}'></img>`);
        $(`#wrong-${inputBoxId}`).after(`<label class="message">${message}</label>`);
        $(`#wrong-${inputBoxId}`).css( 
            {
            "width":"40px",
            "float":"left",
            "position":"relative",
            "top":"-5px",
            "left":"10px"
            }
        );
        validation=false;

}

function removeTick(tickId){
    
        $(`#tick-${tickId}`).remove();
}

function removeError(inputBoxId){

        $(`#wrong-${inputBoxId}`).remove();
        $(`.message`).remove();

}

function loading(inputBoxId){
    $(`#${inputBoxId}`).after(`<img src='loading.gif' id='loading-${inputBoxId}'></img>`);
    $(`#loading-${inputBoxId}`).css( 
        {
        "width":"30px",
        "float":"left",
        "position":"relative",
        "left":"10px"
        }
    );
}

function removeLoading(loadingId){
    $(`#loading-${loadingId}`).remove();
}

function testInput(testData,re,inputId,message){
    $("#missing").hide();
    $("#logged-in").hide();
    $("#invalid-field").hide();
    removeTick(inputId);
    removeError(inputId);
    loading(inputId);
    if(testData === ""){
        removeTick(inputId);
        removeError(inputId);
        removeLoading(inputId);
    }
    else if(inputId === "conf-password"){
        console.log("inside conf")
        if($("#password").val() == $("#conf-password").val()){
            console.log("match")
            setTimeout(load,2000);
            function load(){
                removeLoading(inputId);
                createTick(inputId);
            }
        }
        else{
            console.log("no match")
            setTimeout(load,2000);
            function load(){
                removeLoading(inputId);  
                createError(inputId,message);
            }
        }
    }
    else if(re.test(testData)){ 
        setTimeout(load,2000);
        function load(){
            removeLoading(inputId);
            createTick(inputId);
        }
        
    }
    else{
        setTimeout(load,2000);
        function load(){
            removeLoading(inputId);  
            createError(inputId,message);
        }
    }
}

$("#email").blur(function (e) { 
    e.preventDefault();
    let emailInput = $("#email").val();
    testInput(emailInput,email,"email","Email should be of this format yourname@yourmail.com");
});

$("#phone").blur(function (e) { 
    e.preventDefault();
    let phoneInput = $("#phone").val();
    testInput(phoneInput,phone,"phone","Please enter a valid number or check the format!");
});

$("#password").blur(function (e) { 
    e.preventDefault();
    let passwordInput = $("#password").val();
    testInput(passwordInput,password,"password","Password must contain atleast 1 special character, 1 capital letter and 1 number");
});

$("#conf-password").blur(function (e) { 
    e.preventDefault();
    let confPasswordInput = $("#conf-password").val();
    testInput(confPasswordInput,password,"conf-password","Password did not match!");
});


$("button").click(() =>{
    let phoneInput = $("#phone").val();
    let emailInput = $("#email").val();
    let passwordInput = $("#password").val();
    let confPasswordInput = $("#conf-password").val();
    $("#missing").hide();
    $("#logged-in").hide();
    $("#invalid-field").hide();
    if(emailInput==="" || phoneInput ==="" || passwordInput ==="" || confPasswordInput==="" ){
        $("#missing").show();
    }
    else if(!validation){
        $("#invalid-field").show();
    }
    else if(validation){
        $("#missing").hide();
        let input = $("#email").val();
        $("#username").html(`${input}`);
        $("#logged-in").show();

        setTimeout(function(){
            $("#logged-in").hide();
        },5000);

    }
    
});
