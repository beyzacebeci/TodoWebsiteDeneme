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
        return "e" + newId;
    }
};

function addList() {
    let listId = randomId();
    $('.list-add-wrapper').before(
        '<div class="list-wrapper"  id="' + listId + '">' +
        '<div class= "list-header">' +
        '<h3 class="card-header-text" contenteditable="true">New List</h3> ' +
        '<button class="list-delete-button" type="submit" onclick="deleteElement(\'' + listId + '\')">' +
        '<i class="fa fa-close"></i>' +
        '</button> '+
        '</div>' +
        '<div class= "list-cards-wrapper"> ' +
        '</div>' +
        '<div class= "add-card-composer" onclick="addCard(\'' + listId + '\')"> ' +
        '<i class="fa fa-plus"></i>  Add Card' +
        '</div>' +
        '</div>');
}

function addCard(elementId) {
    let cardId = randomId();
    var newCard =
        '<div id="' + cardId + '" class="list-card" draggable="true" ondragend="dropCardSelf(event,\'' + cardId + '\')" ondragstart="dragCard(event)">' +
        '<label class="checkbox-label">' +
        '<input class="checkbox-button" type="checkbox" onchange="putData()">' +
        '<svg viewBox="0 0 64 64">' +
        '<path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength = "575.0541381835938" class= "path" > </path>' +
        '</svg>' +
        '</label>' +
        '<div class="card-text-wrapper" onclick="overlayOn(\'' + cardId + '\')">' +
        '<span class="card-text">' +
        'New Card' +
        '</span>' +
        '</div>' +
        '<div class="card-edit-wrapper"><i class="fa fa-pencil"></i></div>' +
        '<button class="card-delete-button" type="submit" onclick="deleteElement(\''+cardId+'\')">'+
        '<i class="fa fa-close" ></i>'+
        '</button> '+
        '<p class="card-description-text" style="display:none;"></p>' +
        '</div>';

    $("#" + elementId).find(".list-cards-wrapper").append(newCard);
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

        event.target.closest(".list-card") == null ? targetWrapper.querySelector(".list-cards-wrapper").appendChild(draggedElement) : event.target.closest(".list-card").before(draggedElement);
        putData();
    }
}

function dropCardSelf(event, cardId) {
    event.preventDefault();
    $("#" + cardId).css("opacity", "1");
}

function overlayOn(elementId) {
    var cardTopicText = $("#" + elementId).find(".card-text").text();
    var cardDescriptionText = $("#" + elementId).find(".card-description-text").text();
    $(".open-card-header-text").find("strong").text(cardTopicText);
    $(".open-card-description-text").text(cardDescriptionText);
    $("#openCardId").val(elementId);
    $(".window-overlay").css("display", "block");
}

function overlayOff(event) {
    if (!$(".window-overlay").find(event.target).length) {
        var elementId = $("#openCardId").val();
        var cardHeader = $(".open-card-header-text").find("strong").text();
        var cardDescription = $(".open-card-description-text").text();
        $("#" + elementId).find(".card-text").text(cardHeader);
        $("#" + elementId).find(".card-description-text").text(cardDescription);
        $(".window-overlay").css("display", "none");
        putData();
    }
}

$(document).on("mouseenter", ".list-card", function () {
    $(this).find(".card-edit-wrapper").css("display", "block");
    $(this).find(".card-delete-button").css("display", "block");
});

$(document).on("mouseleave", ".list-card", function () {
    $(this).find(".card-edit-wrapper").css("display", "none");
    $(this).find(".card-delete-button").css("display", "none");
});

function deleteElement(elementId) {
    $("#" + elementId).remove();
    putData();
}

$(document).on('click', '.card-edit-wrapper', function () {
    var cardText = $(this).siblings('.card-text-wrapper').find('.card-text');
    var currentText = cardText.text();
    var inputField = '<input type="text" class="edit-card-input" value="' + currentText + '" onblur="putData()">';
    cardText.replaceWith(inputField);
    const end = $('.edit-card-input').val().length;
    $('.edit-card-input').get(0).setSelectionRange(end, end);
    $('.edit-card-input').focus();
});

$(document).on('blur', '.edit-card-input', function () {
    var newText = $(this).val();
    var cardText = '<span class="card-text">' + newText + '</span>';
    $(this).replaceWith(cardText);
});

$(document).on('blur', '.open-card-header-text', function () {
    var newText = $(this).text();
});

function putData() {
    var model = {
        id: $('#userId').val(),
        liste: []
    }

    var liste = [];
    $('.list-wrapper').each(function () {
        var listItem = {
            listName: $(this).find(".card-header-text").text(),
            todos: []
        }

        let todos = [];
        $(this).find('.list-card').each(function () {
            var cardElement = $(this);
            let card = {
                topic: cardElement.find(".card-text").text(),
                description: cardElement.find(".card-description-text").text(),
                isChecked: cardElement.find(".checkbox-button").prop("checked"),
                creationTime: "2023-06-07T18:38:26.472Z",
                lastModifiedTime: "2023-06-07T18:38:26.472Z"
            };
            todos.push(card);
        })
        listItem.todos = todos;

        liste.push(listItem);

    });

    model.liste = liste;

    $.ajax({
        type: "PUT",
        url: "https://mongodbinfra20230605150723.azurewebsites.net/List/UpdateAll",
        data: JSON.stringify(model),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error(xhr, status, error);
        }
    });

}

function editCardDescription() {
    var editElement = $(".edit-card-description");
    var descriptionText = $(".open-card-description-text");
    var editArea = $(".description-edit-area");

    if (editElement.text() == "edit") {

        editElement.text("save");
        editArea.val(descriptionText.text());
        descriptionText.css("display", "none");
        editArea.css("display", "block");


    } else {

        editElement.text("edit");
        descriptionText.text(editArea.val());
        descriptionText.css("display", "block");
        editArea.css("display", "none");
    }
    
   
    
}



