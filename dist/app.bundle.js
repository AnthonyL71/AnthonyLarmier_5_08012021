function timerDivAlert() {
    document.getElementById("show-alert").style.visibility = "hidden";
  }
// On ajoute un article dans le panier
function addBasket(x) {
    let storageKey;
    let keyExist = 0;
    let objet;
    // On vérifie en 1er s'il n'est pas déjà dans le panier
    for (var a = 0; a < sessionStorage.length; a++) {
        storageKey = sessionStorage.key(a);
        storageJson = sessionStorage.getItem(storageKey);
        objet = JSON.parse(storageJson);
        cle = a;
        console.log(cle);
        // Si il est déjà dans le panier on met la keyExist a 1
        if(cle === x){
            keyExist = 1;
        }
    }
    // Si il est déjà dans le panier alors on l'indique
    if(keyExist === 1) {
        keyExistAlert = document.getElementById('alert');
        keyExistAlertText = '<div class="alert alert-danger position-fixed" id="show-alert" style="visibility: visible" role="alert">';
        keyExistAlertText += 'Cette ours est déjà dans le panier !';
        keyExistAlertText += '</div>';
        keyExistAlert.innerHTML = keyExistAlertText;
          setTimeout("timerDivAlert()", 3000);
            delete(keyExist);
    } else { // Sinon on l'ajoute
    for (let i = 0; i < tableOurs.length; i++) {
        if (x == i) {
            basketId = tableOurs[i]._id;
    var monobjet  = {
        id : tableOurs[i]._id,
        name : tableOurs[i].name,
        image : tableOurs[i].imageUrl,
        price : tableOurs[i].price
      };
      keyExistAlert = document.getElementById('alert');
      keyExistAlertText = '<div class="alert alert-success position-fixed" id="show-alert" style="visibility: visible" role="alert">';
      keyExistAlertText += 'Ajout de ' + tableOurs[i].name + ' au panier !';
      keyExistAlertText += '</div>';
      keyExistAlert.innerHTML = keyExistAlertText;
        setTimeout("timerDivAlert()", 3000);
        delete(keyExist);
      var monobjet_json = JSON.stringify(monobjet);
    sessionStorage.setItem(x,monobjet_json);
    // alertAddBasket = document.getElementById('alert');
    // let addBasketText = '<div class="alert alert-info alert-dismissible fade show" role="alert">' + tableOurs[i].name + ' ajouté au panier !</div>';
    // alertAddBasket.innerHTML += addBasketText;
    basket();
}
}
}
}


// Fonction qui affiche le panier
function basket() {
    let storageKey;
let basketTotal = 0;
    modalBasket = document.getElementById('basketmodal');
    let modalBasketText = '<div class="modal fade" aria-labelledby="label" id="basket-list" tabindex="-1" role="dialog" aria-hidden="true">';
    modalBasketText += '<div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">';
    modalBasketText += '<div class="modal-content">';
    modalBasketText += '<div id="modal-header" class="modal-header">';
    modalBasketText += '<h2 class="modal-title mx-auto col-12 text-center">Mon panier</h2>';
    modalBasketText += '</div>';
    modalBasketText += '<div id="modal-body" class="modal-body">';
    modalBasketText += '<div class="tableau">';
    modalBasketText += '<table id="myTable" class="tablesorter-bootstrap table" data-toggle="table">';
    modalBasketText += '<thead class="text-center text-white-50">';
    modalBasketText += '<tr>';
    modalBasketText += '<th class="col-1"><h3>Retirer</h3></th>';
    modalBasketText += '<th class="col-7"><h3>Image</h3></th>';
    modalBasketText += '<th class="col-2"><h3>Prénom</h3></th>';
    modalBasketText += '<th class="col-2"><h3>Prix</h3></th>';
    modalBasketText += '</tr>';
    modalBasketText += '</thead>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    for (var i = 0; i < sessionStorage.length; i++) {
        storageKey = sessionStorage.key(i);
        storageJson = sessionStorage.getItem(storageKey);
        const obj = JSON.parse(storageJson);
        let id = i;
        basketTotal += obj.price;
        modalBasketText += '<tr class="text-white-50 text-center">';
        modalBasketText += '<td style="padding-top:6%;"><a onclick="closeBasketModal(),deleteBasket(' + storageKey + '),openBasketModal()"><i class="fa fa-trash fa-2x"></i></a></td><td><img class="redimension-basket mx-auto" src="' + obj.image + '"/></td><td><h3> ' + obj.name + '</h3></td><td><h3>  ' + obj.price + ' € </h3></td>';
        modalBasketText += '</tr>';
        }
    modalBasketText += '<tr class="text-white-50 text-center">';
    modalBasketText += '<td /><td><h3>Total du panier:</h3></td><td /><td><h3> ' + basketTotal + ' €</h3></td>';
    modalBasketText += '</tr>';
    modalBasketText += '</table>';
    modalBasketText += '<div class="modal-footer justify-content-center">';
    modalBasketText += '<button type="button" onclick="clearBasket(),closeBasketModal(),openBasketModal()"; class="btn btn-lg btn-primary">Vider mon panier</button>';
    modalBasketText += '<button type="button" id="modal-close" onclick="closeBasketModal()"; class="btn btn-lg btn-secondary mr-3" data-dismiss="modal">Fermer</button>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '<div class"modal-backdrop fade show" id="basketbackdrop" style="display: none;"></div>';
    modalBasket.innerHTML = modalBasketText;
}

// On éfface tous le panier
function clearBasket() {
    document.getElementById('modal-body').innerHTML = "";
    sessionStorage.clear();
    openBasketModal();
}

// On supprime un article du panier
function deleteBasket(i) {
    sessionStorage.removeItem(i);
}

// On vérifie s'il y a des entrées dans le panier, et on affiche le nombre dans sur le bouton panier
function checkBasket() {
    let numberKey;
        numberKey = sessionStorage.length;
    let initBadge = document.getElementById('badge');
    let badgeText = '<span class="red mr-4">'+ numberKey + '</span>';
    initBadge.innerHTML = badgeText;
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
                product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + '</h1><img onclick="openModalDescr(' + i + ')" class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
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
checkBasket()
// Fonction qui ouvre la modal de description de l'article
function openModalDescr(i) {
    document.getElementById('modal-list' +  i + '').style.display = "block"
    document.getElementById('modal-list' + i + '').className += "show"
    document.getElementById('backdrop' + i + '').style.display = "block"
}

// Fonction qui ferme la modal de description de l'article
function closeModalDescr(i) {
    document.getElementById('backdrop' + i + '').style.display = "none"
    document.getElementById('modal-list' + i + '').style.display = "none"
    document.getElementById('modal-list' + i + '').className += document.getElementById('modal-list' + i + '').className.replace("show", "")
    checkBasket()
}

// Fonction qui ouvre la modal du panier
function openBasketModal() {
    basket();
    document.getElementById('basket-list').style.display = "block"
    document.getElementById('basket-list').className += "show"
    document.getElementById('basketbackdrop').style.display = "block"
}
// Fonction qui ferme ma modal du panier
function closeBasketModal() {
    document.getElementById('basketbackdrop').style.display = "none"
    document.getElementById('basket-list').style.display = "none"
    document.getElementById('basket-list').className += document.getElementById('basket-list').className.replace("show", "")
    checkBasket()
}

