
var request = new XMLHttpRequest();
let xoxo = 0;
let superHeroes = {};
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        request.onload = function() {
            let superHeroes = response;
            // console.log(superHeroes[2]);
            for (let i = 0; i < superHeroes.length; i++) {
                console.log(superHeroes[i].name);
                let elt2 = document.getElementById('les-ours');
                elt2.innerHTML += '<div class="border border-light rounded mx-auto py-4 px-4 w-50 text-center"><h1>' + superHeroes[i].name + '</h1><img width="100" src="' + superHeroes[i].imageUrl + '"/><p>' + superHeroes[i].price + '</p></div>';

}
        }


    }
};
request.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
request.send();
