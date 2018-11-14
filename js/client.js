
if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);   
}
else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

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
            console.log(sign);
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
        const server = "http://localhost:3000/login";
        postData("name="+name+"&bio="+bio+"&sign="+sign+"&phrase="+keyphrase, server);
    });
}

function subscribe() {
    const phrase = createPhrase(32);
    const channel = "Channel2"; //window.sessionStorage.getItem("channel");
    sign(toHex(phrase), function(sign) {
        const server = "http://localhost:3000/channel/subscribe";
        postData("sign="+sign+"&phrase="+phrase+"&channel="+channel, server);
    });
}

function getNews() {
    const phrase = createPhrase(32);
    const channel = "0x2a5f493594ef5e7d81448c237dfb87003485fce5";
    sign(toHex(phrase), function(sign) {
        const url = "http://localhost:3000/news/"+channel;
        getRequest(url, function(resp) {
            document.getElementById("articles").innerText = resp;
        });
    });
}

function postData(data, server) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", server);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            alert("Successful!");
        }
        console.log(xhttp.responseText);
    }
}

function getRequest(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    console.log(url);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            alert("Successful!");
        }
        console.log(xhttp.responseText);
        callback(xhttp.responseText);
    }
}

