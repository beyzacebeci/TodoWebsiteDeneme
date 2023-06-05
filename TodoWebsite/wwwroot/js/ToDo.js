let existingId = []
let counterCall = 0
const randomId = function (length = 10) {
    counterCall++;
    var newId = Math.random().toString(36).substring(2, length + 2);
    let match = existingId.find(function (id) {
        return id == newId;
    });

    if (match && counterCall < 100) {
        randomId();
    }
    else {
        counterCall = 0;
        existingId.push(newId);
        return "e"+newId;
    }
};

function addList() {
    let listId = randomId();

    $('.list-add-wrapper').before(
        '<div class="list-wrapper">' +
        '<div class= "list-header"> ' +
        '<h3 class="card-header-text" contenteditable="true"> <strong>Yeni Liste</strong></h3> ' +
        '</div><div class= "list-cards-wrapper"  id="' + listId + '" > ' +
        '</div>' +
        '<div class= "add-card-composer" onclick="addCard(\'' + listId + '\')"> ' +
        ' <i class="fa fa-plus"></i>  Kart Ekle' +
        '</div>' +
        '</div>');
}

function addCard(elementId) {
    let cardId = randomId();
    var elementOfClicked = $('#' + elementId);
    var newCard = '<div id="' + cardId + '" class="list-card" draggable="true" ondragend="dropCardSelf(event,\'' + cardId + '\')" onclick="overlayOn()" ondragstart="dragCard(event)">' +
        '<a><label class="checkbox-label"><input type="checkbox"><svg viewBox="0 0 64 64">' +
        '<path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength = "575.0541381835938" class= "path" > </path>' +
        '</svg></label><span class= "cardText" >' + (elementOfClicked.children().length + 1) + '. kart </span></a></div>';
    elementOfClicked.append(newCard);

}

function allowDrop(event) {
    event.preventDefault();
}

function dragCard(event) {
    var dataTransfer = event.dataTransfer;
    var draggedElementClass = event.target.getAttribute("id");
    dataTransfer.setData("text", draggedElementClass);
    event.target.style.opacity = "0.5";
}

function dropCard(event) {
    event.preventDefault();
    var dataTransfer = event.dataTransfer;
    var draggedElementId = dataTransfer.getData("text");
    var draggedElement = document.querySelector("#" + draggedElementId);

    draggedElement.style.opacity = "1";
    var targetWrapper = event.target.closest(".list-wrapper");

    if (targetWrapper && targetWrapper.contains(event.target)) {
        
        var targetElement = targetWrapper.querySelector(".list-cards-wrapper");
        targetElement.appendChild(draggedElement);
        
    }
}

function dropCardSelf(event, cardId) {
    event.preventDefault();
    $("#" + cardId).css("opacity", "1");
}

function overlayOn(cardTopic,cardDescription) {
    $(".open-card-header-text").find("strong").text(cardTopic);
    $(".open-card-description-text").text(cardDescription);
    $(".window-overlay").css("display", "block");
}

function overlayOff() {
    $(".window-overlay").css("display", "none");
}

