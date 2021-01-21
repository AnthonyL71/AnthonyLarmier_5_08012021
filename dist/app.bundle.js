
var request = new XMLHttpRequest();
let xoxo = 0;
let tableauours = {};
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        request.onload = function() {
            let tableauours = response;
            // console.log(superHeroes[2]);
            for (let i = 0; i < tableauours.length; i++) {
                console.log(tableauours[i].name);
                let elt2 = document.getElementById('les-ours');
                let ficheproduit = '<figure class="border col-5 border-light rounded py-4 px-4 w-25 margin-center mt-5 text-center">';
                ficheproduit += '<figcaption><h1 class="mb-2">' + tableauours[i].name + '</h1><img class="redimension" src="' + tableauours[i].imageUrl + '"/></figcaption>';
/*                 ficheproduit += '<h4>' + tableauours[i].description + '</h4>';
                ficheproduit += '<p>' + tableauours[i].price + '€</p></figure'; */
                ficheproduit += '<button type="button" class="btn btn-secondary btn-lg mt-4">Me connaitre</button>';
                elt2.innerHTML += ficheproduit;
            }
        }
    }
};
request.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
request.send();
