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
        keyExistAlertText += '<br>';
        keyExistAlertText += 'Va dans la panier pour modifier la quantité ;-)';
        keyExistAlertText += '</div>';
        delete(keyExist);
        setTimeout("hiddenDivAlert()", 3000);
    } else { // Sinon on l'ajoute
        for (let i = 0; i < tableOurs.length; i++) {
            if (x == i) {
                var quantity = 1;
                basketId = tableOurs[i]._id;
                var monobjet  = {
                id : tableOurs[i]._id,
                name : tableOurs[i].name,
                quantity : quantity,
                image : tableOurs[i].imageUrl,
                price : tableOurs[i].price/100,
                total : tableOurs[i].price/100
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

// Fonction qui retire 1 a l'article du panier
function quantitydown(x) {
    for (var a = 0; a < sessionStorage.length; a++) {
        storageKey = sessionStorage.key(a);
        storageJson = sessionStorage.getItem(storageKey);
        objet = JSON.parse(storageJson);
        if(storageKey == x && objet.quantity > 1) {
            for (let i = 0; i < tableOurs.length; i++) {
                // On vérifie bien que ce soit la même clés
                if (x == i) {
                    // On recrée un objet avec la nouvelle quantité et le total changé
                    var monobjet  = {
                        id : tableOurs[i]._id,
                        name : tableOurs[i].name,
                        quantity : --objet.quantity,
                        image : tableOurs[i].imageUrl,
                        price : tableOurs[i].price/100,
                        total : objet.total-tableOurs[i].price/100
                    };
                    // On efface de la sessionstorage l'ancien json pour remettre le nouveau a la place
                    deleteBasket(x); 
                    var monobjet_json = JSON.stringify(monobjet);
                    sessionStorage.setItem(x,monobjet_json);
                }
            }
        }
    }
}


// Fonction qui ajoute 1 a l'article du panier
function quantityup(x) {
    for (var a = 0; a < sessionStorage.length; a++) {
        storageKey = sessionStorage.key(a);
        storageJson = sessionStorage.getItem(storageKey);
        objet = JSON.parse(storageJson);
        if(storageKey == x) {
            for (let i = 0; i < tableOurs.length; i++) {
                // On vérifie bien que ce soit la même clés
                if (x == i) {
                     // On recrée un objet avec la nouvelle quantité et le total changé
                    var monobjet  = {
                        id : tableOurs[i]._id,
                        name : tableOurs[i].name,
                        quantity : ++objet.quantity,
                        image : tableOurs[i].imageUrl,
                        price : tableOurs[i].price/100,
                        total : tableOurs[i].price/100+objet.total
                        };
                    // On efface de la sessionstorage l'ancien json pour remettre le nouveau a la place
                    deleteBasket(x); 
                    var monobjet_json = JSON.stringify(monobjet);
                    sessionStorage.setItem(x,monobjet_json);
                }
            }
        }
    }
} 


// Fonction qui affiche le panier
function basket() {
    let storageKey;
    let basketPriceTotal = 0;
    let basketQuantityTotal = 0;
    modalBasket = document.getElementById('basketmodal');
    let modalBasketText = '<div class="modal fade" aria-labelledby="label" id="basket-list" tabindex="-1" role="dialog" aria-hidden="true">';
    modalBasketText += '<div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">';
    modalBasketText += '<div class="modal-content">';
    modalBasketText += '<div id="modal-header" class="modal-header">';
    modalBasketText += '<h2 class="modal-title mx-auto col-12 text-center">Mon panier</h2>';
    modalBasketText += '<button type="button" onclick="closeBasketModal()" class="close position-absolute top-0 end-0 mt-2 me-2" data-dismiss="modal"><span>&times;</span></button>';
    modalBasketText += '</div>';
    modalBasketText += '<div id="modal-body" class="modal-body col-12">';
    modalBasketText += '<div class="tableau">';
    modalBasketText += '<table id="myTable" class="tablesorter-bootstrap table" data-toggle="table">';
    modalBasketText += '<thead class="text-center text-white-50">';
    modalBasketText += '<tr>';
    modalBasketText += '<th class="col-1"><h4>Retirer</h4></th>';
    modalBasketText += '<th class="col-6"><h4>Photo</h4></th>';
    modalBasketText += '<th class="col-1"><h4>Quantité</h4></th>';
    modalBasketText += '<th class="col-2 first-mobile"><h4>Prénom</h4></th>';
    modalBasketText += '<th class="col-2"><h4>Prix</h4></th>';
    modalBasketText += '</tr>';
    modalBasketText += '</thead>';
    modalBasketText += '</div>';
    modalBasketText += '</div>';
    // On affiche les données qui sont dans la sessionstorage graçe a une boucle
    for (var i = 0; i < sessionStorage.length; i++) {
        storageKey = sessionStorage.key(i);
        storageJson = sessionStorage.getItem(storageKey);
        const obj = JSON.parse(storageJson);
        let id = i;
        basketPriceTotal += obj.total;
        basketQuantityTotal += obj.quantity;
        modalBasketText += '<tr class="text-white-50 text-center">';
        modalBasketText += '<td style="padding-top:6%;"><a onclick="closeBasketModal(),deleteBasket(' + storageKey + '),openBasketModal(),checkBasket()"><i class="fa fa-trash fa-2x"></i></a></td><td><img class="redimension-basket mx-auto" src="' + obj.image + '"/></td><td><button type="button" onclick="closeBasketModal(),quantitydown(' + storageKey + '),openBasketModal()" class="btn btn-secondary">-</button><h4> ' + obj.quantity + '</h4><button type="button" onclick="closeBasketModal(),quantityup(' + storageKey + '),openBasketModal()" class="btn btn-secondary">+</button></td><td style="padding-top:6%;" class="first-mobile"><h4> ' + obj.name + '</h4></td><td style="padding-top:6%;"><h4>' + obj.total + '€</h4></td>';
        modalBasketText += '</tr>';
    }
    modalBasketText += '<tr class="text-white-50 text-center">';
    modalBasketText += '<td /><td><h4>Total du panier:</h4></td><td class="first-mobile"/><td /><td><h4> ' + basketPriceTotal + ' €</h4></td>';
    modalBasketText += '</tr>';
    modalBasketText += '</table>';
    modalBasketText += '<div class="modal-footer justify-content-center">';
    modalBasketText += '<button type="button" onclick="clearBasket(),closeBasketModal()"; class="btn btn-lg btn-secondary">Vider mon panier</button>';
    // Si la sessionstorage retourne 0 alors on bloque le bouton "Confirmer mon panier"
    if (sessionStorage.length === 0) {
        modalBasketText += '<button type="button" onclick="closeBasketModal(),openFormModal()"; class="btn btn-lg btn-primary mr-3" disabled>Confirmer mon panier</button>';
    } else { // Si le sessionstorage retourne pas 0 alors on débloque le bouton "Confirmer mon panier"
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
    formText += '<input class="form-control mb-2" type="text" id="firstName" min="3" name="firstName">';
    formText += '<label for="lastName" class="mb-2">Nom *</label>';
    formText += '<input class="form-control mb-2" type="text" name="lastName">';
    formText += '<label for="address" class="mb-2">Adresse *</label>';
    formText += '<input class="form-control mb-2" type="text" name="address">';
    formText += '<label for="code" class="mb-2">Code Postal *</label>';
    formText += '<input class="form-control mb-2" type="text" name="code">';
    formText += '<label for="city" class="mb-2">Ville *</label>';
    formText += '<input class="form-control mb-2" type="text" name="city">';
    formText += '<label for="email" class="mb-2">Email *</label>';
    formText += '<input class="form-control mb-4" type="email" id="email" name="email">';
    formText += '</div><div class="col-12 text-center">';
    formText += '<button type="button" onclick="closeFormModal()" class="btn btn-secondary btn-md col-4 mb-2 me-3">Annuler</button>';
    formText += '<button type="button" onclick="sendForm(this.form);" class="btn btn-primary btn-md col-4 mb-2">Confirmer</button>';
    formText += '</div></form></div>';
    formText += '<div class"modal-backdrop fade show" id="formbackdrop" style="display: none;"></div>';
    initForm.innerHTML = formText;
}

// Fonction pour vérifier que prénom et nom est bien remplie
let verifFirstNameLastName = (texte) => {
    // On lance une promesse vous vérifier si le texte est conforme au regex
    return new Promise((resolve, reject) => {
        let regexFirstNameLastName = /^[A-Za-zéèàêëç-\s]{2,50}$/;
        if(regexFirstNameLastName.test(texte) == false) {
            // Il y a une erreur donc on retourne du texte dans reject qu'on lira dans le catch
            reject('Veuillez rentrer un nom ou prénom contenant au moins deux lettres et juste des lettres');
            return false;
        } else {
            resolve(texte);
            return true;
        }
    });
}

// Fonction pour vérifier que prénom et nom est bien remplie
let verifPost = (texte) => {
    return new Promise((resolve, reject) => {
        let regexPost = /^[0-9]{4,6}$/;
        if(regexPost.test(texte) == false) {
            // Il y a une erreur donc on retourne du texte dans reject qu'on lira dans le catch
            reject('Veuillez rentrer un code postal contenant au moins quatre chiffres et juste des chiffres');
            return false;
        }
        else {
            resolve(texte);
            return texte;
        }
    });
}

// Fonction pour vérifier que l'adresse et la ville est bien remplie
let verifAddressCity = (texte) => {
    let regexAdressCity = /^[A-Za-z0-9éèêëç-\s]{2,100}$/;
    if(regexAdressCity.test(texte) == false) {
        alert('Veuillez rentrer une adresse ou une ville contenant au moins deux caractères');
        return false;
    } else {
        return texte;
    }
}

// Fonction pour vérifier que l'adresse mail ressemble bien a ours@ours.com
let verifEmail = (email) => {
    let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexEmail.test(email) == false) {
        alert('Veuillez rentrer un email correct (de la forme ours@ours.com');
        return false;
    } else {
        return email;
    } 
}

// On envoi les données au serveur 
function sendForm(frm) {
    // On appelle la fonction pour vérifier le prénom avec une promesse
    if (verifFirstNameLastName(frm.elements['firstName'].value) .then((output) => {
        // On appelle la fonction pour vérifier le nom avec une promesse
        if (verifFirstNameLastName(frm.elements['lastName'].value) .then((output) => {
            // On appelle la fonction pour vérifier le nom avec une promesse
            if (verifPost(frm.elements['code'].value) .then((output) => {
                // On lance la vérification du formulaire, s'il est correcte on passe a la suite, sinon on ouvre une alerte
                if(verifEmail(frm.elements['email'].value) && verifAddressCity(frm.elements['address'].value) && verifAddressCity(frm.elements['city'].value)){
                    closeFormModal()
                    let totalBasket = 0;
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
                        totalBasket += obj.total;
                        contact_id.push(obj.id);
                    }
                    let bodyRequest = JSON.stringify({
                        "contact": contact, 
                        "products": contact_id
                    });
                    const request = new Request(
                        "http://localhost:3000/api/teddies/order",
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
                        sessionStorage.clear();
                        confirmAlert = document.getElementById('alert');
                        confirmAlertText = '<div class="top-50 start-50 translate-middle alert alert-success position-fixed text-center" id="show-alert" style="visibility: visible" role="alert">';
                        confirmAlertText += '<h3>Commande validé. Bravo !<h3>';
                        confirmAlertText += '<br />';
                        confirmAlertText += '<h3>Merci pour la commande ' + response.contact.firstName + ' ! Note bien ton numéro de commande ci dessous.';
                        confirmAlertText += '<br /><br />';
                        confirmAlertText += '<h3>Commande numéro: ' + orderId + '<h3>';
                        confirmAlertText += '<br />';
                        confirmAlertText += '<h3>Pour un prix total de ' + totalBasket + ' €<h3>';
                        confirmAlertText += '</div>';
                        confirmAlert.innerHTML = confirmAlertText;
                        setTimeout("hiddenDivAlert()", 10000);
                        checkBasket();
                    });
                }
            })
            // Si la promesse pour le code postale retourne une erreur on l'affiche dans alert
            .catch((err) => {
                alert(err);
            }));
        })
        // Si la promesse pour prénom retourne une erreur on l'affiche dans alert
        .catch((err) => {
            alert(err);
        }));
    })
    // Si la promesse pour le nom retourne une erreur on l'affiche dans alert
    .catch((err) => {
    alert(err);
    }));
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
    let numberKey = 0;
    for (var a = 0; a < sessionStorage.length; a++) {
        storageKey = sessionStorage.key(a);
        storageJson = sessionStorage.getItem(storageKey);
        objet = JSON.parse(storageJson);
        numberKey += objet.quantity;
    }
    let initBadge = document.getElementById('badge');
    let badgeText = '<span class="red mr-4">'+ numberKey + '</span>';
    initBadge.innerHTML = badgeText;
}

// Création de la requète pour télécharger le json en tableau
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
                    product += '<figcaption><h1 class="name mb-2">' + tableOurs[i].name + '</h1><img onclick="clearModalDescr();loadCart(\'' + tableOurs[i]._id + '\');openModalDescr(\'' + tableOurs[i]._id + '\')" class="redimension" src="' + tableOurs[i].imageUrl + '"/></figcaption>';
                    product += '<button type="button" onclick="clearModalDescr();loadCart(\'' + tableOurs[i]._id + '\');openModalDescr(\'' + tableOurs[i]._id + '\')"; class="name btn btn-secondary btn-lg mt-4" id="modal-button" data-toggle="modal" data-target="#modal-list">Me connaitre</button>';
                    initProd.innerHTML += product;
                }
                // On crée la futur modal vide pour l'affichage de la description de l'ours
                initModal = document.getElementById('creationmodal');
                let initModalText = '<div class="modal fade" id="modal-list" tabindex="-1" role="dialog" aria-hidden="true">';
                initModalText += '<div class="modal-dialog" role="document">';
                initModalText += '<div class="modal-content">';
                initModalText += '<div id="modal-headerDescr" class="modal-header">';
                initModalText += '<button type="button" onclick="closeModalDescr()" class="close position-absolute top-0 end-0 mt-2 me-2" data-dismiss="modal"><span>&times;</span></button>';
                initModalText += '</div>';
                initModalText += '<div id="modal-bodyDescr" class="modal-body">';
                initModalText += '</div>';
                initModalText += '<div id="modal-footerDescr" class="modal-footer justify-content-center">';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '</div>';
                initModalText += '<div class"modal-backdrop fade show" id="backdrop" style="display: none;"></div>';
                initModal.innerHTML += initModalText;
            }
        };
    }
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
}

// On vide la modal avant l'affichage du nouvelle article
function clearModalDescr() {
    document.getElementById('modal-headerDescr').innerHTML = "";
    document.getElementById('modal-bodyDescr').innerHTML = "";
    document.getElementById('modal-footerDescr').innerHTML = "";
}

// Fonction qui remplie la modal avec les descriptions venu de l'api
function loadCart(i) {
    let x;
    var requests = new XMLHttpRequest();
    requests.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(this.response);
            requests.onload = function() {
                for (let j = 0; j < tableOurs.length; j++) {
                    if (tableOurs[j].name == response.name) {
                        x = j;
                    }
                }
                // On met la réponse de l'api dans le tableau tableOurs
                colorsOurs = response.colors;
                // On prépare la modal description au futur clique de l'utilisateur
                let initModalHeaderDescr = document.getElementById('modal-headerDescr');
                let initModalHeaderDescrText = '<h3 class="modal-title mx-auto col-12 text-center"> ' + response.name + '</h3>';
                initModalHeaderDescr.innerHTML = initModalHeaderDescrText;
                let initModalBodyDescr = document.getElementById('modal-bodyDescr');
                let initModalBodyDescrText = '<img class="redimension" src="' + response.imageUrl + '"/>';
                initModalBodyDescrText += '<p class="mx-auto col-12 text-center"> ' + response.description + ' </p>';
                initModalBodyDescrText += '<p class="text-end">' + response.price/100 + ' €</p>';
                initModalBodyDescrText += '<p class="ms-4"> Autres couleurs disponible : </p>';
                // On crée un panel de couleur pour chaque ours suivant les couleurs prédifini dans l'api
                initModalBodyDescrText += '<div class="ms-4 panelcouleurs row" id="panelco">';
                for (let d = 0; d < colorsOurs.length; d++) {
                    switch (colorsOurs[d]) {
                        case 'Tan':
                            initModalBodyDescrText += '<div id="square-tan" class="square-tan"></div>';
                            break;
                        case "Chocolate":
                            initModalBodyDescrText += '<div id="square-chocolate" class="square-chocolate"></div>';
                            break;
                        case "Black":
                            initModalBodyDescrText += '<div id="square-black" class="square-black"></div>';
                            break;
                        case "White":
                            initModalBodyDescrText += '<div id="square-white" class="square-white"></div>';
                            break;
                        case "Pale brown":
                            initModalBodyDescrText += '<div id="square-paleborwn" class="square-palebrown"></div>';
                            break;
                        case "Dark brown":
                            initModalBodyDescrText += '<div id="square-darkbrown" class="square-darkbrown"></div>';
                            break;
                        case "Brown":
                            initModalBodyDescrText += '<div id="square-brown" class="square-brown"></div>';
                            break;
                        case "Blue":
                            initModalBodyDescrText += '<div id="square-blue" class="square-blue"></div>';
                            break;
                        case "Pink":
                            initModalBodyDescrText += '<div id="square-pink" class="square-pink"></div>';
                            break;
                        case "Beige":
                            initModalBodyDescrText += '<div id="square-beige" class="square-beige"></div>';
                            break;
                        default:
                            initModalBodyDescrText += '<p>Aucunes couleurs disponibles</p>';
                    }
                }
                initModalBodyDescr.innerHTML = initModalBodyDescrText;
                let initModalFooterDescr = document.getElementById('modal-footerDescr');
                let initModalFooterDescrText = '<button type="button" id="modal-close" onclick="closeModalDescr()"; class="btn btn-secondary mr-3" data-dismiss="modal">Retour en arrière</button>';
                initModalFooterDescrText += '<button type="button" id="modal-close" data-dismiss="modal" id="basketmodal' + x + '" data-toggle="modal" data-target="#basketmodal' + x + '" onclick="addBasket(' + x + '),closeModalDescr(' + x + ')" class="btn btn-primary">Acheter</button>';
                initModalFooterDescr.innerHTML = initModalFooterDescrText;    
            };
        }
    }
requests.open("GET", 'http://localhost:3000/api/teddies/' + i + '');
requests.send();
};

// On check le panier au lancement du site pour voir la quantité qu'il y a
checkBasket();

// On lance loadApi pour charger l'api et afficher les Ours
loadApi();

// Fonction qui ouvre la modal de description de l'article
function openModalDescr(i) {
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
