/*decorate the header tab; begin*/
function tabHeader1() {
  document.getElementById("tabH2").classList.remove("active");
  document.getElementById("tabH3").classList.remove("active");
  document.getElementById("tabH1").classList.add("active");
  document.getElementById("formParentAndTutor").classList.add("active");
  document.getElementById("formAdmin").classList.remove("active");
  document.getElementById("email-admin").value = null;
  document.querySelector("#user").style.backgroundColor="rgba(207, 239, 244, 0.5)";
  document.querySelector("#tabH1").style.backgroundColor="rgba(207, 239, 244, 0.5)";
  document.querySelector("#tabH2").style.backgroundColor="#28a6cc";
  document.querySelector("#tabH3").style.backgroundColor="#28a6cc";
  
  
}
function tabHeader2() {
  document.getElementById("tabH1").classList.remove("active");
  document.getElementById("tabH3").classList.remove("active");
  document.getElementById("tabH2").classList.add("active");
  document.getElementById("formParentAndTutor").classList.add("active");
  document.getElementById("formAdmin").classList.remove("active");
  document.getElementById("email-admin").value = null;
  document.querySelector("#user").style.backgroundColor="rgba(141, 213, 232, 0.5)";
  document.querySelector("#tabH1").style.backgroundColor="#28a6cc";
  document.querySelector("#tabH2").style.backgroundColor="rgba(141, 213, 232, 0.5)";
  document.querySelector("#tabH3").style.backgroundColor="#28a6cc";
 
}

function tabHeader3() {
  document.getElementById("tabH1").classList.remove("active");
  document.getElementById("tabH2").classList.remove("active");
  document.getElementById("tabH3").classList.add("active");
  document.getElementById("formParentAndTutor").classList.remove("active");
  document.getElementById("formAdmin").classList.add("active");
  document.getElementById("email-input").value = null;
  document.querySelector("#admin").style.backgroundColor="rgba(75, 186, 220, 0.5)";
  document.querySelector("#tabH1").style.backgroundColor="#28a6cc";
  document.querySelector("#tabH2").style.backgroundColor="#28a6cc";
  document.querySelector("#tabH3").style.backgroundColor="rgba(75, 186, 220, 0.5)";
 ``
}

function emailToken(){
  var en="Please check your mail and insert token";
  var vn="Vui lòng kiểm tra mail và nhập token";
  var lang = localStorage.getItem('stored_lang')
  if(lang == 'en') {
    var token = prompt(en,"");
    if (token != null) {
      if(document.getElementById("email-input").value != null) {
        alert(document.getElementById("email-input").value);
      }
      else {
        alert(document.getElementById("email-admin").value);
      }
    }
  }
  else {
    var token = prompt(vn,"");
    if (token != null) {
      if(document.getElementById("email-input").value != null) {
        alert(document.getElementById("email-input").value);
      }
      else {
        alert(document.getElementById("email-admin").value);
      }
    }
  }
  
}


/*decorate the header tab; end*/