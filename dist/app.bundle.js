// Fonction qui color la couleur séléctionné
function colors() {
    var imgs = document.getElementById('panelco').getElementsByTagName('div');
    var i = 0;
    for(var i = 0; i < imgs.length;i++){
        imgs[i].addEventListener('click', function(y){
            if(this.style.borderColor != "blue"){
                this.style.border = "2.5px blue solid";
            }else{
                this.style.border = "none";
            }
        }, false);
    }
}
let basketId;
let basketName;
let basketPrice;
// Création du texte dans la modal a l'appuie du bouton "Me connaitre"
function openmodal(id) {
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
    FunctionTableOurs();
    setTimeout(function() {
        // On boucle sur listOurs pour avoir le nom description prix couleur et l'image de chaque article
        for (let d = 0; d < listOurs.length; d++) {
            // On vérifie que ce soit le meme id que dans la liste
            if (d == id) {
                basketId = listOurs[d]._id;
                basketName = listOurs[d].name;
                basketPrice = listOurs[d].price;
                colorsOurs = listOurs[d].colors;
                document.getElementById('modal-header' + id + '').innerHTML = "";
                document.getElementById('modal-body' + id + '').innerHTML = "";
                document.getElementById('modal-footer' + id + '').innerHTML = "";
                let creaHeader = document.getElementById('modal-header' + id + '');
                let textHeader = '<h3 class="modal-title mx-auto col-12 text-center"> ' + listOurs[d].name + '</h3>';
                creaHeader.innerHTML += textHeader;
                let creaFooter = document.getElementById('modal-footer' + id + '');
                textFooter = '<div class="mx-auto">';
                textFooter += '<button type="button" id="modal-close" class="btn btn-secondary mr-3" data-dismiss="modal">Retour en arrière</button>';
                textFooter += '<button type="button" id="modal-close" data-dismiss="modal" id="basketmodal' + id + '" data-toggle="modal" data-target="#basketmodal' + id + '" onclick="addbasket(' + id + ')" class="btn btn-primary">Acheter</button>';
                textFooter += '</div>';
                creaFooter.innerHTML += textFooter;
                let creaBody = document.getElementById('modal-body' + id + '');
                let textBody = '<img class="redimension" src="' + listOurs[d].imageUrl + '"/>';
                textBody += '<p class="mx-auto col-12 text-center"> ' + listOurs[d].description + ' </p>';
                textBody += '<p class="text-right">' + listOurs[d].price + ' €</p>';
                textBody += '<p class="ml-4"> Autres couleurs disponible : </p>';
                // On crée un panel de couleur pour chaque ours suivant les couleurs prédifini dans l'api
                textBody += '<div class="ml-4 panelcouleurs row" id="panelco">';
                for (let d = 0; d < colorsOurs.length; d++) {
                    switch (colorsOurs[d]) {
                        case 'Tan':
                            textBody += '<div id="square-tan" class="square-tan"></div>';
                            break;
                        case "Chocolate":
                            textBody += '<div id="square-chocolate" class="square-chocolate"></div>';
                            break;
                        case "Black":
                            textBody += '<div id="square-black" class="square-black"></div>';
                            break;
                        case "White":
                            textBody += '<div id="square-white" class="square-white"></div>';
                            break;
                        case "Pale brown":
                            textBody += '<div id="square-paleborwn" class="square-palebrown"></div>';
                            break;
                        case "Dark brown":
                            textBody += '<div id="square-darkbrown" class="square-darkbrown"></div>';
                            break;
                        case "Brown":
                            textBody += '<div id="square-brown" class="square-brown"></div>';
                            break;
                        case "Blue":
                            textBody += '<div id="square-blue" class="square-blue"></div>';
                            break;
                        case "Pink":
                            textBody += '<div id="square-pink" class="square-pink"></div>';
                            break;
                        case "Beige":
                            textBody += '<div id="square-beige" class="square-beige"></div>';
                            break;
                        default:
                            textBody += '<p>Aucunes couleurs disponibles</p>';
                    }
                }
                textBody += '</div>';
                creaBody.innerHTML += textBody;
            }
        }
    // On lance la fonction colors() pour que a la séléction de la couleur elle soit encadré
    colors();
    }, 1000);
}

function addbasket(id) {
    var monobjet  = {
        id : id,
        name : basketName,
        price : basketPrice
      };
      var monobjet_json = JSON.stringify(monobjet);
    sessionStorage.setItem(basketId,monobjet_json);
    delete(basketName);
    delete(basketPrice);
    delete(basketId);
}

function forEachKey() {
    for (var i = 0; i < sessionStorage.length; i++) {
      console.log(sessionStorage.key(i));
    }
  }
forEachKey();
function basket() {
    var monobjet_json = sessionStorage.getItem();
    var monobjet = JSON.parse(monobjet_json);
    // Affichage dans la console
    console.log(monobjet);
    initModal = document.getElementById('basketmodal');
    let initModalText = '<div class="modal fade" id="basketmodal" tabindex="-1" role="dialog" aria-hidden="true">';
    initModalText += '<div class="modal-dialog" role="document">';
    initModalText += '<div class="modal-content">';
    initModalText += '<div id="modal-header" class="modal-header">';
    initModalText += '</div>';
    initModalText += '<div id="modal-body" class="modal-body">';
    initModalText += '<h3> ' + id + ' et nom ' + name + '</h3>';
    initModalText += '<h3> </h3>';    
    initModalText += '</div>';
    initModalText += '<div class="modal-footer">';
    initModalText += '<div class="mx-auto">';
    initModalText += '</div>';
    initModalText += '</div>';
    initModalText += '</div>';
    initModalText += '</div>';
    initModalText += '</div>';
    initModal.innerHTML += initModalText;
}

// Création de la requète pour télécharger je json en tableau
// Et ensuite l'afficher sur la page d'accueil du site
var request = new XMLHttpRequest();
let tableOurs = {};
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        request.onload = function() {
        // On met la réponse de l'api dans le tableau tableOurs
        tableOurs = response;
        // On boucle sur tableOurs pour affiché le nom l'image et le prix de chaque ours
            for (let i = 0; i < tableOurs.length; i++) {
                let initProd = document.getElementById('les-ours');
                let product = '<figure class="border col-lg-5 col-12 border-light rounded py-4 px-4 margin-center mt-5 text-center">';
                product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + '</h1><img class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
                product += '<button type="button" onclick="openmodal(' + i + ')"; class="name btn btn-secondary btn-lg mt-4" id="modal-list' + i + '" data-toggle="modal" data-target="#modal-list' + i + '">Me connaitre</button>';
                initProd.innerHTML += product;
                // On prépare la modal au futur clique de l'utilisateur
                initModal = document.getElementById('creationmodal');
                let initModalText = '<div class="modal fade" id="modal-list' + i + '" tabindex="-1" role="dialog" aria-hidden="true">';
                initModalText += '<div class="modal-dialog" role="document">';
                initModalText += '<div class="modal-content">';
                initModalText += '<div id="modal-header' + i + '" class="modal-header">';
                initModalText += '</div>';
                initModalText += '<div id="modal-body' + i + '" class="modal-body">';
                initModalText += '</div>';
                initModalText += '<div id="modal-footer' + i + '" class="modal-footer">';
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

