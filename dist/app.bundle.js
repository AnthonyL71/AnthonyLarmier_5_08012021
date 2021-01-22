
// Création du texte dans la modal a l'appuie du bouton "Me connaitre"
let nameours;
let couleursours = {};
function ouvremodal(id) {
    for (let d = 0; d < tableauours.length; d++) {
        if (d == id) {
           nameours = tableauours[d].name; 
           photoours = tableauours[d].imageUrl;
           descrours = tableauours[d].description;
           priceours = tableauours[d].price;
           couleursours = tableauours[d].colors;
        }
    }
    sessionStorage.setItem("couleur", id);
    $('.modal-header').empty();
    $('.modal-body').empty();

    let crea_header = document.getElementById('modal-header' + id + '');
    let text_header = '<h3 class="modal-title mx-auto col-12 text-center"> ' + nameours + ' </h3>';
    crea_header.innerHTML += text_header;
    let crea_body = document.getElementById('modal-body' + id + '');
    let text_body = '<img class="redimension" src="' + photoours + '"/>';
    text_body += '<p class="mx-auto col-12 text-center"> ' + descrours + ' </p>';
    text_body += '<p class="text-right">' + priceours + ' €</p>';
    text_body += '<p class="ml-4"> Autres couleurs disponible : </p>';
    text_body += '<div class="ml-4 panel-couleurs row">';
    for (let d = 0; d < couleursours.length; d++) {
        switch (couleursours[d]) {
            case 'Tan':
                text_body += '<div class="carre-tan"></div>';
                break;
            case "Chocolate":
                text_body += '<div class="carre-chocolate"></div>';
                break;
            case "Black":
                text_body += '<div class="carre-black"></div>';
                break;
            case "White":
                text_body += '<p class="carre-white"></p>';
                break;
            case "Pale brown":
                text_body += '<div class="carre-palebrown"></div>';
                break;
            case "Dark brown":
                text_body += '<div class="carre-darkbrown"></div>';
                break;
            case "Brown":
                text_body += '<div class="carre-brown"></div>';
                break;
            case "Blue":
                text_body += '<div class="carre-blue"></div>';
                break;
            case "Pink":
                text_body += '<div class="carre-pink"></div>';
                break;
            case "Beige":
                text_body += '<div class="carre-beige"></div>';
                break;
            default:
                text_body += '<p>Aucunes couleurs disponibles</p>';
        }
    }
    text_body += '</div>';
    crea_body.innerHTML += text_body;
}




// Création de la requète pour télécharger je json en tableau
// Et ensuite l'afficher sur la page d'accueil du site
var request = new XMLHttpRequest();
let tableauours = {};
let elt50;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        request.onload = function() {
         tableauours = response;
            // console.log(superHeroes[2]);
            for (let i = 0; i < tableauours.length; i++) {
            //    console.log(i);
                let crea_ficheprod = document.getElementById('les-ours');
                let ficheproduit = '<figure class="border col-5 border-light rounded py-4 px-4 w-25 margin-center mt-5 text-center">';
                ficheproduit += '<figcaption><h1 class="name mb-2">' + tableauours[i].name + '</h1><img class="redimension" src="' + tableauours[i].imageUrl + '"/></figcaption>';
                ficheproduit += '<button type="button" onclick="ouvremodal(' + i + ')"; class="name btn btn-secondary btn-lg mt-4" id="modal-description' + i + '" data-toggle="modal" data-target="#modal-description' + i + '">Me connaitre</button>';
                crea_ficheprod.innerHTML += ficheproduit;
                    crea_modal = document.getElementById('creationmodal');    // On récupère l'élément sur lequel on veut détecter le clic
                    let crea_modaltext = '<div class="modal fade" id="modal-description' + i + '" tabindex="-1" role="dialog" aria-hidden="true">';
                    crea_modaltext += '<div class="modal-dialog" role="document">';
                    crea_modaltext += '<div class="modal-content">';
                    crea_modaltext += '<div id="modal-header' + i + '" class="modal-header">';
                    crea_modaltext += '</div>';
                    crea_modaltext += '<div id="modal-body' + i + '" class="modal-body">';
                    crea_modaltext += '</div>';
                    crea_modaltext += '<div class="modal-footer">';
                    crea_modaltext += '<button type="button" id="modal-close" onclick="fermemodal(' + i + ')"; class="btn btn-secondary" data-dismiss="modal">Fermer</button>';
                    crea_modaltext += '<button type="button" class="btn btn-primary">Enregistrer</button>';
                    crea_modaltext += '</div>';
                    crea_modaltext += '</div>';
                    crea_modaltext += '</div>';
                    crea_modaltext += '</div>';
                    crea_modal.innerHTML += crea_modaltext;
                };
            
        }
    }
};
request.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
request.send();
//

