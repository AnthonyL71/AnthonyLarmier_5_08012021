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
// Création du texte dans la modal a l'appuie du bouton "Me connaitre"
// function openModalDescr(id) {
// // Fonction pour récuperer la liste des Ours de l'api
//     let listOurs = {};
//     function functionTableOurs() {
//         var requeste = new XMLHttpRequest();
//         requeste.onreadystatechange = function() {
//             if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//                 response = JSON.parse(this.responseText);
//                 requeste.onload = function() {
//                     listOurs = response;
//                 }
//             }
//         }
//     requeste.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
//     requeste.send();
//     };
//     functionTableOurs();
//     setTimeout(function() {
//         // On boucle sur listOurs pour avoir le nom description prix couleur et l'image de chaque article
//         for (let d = 0; d < listOurs.length; d++) {
//             // On vérifie que ce soit le meme id que dans la liste
//             if (d == id) {
//                 basketId = listOurs[d]._id;
//                 basketName = listOurs[d].name;
//                 basketPrice = listOurs[d].price;
//                 colorsOurs = listOurs[d].colors;
//                 document.getElementById('modal-header' + id + '').innerHTML = "";
//                 document.getElementById('modal-body' + id + '').innerHTML = "";
//                 document.getElementById('modal-footer' + id + '').innerHTML = "";
//                 let creaHeader = document.getElementById('modal-header' + id + '');
//                 let textHeader = '<h3 class="modal-title mx-auto col-12 text-center"> ' + listOurs[d].name + '</h3>';
//                 creaHeader.innerHTML += textHeader;
//                 let creaFooter = document.getElementById('modal-footer' + id + '');
//                 textFooter = '<div class="mx-auto">';
//                 textFooter += '<button type="button" id="modal-close" class="btn btn-secondary mr-3" data-dismiss="modal">Retour en arrière</button>';
//                 textFooter += '<button type="button" id="modal-close" data-dismiss="modal" id="basketmodal' + id + '" data-toggle="modal" data-target="#basketmodal' + id + '" onclick="addbasket(' + id + ')" class="btn btn-primary">Acheter</button>';
//                 textFooter += '</div>';
//                 creaFooter.innerHTML += textFooter;
//                 let creaBody = document.getElementById('modal-body' + id + '');
//                 let textBody = '<img class="redimension" src="' + listOurs[d].imageUrl + '"/>';
//                 textBody += '<p class="mx-auto col-12 text-center"> ' + listOurs[d].description + ' </p>';
//                 textBody += '<p class="text-right">' + listOurs[d].price + ' €</p>';
//                 textBody += '<p class="ml-4"> Autres couleurs disponible : </p>';
//                 // On crée un panel de couleur pour chaque ours suivant les couleurs prédifini dans l'api
//                 textBody += '<div class="ml-4 panelcouleurs row" id="panelco">';
//                 for (let d = 0; d < colorsOurs.length; d++) {
//                     switch (colorsOurs[d]) {
//                         case 'Tan':
//                             textBody += '<div id="square-tan" class="square-tan"></div>';
//                             break;
//                         case "Chocolate":
//                             textBody += '<div id="square-chocolate" class="square-chocolate"></div>';
//                             break;
//                         case "Black":
//                             textBody += '<div id="square-black" class="square-black"></div>';
//                             break;
//                         case "White":
//                             textBody += '<div id="square-white" class="square-white"></div>';
//                             break;
//                         case "Pale brown":
//                             textBody += '<div id="square-paleborwn" class="square-palebrown"></div>';
//                             break;
//                         case "Dark brown":
//                             textBody += '<div id="square-darkbrown" class="square-darkbrown"></div>';
//                             break;
//                         case "Brown":
//                             textBody += '<div id="square-brown" class="square-brown"></div>';
//                             break;
//                         case "Blue":
//                             textBody += '<div id="square-blue" class="square-blue"></div>';
//                             break;
//                         case "Pink":
//                             textBody += '<div id="square-pink" class="square-pink"></div>';
//                             break;
//                         case "Beige":
//                             textBody += '<div id="square-beige" class="square-beige"></div>';
//                             break;
//                         default:
//                             textBody += '<p>Aucunes couleurs disponibles</p>';
//                     }
//                 }
//                 textBody += '</div>';
//                 creaBody.innerHTML += textBody;
//             }
//         }
//     // On lance la fonction colors() pour que a la séléction de la couleur elle soit encadré
//     colors();
//     }, 1000);
// }

function addBasket(id) {

    document.location.reload();
    for (let i = 0; i < tableOurs.length; i++) {
        if (id == i) {
            basketId = tableOurs[i]._id;
    var monobjet  = {
        id : tableOurs[i]._id,
        name : tableOurs[i].name,
        price : tableOurs[i].price
      };
      var monobjet_json = JSON.stringify(monobjet);
    sessionStorage.setItem(basketId,monobjet_json);
    // alertAddBasket = document.getElementById('alert');
    // let addBasketText = '<div class="alert alert-info alert-dismissible fade show" role="alert">' + tableOurs[i].name + ' ajouté au panier !</div>';
    // alertAddBasket.innerHTML += addBasketText;
    delete(basketName);
    delete(basketPrice);
    delete(basketId);
    basket(i);
}
    }
}

function forEachKey() {
    
    for (var i = 0; i < sessionStorage.length; i++) {
      console.log(sessionStorage.key(i));
      test = sessionStorage.key(i);
      bidule = sessionStorage.getItem(test);
      const obj = JSON.parse(bidule);
      initBasket = document.getElementById('modal-body');
      let initModalBasket = '<p> ' + obj.name + ' au prix de ' + obj.price + '€</p>';
      console.log(sessionStorage.getItem(test));
      initBasket.innerHTML += initModalBasket;
    }
  }
function basket(i) {
    //var monobjet_json = sessionStorage.getItem();
    //var monobjet = JSON.parse(monobjet_json);
    // Affichage dans la console
    initModalBasket = document.getElementById('basketmodal');
    let initModalBasketText = '<div class="modal fade" id="basket-list" tabindex="-1" role="dialog" aria-hidden="true">';
    initModalBasketText += '<div class="modal-dialog" role="document">';
    initModalBasketText += '<div class="modal-content">';
    initModalBasketText += '<div id="modal-header" class="modal-header">';
    initModalBasketText += '<h3 class="modal-title mx-auto col-12 text-center"> Panier</h3>';
    initModalBasketText += '</div>';
    initModalBasketText += '<div id="modal-body" class="modal-body">';
    initModalBasketText += '<h3> </h3>'; 
    initModalBasketText += '</div>';
    initModalBasketText += '<div class="modal-footer">';
    initModalBasketText += '<button type="button" onclick="clearBasket(),closeBasketModal(),openBasketModal()"; class="btn btn-md btn-primary">Vider mon panier</button>';
    initModalBasketText += '<button type="button" id="modal-close" onclick="closeBasketModal()"; class="btn btn-md btn-secondary mr-3" data-dismiss="modal">Fermer</button>';
    initModalBasketText += '</div>';
    initModalBasketText += '</div>';
    initModalBasketText += '</div>';
    initModalBasketText += '</div>';
    initModalBasketText += '</div>';
    initModalBasketText += '</div>';
    initModalBasketText += '<div class"modal-backdrop fade show" id="basketbackdrop" style="display: none;"></div>';
    initModalBasket.innerHTML += initModalBasketText;
    forEachKey();
}

function clearBasket() {
    document.getElementById('modal-body').innerHTML = "";
    sessionStorage.clear();
    openBasketModal();
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
                colorsOurs = tableOurs[i].colors;
                id = i;
                let initProd = document.getElementById('les-ours');
                let product = '<figure class="border col-lg-5 col-12 border-light rounded py-4 px-4 margin-center mt-5 text-center">';
                product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + '</h1><img class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
                product += '<button type="button" onclick="openModalDescr(' + i + ')"; class="name btn btn-secondary btn-lg mt-4" id="modal-button" data-toggle="modal" data-target="#modal-list' + i + '">Me connaitre</button>';
                initProd.innerHTML += product;
                // On prépare la modal description au futur clique de l'utilisateur
                initModal = document.getElementById('creationmodal');
                basketId = tableOurs[i]._id;
                basketName = tableOurs[i].name;
                basketPrice = tableOurs[i].price;
                let initModalText = '<div class="modal fade" id="modal-list' + i + '" tabindex="-1" role="dialog" aria-hidden="true">';
                initModalText += '<div class="modal-dialog" role="document">';
                initModalText += '<div class="modal-content">';
                initModalText += '<div id="modal-header' + i + '" class="modal-header">';
                initModalText += '<h3 class="modal-title mx-auto col-12 text-center"> ' + tableOurs[i].name + '</h3>';
                initModalText += '</div>';
                initModalText += '<div id="modal-body' + i + '" class="modal-body">';
                initModalText += '<img class="redimension" src="' + tableOurs[i].imageUrl + '"/>';
                initModalText += '<p class="mx-auto col-12 text-center"> ' + tableOurs[i].description + ' </p>';
                initModalText += '<p class="text-end">' + tableOurs[i].price + ' €</p>';
                initModalText += '<p class="ms-4"> Autres couleurs disponible : </p>';
                // On crée un panel de couleur pour chaque ours suivant les couleurs prédifini dans l'api
                initModalText += '<div class="ms-4 panelcouleurs row" id="panelco">';
                for (let d = 0; d < colorsOurs.length; d++) {
                    switch (colorsOurs[d]) {
                        case 'Tan':
                            initModalText += '<div id="square-tan" class="square-tan"></div>';
                            break;
                        case "Chocolate":
                            initModalText += '<div id="square-chocolate" class="square-chocolate"></div>';
                            break;
                        case "Black":
                            initModalText += '<div id="square-black" class="square-black"></div>';
                            break;
                        case "White":
                            initModalText += '<div id="square-white" class="square-white"></div>';
                            break;
                        case "Pale brown":
                            initModalText += '<div id="square-paleborwn" class="square-palebrown"></div>';
                            break;
                        case "Dark brown":
                            initModalText += '<div id="square-darkbrown" class="square-darkbrown"></div>';
                            break;
                        case "Brown":
                            initModalText += '<div id="square-brown" class="square-brown"></div>';
                            break;
                        case "Blue":
                            initModalText += '<div id="square-blue" class="square-blue"></div>';
                            break;
                        case "Pink":
                            initModalText += '<div id="square-pink" class="square-pink"></div>';
                            break;
                        case "Beige":
                            initModalText += '<div id="square-beige" class="square-beige"></div>';
                            break;
                        default:
                            initModalText += '<p>Aucunes couleurs disponibles</p>';
                    }
                }
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '<div id="modal-footer" class="modal-footer">';
                initModalText += '<button type="button" id="modal-close" onclick="closeModalDescr(' + i + ')"; class="btn btn-secondary mr-3" data-dismiss="modal">Retour en arrière</button>';
                initModalText += '<button type="button" id="modal-close" data-dismiss="modal" id="basketmodal' + i + '" data-toggle="modal" data-target="#basketmodal' + i + '" onclick="addBasket(' + i + '),closeModalDescr(' + i + ')" class="btn btn-primary">Acheter</button>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '<div class"modal-backdrop fade show" id="backdrop' + i + '" style="display: none;"></div>';
                initModal.innerHTML += initModalText;
                };
            
        }
    }
};
request.open("GET", "https://oc-devweb-p5-api.herokuapp.com/api/teddies");
request.send();

function openModalDescr(i) {
    document.getElementById('modal-list' +  i + '').style.display = "block"
    document.getElementById('modal-list' + i + '').className += "show"
    document.getElementById('backdrop' + i + '').style.display = "block"
}
function closeModalDescr(i) {
    document.getElementById('backdrop' + i + '').style.display = "none"
    document.getElementById('modal-list' + i + '').style.display = "none"
    document.getElementById('modal-list' + i + '').className += document.getElementById('modal-list' + i + '').className.replace("show", "")
}

function openBasketModal() {
    basket();
    document.getElementById('basket-list').style.display = "block"
    document.getElementById('basket-list').className += "show"
    document.getElementById('basketbackdrop').style.display = "block"
}
function closeBasketModal() {
    document.getElementById('basketbackdrop').style.display = "none"
    document.getElementById('basket-list').style.display = "none"
    document.getElementById('basket-list').className += document.getElementById('basket-list').className.replace("show", "")
}

