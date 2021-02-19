// Fonction pour ne pas afficher la div alert
function hiddenDivAlert() {
    document.getElementById("show-alert").style.visibility = "hidden";
    document.getElementById('show-alert').innerHTML = "";
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
        let cle = '';
        if(sessionStorage.getItem(x) != 'null' && storageKey == x) {
        // Si il est déjà dans le panier on met la keyExist a 1
            keyExist = 1;
        }
    }
    keyExistAlert = document.getElementById('alert');
    // Si il est déjà dans le panier alors on l'indique
    if(keyExist === 1) {
        keyExistAlertText = '<div class="top-25 start-50 translate-middle alert alert-danger position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
        keyExistAlertText += 'Cette ours est déjà dans le panier !';
        keyExistAlertText += '</div>';
        delete(keyExist);
        setTimeout("hiddenDivAlert()", 3000);
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
                keyExistAlertText = '<div class="top-25 start-50 translate-middle alert alert-success position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
                keyExistAlertText += 'Ajout de ' + tableOurs[i].name + ' au panier !';
                keyExistAlertText += '</div>';
                delete(keyExist);
                setTimeout("hiddenDivAlert()", 3000);
                var monobjet_json = JSON.stringify(monobjet);
                sessionStorage.setItem(x,monobjet_json);
                basket();
            }
        }
    }
keyExistAlert.innerHTML = keyExistAlertText;
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
    modalBasketText += '<button type="button" onclick="closeBasketModal()" class="close position-absolute top-0 end-0 mt-2 me-2" data-dismiss="modal"><span>&times;</span></button>';
    modalBasketText += '</div>';
    modalBasketText += '<div id="modal-body" class="modal-body">';
    modalBasketText += '<div class="tableau">';
    modalBasketText += '<table id="myTable" class="tablesorter-bootstrap table" data-toggle="table">';
    modalBasketText += '<thead class="text-center text-white-50">';
    modalBasketText += '<tr>';
    modalBasketText += '<th class="col-1"><h3>Retirer</h3></th>';
    modalBasketText += '<th class="col-7"><h3>Photo</h3></th>';
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
    modalBasketText += '<button type="button" onclick="clearBasket(),closeBasketModal()"; class="btn btn-lg btn-secondary">Vider mon panier</button>';
    if (sessionStorage.length === 0) {
    modalBasketText += '<button type="button" onclick="closeBasketModal(),openFormModal()"; class="btn btn-lg btn-primary mr-3" disabled>Confirmer mon panier</button>';
    } else {
        modalBasketText += '<button type="button" onclick="closeBasketModal(),openFormModal()"; class="btn btn-lg btn-primary mr-3">Confirmer mon panier</button>';
    }
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    modalBasketText += '<div class"modal-backdrop fade show" id="basketbackdrop" style="display: none;"></div>';
    modalBasket.innerHTML = modalBasketText;
}

// Formulaire de confirmation de commande
function creatForm() {
    initForm = document.getElementById('form');
    formText = '<div class="modal fade" aria-labelledby="label" id="form-list" tabindex="-1" role="dialog" aria-hidden="true">';
    formText += '<div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">';
    formText += '<div class="modal-content">'
    formText += '<div id="modal-header" class="modal-header justify-content-center">';
    formText += '<h2>Formulaire de confirmation de commande</h2>';
    formText += '</div>';
    formText += '<div id="modal-body" class="modal-body">';
    formText += '<form>';
    formText += '<div class="container col-6"';
    formText += '<label for="firstName" class="mb-2">Prénom *</label>';
    formText += '<input class="form-control mb-2" type="text" id="firstName" name="firstName" required pattern="[a-Z]" value="" />';
    formText += '<label for="lastName" class="mb-2">Nom *</label>';
    formText += '<input class="form-control mb-2" type="text" name="lastName" required pattern="[a-Z]" value="" />';
    formText += '<label for="address" class="mb-2">Adresse *</label>';
    formText += '<input class="form-control mb-2" type="text" name="address" required pattern="[a-Z]" value="" />';
    formText += '<label for="code" class="mb-2">Code Postal *</label>';
    formText += '<input class="form-control mb-2" type="text" name="code" pattern="[0-9]{,5}" required value="" />';
    formText += '<label for="city" class="mb-2">Ville *</label>';
    formText += '<input class="form-control mb-2" type="text" name="city" required pattern="[a-Z]" value="" />';
    formText += '<label for="email" class="mb-2">Email *</label>';
    formText += '<input class="form-control mb-4" type="email" name="email" required value="" />';
    formText += '</div><div class="col-12 text-center">';
    formText += '<button type="button" onclick="closeFormModal()" class="btn btn-secondary btn-md col-4 mb-2 me-3">Annuler</button>';
    formText += '<button type="button" onclick="sendForm(this.form);closeFormModal()" class="btn btn-primary btn-md col-4 mb-2">Confirmer ma commande</button>';
    formText += '</div></form></div>';
    formText += '<div class"modal-backdrop fade show" id="formbackdrop" style="display: none;"></div>';
    initForm.innerHTML = formText;
}

// On envoi les données au serveur 
function sendForm(frm) {
    var contact  = {
        firstName : frm.elements['firstName'].value,
        lastName : frm.elements['lastName'].value,
        address : frm.elements['address'].value,
        city : frm.elements['city'].value,
        email : frm.elements['email'].value
    };
    let contact_id = [];
        for (var i = 0; i < sessionStorage.length; i++) {
            storageKey = sessionStorage.key(i);
            storageJson = sessionStorage.getItem(storageKey);
            obj = JSON.parse(storageJson);
            contact_id.push(obj.id);
        }

    let bodyRequest = JSON.stringify({
        "contact": contact, 
        "products": contact_id
    });
    const request = new Request(
        "https://oc-p5-api.herokuapp.com/api/teddies/order",
        {
        method: "POST",
        body: bodyRequest,
        headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        }),
        }
        );
        fetch(request)
        .then((response) => response.json())
        .then((response) => {
            let products = response.products;
            let orderId = response.orderId;
            let totalprice = 0;
            for (var i = 0; i < products.length; i++) {
                totalprice += products[i].price;
            }
            sessionStorage.clear();
            confirmAlert = document.getElementById('alert');
            confirmAlertText = '<div class="top-50 start-50 translate-middle alert alert-success position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
            confirmAlertText += '<h3>Commande validé. Bravo !<h3>';
            confirmAlertText += '<br />';
            confirmAlertText += '<h3>Merci pour la commande ' + response.contact.firstName + ' ! Note bien ton numéro de commande ci dessous.';
            confirmAlertText += '<br /><br />';
            confirmAlertText += '<h3>Commande numéro: ' + orderId + '<h3>';
            confirmAlertText += '<br />';
            confirmAlertText += '<h3>Pour un prix total de ' + totalprice + ' €<h3>';
            confirmAlertText += '</div>';
            confirmAlert.innerHTML = confirmAlertText;
            setTimeout("hiddenDivAlert()", 10000);
            checkBasket();
        });
}


// On éfface tous le panier
function clearBasket() {
    document.getElementById('modal-body').innerHTML = "";
    if(sessionStorage.length === 0) {
        clearAlert = document.getElementById('alert');
        clearAlertText = '<div class="top-25 start-50 translate-middle alert alert-danger position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
        clearAlertText += 'Le panier est déjà vide !';
        clearAlertText += '</div>';
        clearAlert.innerHTML = clearAlertText;
        setTimeout("hiddenDivAlert()", 4000);
    } else {
        clearAlert = document.getElementById('alert');
        clearAlertText = '<div class="top-25 start-50 translate-middle alert alert-success position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
        clearAlertText += 'Panier vidé !';
        clearAlertText += '</div>';
        clearAlert.innerHTML = clearAlertText;
        setTimeout("hiddenDivAlert()", 4000);
        sessionStorage.clear();
    }
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
let tableOurs = {};
function loadApi() {
var request = new XMLHttpRequest();
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
                product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + ' et ' + tableOurs[i]._id + '</h1><img onclick="openModalDescr(' + i + ')" class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
                product += '<button type="button" onclick="openModalDescr(' + tableOurs[i]._id + ')"; class="name btn btn-secondary btn-lg mt-4" id="modal-button" data-toggle="modal" data-target="#modal-list">Me connaitre</button>';
                initProd.innerHTML += product;
        }
    }
};
}
request.open("GET", "https://oc-p5-api.herokuapp.com/api/teddies");
request.send();
}
function loadApis(i) {
    var requests = new XMLHttpRequest();
    requests.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.response);
            requests.onload = function() {
            // On met la réponse de l'api dans le tableau tableOurs
            tableOurs = response;
            console.log(i);
            colorsOurs = tableOurs.colors;
                // On prépare la modal description au futur clique de l'utilisateur
                initModal = document.getElementById('creationmodal');
                let initModalText = '<div class="modal fade" id="modal-list" tabindex="-1" role="dialog" aria-hidden="true">';
                initModalText += '<div class="modal-dialog" role="document">';
                initModalText += '<div class="modal-content">';
                initModalText += '<div id="modal-header" class="modal-header">';
                initModalText += '<h3 class="modal-title mx-auto col-12 text-center"> ' + tableOurs.name + '</h3>';
                initModalText += '<button type="button" onclick="closeModalDescr(' + i + ')" class="close position-absolute top-0 end-0 mt-2 me-2" data-dismiss="modal"><span>&times;</span></button>';
                initModalText += '</div>';
                initModalText += '<div id="modal-body" class="modal-body">';
                initModalText += '<img class="redimension" src="' + tableOurs.imageUrl + '"/>';
                initModalText += '<p class="mx-auto col-12 text-center"> ' + tableOurs.description + ' </p>';
                initModalText += '<p class="text-end">' + tableOurs.price + ' €</p>';
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
                initModalText += '<div id="modal-footer" class="modal-footer justify-content-center">';
                initModalText += '<button type="button" id="modal-close" onclick="closeModalDescr(' + i + ')"; class="btn btn-secondary mr-3" data-dismiss="modal">Retour en arrière</button>';
                initModalText += '<button type="button" id="modal-close" data-dismiss="modal" id="basketmodal' + i + '" data-toggle="modal" data-target="#basketmodal' + i + '" onclick="addBasket(' + i + '),closeModalDescr(' + i + ')" class="btn btn-primary">Acheter</button>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '<div class"modal-backdrop fade show" id="backdrop" style="display: none;"></div>';
                initModal.innerHTML += initModalText;
                };
            }
        }
        requests.open("GET", 'https://oc-p5-api.herokuapp.com/api/teddies/:_id/' + i + '');
        requests.send();
    };


checkBasket();
loadApi();
// Fonction qui ouvre la modal de description de l'article
function openModalDescr(i) {
    loadApis(' + i + ');
    document.getElementById('modal-list').style.display = "block"
    document.getElementById('modal-list').className += "show"
    document.getElementById('backdrop').style.display = "block"
}

// Fonction qui ferme la modal de description de l'article
function closeModalDescr() {
    document.getElementById('backdrop').style.display = "none"
    document.getElementById('modal-list').style.display = "none"
    document.getElementById('modal-list').className += document.getElementById('modal-list').className.replace("show", "")
    checkBasket();
}

// Fonction qui ouvre la modal du panier
function openBasketModal() {
    basket();
    document.getElementById('basket-list').style.display = "block"
    document.getElementById('basket-list').className += "show"
    document.getElementById('basketbackdrop').style.display = "block"
}
// Fonction qui ferme la modal du panier
function closeBasketModal() {
    document.getElementById('basketbackdrop').style.display = "none"
    document.getElementById('basket-list').style.display = "none"
    document.getElementById('basket-list').className += document.getElementById('basket-list').className.replace("show", "")
    checkBasket()
}

// Fonction qui ouvre le formulaire
function openFormModal() {
    creatForm();
    document.getElementById('form-list').style.display = "block"
    document.getElementById('form-list').className += "show"
    document.getElementById('formbackdrop').style.display = "block"
}
// Fonction qui ferme le formulaire
function closeFormModal() {
    document.getElementById('formbackdrop').style.display = "none"
    document.getElementById('form-list').style.display = "none"
    document.getElementById('form-list').className += document.getElementById('form-list').className.replace("show", "")
}
