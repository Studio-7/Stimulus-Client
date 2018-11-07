
if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);   
}
else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

const server = "http://localhost:3000/login";

var keyphrase = createPhrase(32);
document.getElementById("submitBtn").addEventListener('click', (event) => {
    event.preventDefault();
});

function toHex(s) {
    var hex = '';
    for(var i=0;i<s.length;i++) { 
        hex += ''+s.charCodeAt(i).toString(16);
    }
    return `0x${hex}`;
}

function createPhrase(n) {
    var phrase = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < n; i++)
      phrase += characters.charAt(Math.floor(Math.random()*characters.length));
  
    return phrase;
}

function sign(phrase, callback){
    //Actually submits the form after signing
    window.web3.eth.getAccounts((error, accounts) => {
        if(error) {
            throw error;
        }
        window.web3.eth.sign(phrase, accounts[0], (err, sign) => {
            if(err) {
                throw err;
            }
            callback(sign);
            // document.getElementById("address").value = accounts[0];
        });
    });
}

//For uploading news 
function submit() {
    if(document.getElementById("title").value == "") {
        alert("Title cannot be empty");
    }
    else {
        sign(toHex(keyphrase), function(sign) {
            document.getElementById("sign").value = sign;
            document.getElementById("phrase").value = keyphrase;
            var form = document.getElementById("uploadForm");
            form.submit();
        });
    }
}

//To be called when user signs up or logs in
function login() {
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
    console.log(name+" "+bio);
    const keyphrase = createPhrase(32);
    sign(toHex(keyphrase), function(sign) {
        console.log("Sign: " + sign);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", server);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send("name="+name+"&bio="+bio+"&sign="+sign+"&phrase="+keyphrase);
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState ===4 && xhttp.status === 200) {
                alert("Logged in!");
            }
            console.log(xhttp.responseText);
        }
        
    });
}

