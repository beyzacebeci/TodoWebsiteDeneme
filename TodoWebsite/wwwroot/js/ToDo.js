﻿let existingId = []
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
        '<h3 class="card-header-text" contenteditable="true"> <strong>Yeni Liste</strong></h3> ' +
        '</div>' +
        '<div class= "list-cards-wrapper"> ' +
        '</div>' +
        '<div class= "add-card-composer" onclick="addCard(\'' + listId + '\')"> ' +
        '<i class="fa fa-plus"></i>  Kart Ekle' +
        '</div>' +
        '</div>');
}

function addCard(elementId) {
    let cardId = randomId();
    var newCard =
        '<div id="' + cardId + '" class="list-card" draggable="true" ondragend="dropCardSelf(event,\'' + cardId + '\')" ondragstart="dragCard(event)">' +
        '<label class="checkbox-label">' +
        '<input class="checkbox-button" type="checkbox">' +
        '<svg viewBox="0 0 64 64">' +
        '<path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength = "575.0541381835938" class= "path" > </path>' +
        '</svg>' +
        '</label>' +
        '<div class="card-text-wrapper" onclick="overlayOn(\'' + cardId + '\')">' +
        '<span class="card-text">' +
        'Yeni Kart' +
        '</span>' +
        '</div>' +
        '<div class="card-edit-wrapper"><i class="fa fa-pencil"></i></div>' +
        '<p class="card-description-text" style="display:none;"></p>';

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

        var targetElement = targetWrapper.querySelector(".list-cards-wrapper");
        targetElement.appendChild(draggedElement);

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
    $(".window-overlay").css("display", "block");
}

function overlayOff(event) {
    if (!$(".window-overlay").find(event.target).length) {
        $(".window-overlay").css("display", "none");
    }
}

$(document).on("mouseenter", ".list-card", function () {
    $(this).find(".card-edit-wrapper").css("display", "block");
});

$(document).on("mouseleave", ".list-card", function () {
    $(this).find(".card-edit-wrapper").css("display", "none");
});


$(document).on('click', '.card-edit-wrapper', function () {
    var cardText = $(this).siblings('.card-text-wrapper').find('.card-text');
    var currentText = cardText.text();
    var inputField = '<input type="text" class="edit-card-input" value="' + currentText + '">';
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
    console.log(newText);
});

function putData() {
    var model = {
        id: $('#userId').val(),
        liste: []
    }

    var liste = [];
    $('.list-wrapper').each(function () {
        var listItem = {
            listId: $(this).attr('id'),
            listName: $(this).find(".card-header-text").find("strong").text(),
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
    
    console.log(model);

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