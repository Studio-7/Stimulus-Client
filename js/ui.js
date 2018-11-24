
function jsonToDiv(json1, json2, parent) {
    var html1;
    var html2;
    html1 += "<div class='row'><div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    html1 += json1.title
    html1 += "</h5><p class='card-text'>"
    html1 += json1.author
    html1 += "</p><a href='#' class='button'>"
    html1 += "</a></div></div></div>"
    html2 += "<div class='col-sm-6'><div class='card'><img class='card-img-top' src=''><div class='card-body'><h5 class='card-title'>";
    html2 += json2.title
    html2 += "</h5><p class='card-text'>"
    html2 += json2.author
    html2 += "</p><a href='#' class='button'>"
    html2 += "</a></div></div></div></div>"

    $('#home').append(html1+html2);
}

// var json = {news:[{"_id":"QmSHgGxWasvGadQvpdYUBBZ9Kw8nx6bMwb8qyBDVaUAuN3","title":"Search","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmVncwUQQgiQm6Vxmf8fLP9a8kEfcHTxDoWNRCPCshaPJw","title":"File Upload","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmR8MHA5uuvLSpk3Bcuf8zmjXLxkJfdyKRU5nL5jvC2T1t","title":"Subscribe","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmbTP6hhHnvVJjXZ4u5ouiEZoNj6iKHB1SP2jByC4LVpCp","title":"Index","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZUVnK4Fd4juz5BmeGPhToWBiWgMZk34ggakaCoEtYvhh","title":"Test screenshot","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmUfcJYYxBZpMGGKKuh9TAjZuJaKJY3cVd9nquMZ8t19m1","title":"screenshot","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZwsGKPtyY2uUhviBu1VcV6pPHxrmQmFfPtXPSNS6GjFu","title":"Test","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false},{"_id":"QmZgeEgwyacDGWo8f45soZQhy1oHwJGaWmbWDSwM1o1yyK","author":"0x2a5f493594ef5e7d81448c237dfb87003485fce5","Mined":false,"Published":false}]}


function bindResp(json) {
    json = JSON.parse(json)
    console.log("Recv: "+json["news"])
    json = json["news"]
    for(var i = 0; i < json.length; i = i+2) {
        console.log(json[i])
        jsonToDiv(json[i], json[i+1], "home")
    }
}