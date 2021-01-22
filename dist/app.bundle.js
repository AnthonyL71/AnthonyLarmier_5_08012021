// Fonction pour récuperer la liste des Ours de l'api
let listOurs = {};
function FunctionTableOurs() {
    var requeste = new XMLHttpRequest();
    requeste.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
             response = JSON.parse(this.responseText);
            requeste.onload = function() {
                listOurs = response;
            }
        }
    }
    requeste.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
    requeste.send();
    };

// Création du texte dans la modal a l'appuie du bouton "Me connaitre"
let couleursours = {};
function ouvremodal(id) {
FunctionTableOurs();
setTimeout(function() {
    for (let d = 0; d < listOurs.length; d++) {
        if (d == id) {
           nameours = listOurs[d].name; 
           photoours = listOurs[d].imageUrl;
           descrours = listOurs[d].description;
           priceours = listOurs[d].price;
           couleursours = listOurs[d].colors;
        }
    }
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
}, 300);
}




// Création de la requète pour télécharger je json en tableau
// Et ensuite l'afficher sur la page d'accueil du site
var request = new XMLHttpRequest();
let tableOurs = {};
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        request.onload = function() {
         tableOurs = response;
            // console.log(superHeroes[2]);
            for (let i = 0; i < tableOurs.length; i++) {
            //    console.log(i);
                let initProd = document.getElementById('les-ours');
                let product = '<figure class="border col-5 border-light rounded py-4 px-4 w-25 margin-center mt-5 text-center">';
                product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + '</h1><img class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
                product += '<button type="button" onclick="ouvremodal(' + i + ')"; class="name btn btn-secondary btn-lg mt-4" id="modal-description' + i + '" data-toggle="modal" data-target="#modal-description' + i + '">Me connaitre</button>';
                initProd.innerHTML += product;
                    initModal = document.getElementById('creationmodal');    // On récupère l'élément sur lequel on veut détecter le clic
                    let initModalText = '<div class="modal fade" id="modal-description' + i + '" tabindex="-1" role="dialog" aria-hidden="true">';
                    initModalText += '<div class="modal-dialog" role="document">';
                    initModalText += '<div class="modal-content">';
                    initModalText += '<div id="modal-header' + i + '" class="modal-header">';
                    initModalText += '</div>';
                    initModalText += '<div id="modal-body' + i + '" class="modal-body">';
                    initModalText += '</div>';
                    initModalText += '<div class="modal-footer">';
                    initModalText += '<button type="button" id="modal-close" onclick="fermemodal(' + i + ')"; class="btn btn-secondary" data-dismiss="modal">Fermer</button>';
                    initModalText += '<button type="button" class="btn btn-primary">Enregistrer</button>';
                    initModalText += '</div>';
                    initModalText += '</div>';
                    initModalText += '</div>';
                    initModalText += '</div>';
                    initModal.innerHTML += initModalText;
                };
            
        }
    }
};
request.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
request.send();
