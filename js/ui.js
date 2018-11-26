
function jsonToDiv(json1, parent, url) {
    var html1;
    var html2;
    html1 += "<div class='row'><div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    html1 += json1.title
    html1 += "</h5><p class='card-text'><a href='/Web/user.html?user="+json1.author+"'>"
    html1 += json1.author+"</a>"
    html1 += "</p><a href='"+url+json1._id+"'"+"class='button'>Open"
    html1 += "</a></div></div></div>"
    // html2 += "<div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    // html2 += json2.title
    // html2 += "</h5><p class='card-text'><a href='/Web/user.html?user="+json2.author+"'>"
    // html2 += json2.author+"</a>"
    // html2 += "</p><a href='"+"/Web/newsView.html?hash="+json2._id+"'"+"class='button'>Open"
    // html2 += "</a></div></div></div></div>"

    $('#'+parent).append(html1);
}

function jsonToDivUser(json1, parent) {
    var html1;
    var html2;
    html1 += "<div class='row'><div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    html1 += json1.name
    html1 += "</h5><p class='card-text'><a href='/Web/user.html?user="+json1._id+"'>"
    html1 += json1.bio+"</a>"
    html1 += "</p><a href='/Web/user.html?user="+json1._id+"' "+"class='button'>Open"
    html1 += "</a></div></div></div>"
    // html2 += "<div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    // html2 += json2.title
    // html2 += "</h5><p class='card-text'><a href='/Web/user.html?user="+json2.author+"'>"
    // html2 += json2.author+"</a>"
    // html2 += "</p><a href='"+"/Web/newsView.html?hash="+json2._id+"'"+"class='button'>Open"
    // html2 += "</a></div></div></div></div>"

    $('#'+parent).append(html1);
}

// var json = {news:[{"_id":"QmSHgGxWasvGadQvpdYUBBZ9Kw8nx6bMwb8qyBDVaUAuN3","title":"Search","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmVncwUQQgiQm6Vxmf8fLP9a8kEfcHTxDoWNRCPCshaPJw","title":"File Upload","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmR8MHA5uuvLSpk3Bcuf8zmjXLxkJfdyKRU5nL5jvC2T1t","title":"Subscribe","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmbTP6hhHnvVJjXZ4u5ouiEZoNj6iKHB1SP2jByC4LVpCp","title":"Index","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZUVnK4Fd4juz5BmeGPhToWBiWgMZk34ggakaCoEtYvhh","title":"Test screenshot","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmUfcJYYxBZpMGGKKuh9TAjZuJaKJY3cVd9nquMZ8t19m1","title":"screenshot","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZwsGKPtyY2uUhviBu1VcV6pPHxrmQmFfPtXPSNS6GjFu","title":"Test","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZgeEgwyacDGWo8f45soZQhy1oHwJGaWmbWDSwM1o1yyK","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false}]}


function bindResp(json, mined) {
    var url = "/Web/newsView.html?hash="
    if(mined) {
        url = "http://gateway.ipfs.io/ipfs/"
    }
    $('#home').empty()
    json = JSON.parse(json)
    console.log("Recv: "+JSON.stringify(json["news"]))
    json = json["news"]
    for(var i = 0; i < json.length; i++) {
        console.log(json[i])
        jsonToDiv(json[i], "home", url)
    }
}

function bindUserResp(json) {
    $('#home').empty()
    json = JSON.parse(json)
    console.log("Recv: "+json["users"])
    json = json["users"]
    for(var i = 0; i < json.length; i++) {
        console.log(json[i])
        jsonToDivUser(json[i], "searchRes")
    }
}