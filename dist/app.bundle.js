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

// On ajoute un article dans le panier
function addBasket(id) {
    for (let i = 0; i < tableOurs.length; i++) {
        if (id == i) {
            basketId = tableOurs[i]._id;
    var monobjet  = {
        id : tableOurs[i]._id,
        name : tableOurs[i].name,
        image : tableOurs[i].imageUrl,
        price : tableOurs[i].price
      };
      var monobjet_json = JSON.stringify(monobjet);
    sessionStorage.setItem(id,monobjet_json);
    // alertAddBasket = document.getElementById('alert');
    // let addBasketText = '<div class="alert alert-info alert-dismissible fade show" role="alert">' + tableOurs[i].name + ' ajouté au panier !</div>';
    // alertAddBasket.innerHTML += addBasketText;
    basket();
    
}

    }
}

// Fonction qui affiche le panier
function basket() {
    let test;
let calcultotal = 0;
    ModalBasket = document.getElementById('basketmodal');
    let ModalBasketText = '<div class="modal fade" aria-labelledby="label" id="basket-list" tabindex="-1" role="dialog" aria-hidden="true">';
    ModalBasketText += '<div class="modal-dialog modal-dialog-scrollable" role="document">';
    ModalBasketText += '<div class="modal-content">';
    ModalBasketText += '<div id="modal-header" class="modal-header">';
    ModalBasketText += '<h3 class="modal-title mx-auto col-12 text-center"> Panier</h3>';
    ModalBasketText += '</div>';
    ModalBasketText += '<div id="modal-body" class="modal-body">';
    ModalBasketText += '<div class="tableau">';
    ModalBasketText += '<table id="myTable" class="tablesorter-bootstrap table table-striped" data-toggle="table">';
    ModalBasketText += '<thead class="thead-dark dmserif text-center">';
    ModalBasketText += '<tr>';
    ModalBasketText += '<th class="col-1"></th>';
    ModalBasketText += '<th class="col-7">Image</th>';
    ModalBasketText += '<th class="col-2">Prénom</th>';
    ModalBasketText += '<th class="col-2">Prix</th>';
    ModalBasketText += '</tr>';
    ModalBasketText += '</thead>';
    ModalBasketText += '</dt>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    for (var i = 0; i < sessionStorage.length; i++) {
        test = sessionStorage.key(i);
        bidule = sessionStorage.getItem(test);
        const obj = JSON.parse(bidule);
        let id = i;
        calcultotal += obj.price;
        ModalBasketText += '<tr>';
        ModalBasketText += '<td style="padding-top:10%;"><a onclick="closeBasketModal(),deleteBasket(' + test + '),openBasketModal()"><i class="fas fa-times fa-2x"></i></a></td><td><img class="redimension-basket mx-auto" src="' + obj.image + '"/></td><td> ' + obj.name + '</td><td>  ' + obj.price + ' € </td>';
        ModalBasketText += '</tr>';
        }
        ModalBasketText += '</tbody>';
        ModalBasketText += '</table>';
    ModalBasketText += '<h5>Total du panier: ' + calcultotal + ' €<h5>';
    ModalBasketText += '<h3> </h3>'; 
    ModalBasketText += '</div>';
    ModalBasketText += '<div class="modal-footer mx-auto">';
    ModalBasketText += '<button type="button" onclick="clearBasket(),closeBasketModal(),openBasketModal()"; class="btn btn-md btn-primary">Vider mon panier</button>';
    ModalBasketText += '<button type="button" id="modal-close" onclick="closeBasketModal()"; class="btn btn-md btn-secondary mr-3" data-dismiss="modal">Fermer</button>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    ModalBasketText += '</div>';
    ModalBasketText += '<div class"modal-backdrop fade show" id="basketbackdrop" style="display: none;"></div>';
    ModalBasket.innerHTML = ModalBasketText;
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
}

