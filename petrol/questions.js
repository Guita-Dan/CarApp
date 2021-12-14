function submitnext(){
  var a=document.getElementById("q0-0");
  var b=document.getElementById("q0-1");
  if(a.checked==false && b.checked==false){
  alert("Please select one!");
  return false;
  }
  if(a.checked==true){
   window.location.href="start/q1.html";
  }
  else{
     window.location.href="nostart/q1.html";
  }
  }
