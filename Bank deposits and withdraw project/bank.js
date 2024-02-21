
function handle_deposite()
{
    var inputval =getvalue("deposite-amount","value");
    var d_amount=getvalue("d-amount","innerText");
    var sum=inputval+d_amount;
    set_inertext("d-amount",sum);
    var total=getvalue("total-amount","innerText");
    total+=inputval;
    set_inertext("total-amount",total);
    document.getElementById("deposite-amount").value=""; 
}


function handle_withdraw(){
    var inputval=getvalue("withdraw-amount","value");
    var w_amount=getvalue("w-amount","innerText");
    var sum =inputval+w_amount;
    set_inertext("w-amount",sum);

    var total=getvalue("total-amount","innerText");
    total-=inputval;
    set_inertext("total-amount",total); 
    document.getElementById("withdraw-amount").value="";
}

function set_inertext(id,value){
    document.getElementById(id).innerText=value;
}

function getvalue(id,element)
{
    if(element=="innerText")
    {
        var valu = document.getElementById(id).innerText;
        return parseInt(valu);     
    }
    else if(element =="value")
    {
        var valu = document.getElementById(id).value;
        return parseInt(valu);     
    }
}
