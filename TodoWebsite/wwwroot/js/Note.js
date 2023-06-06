async function sendPostRequest(url, body) {
    var userId = document.getElementById("userId");
    userId=userId.value


    const response = await fetch(url + new URLSearchParams({
        id: userId,
    }), {
        method: "POST",
        //mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
    }).catch(err => {
        console.log(err)
});
    return response;

}
function addNote() {
    var noteContainer = document.getElementById("note-container");
    let lastChild = noteContainer.children[noteContainer.childElementCount - 1];
    let newElement=
        `<div class="notepad notepad-item">
                    <label style="display: none">@note.id</label>
                    <input class="top" contenteditable="true" asp-for="Notes"  />
                    <textarea class="paper">
                    </textarea>
                    <button id=${noteContainer.childElementCount-1} type="submit" class="saveNote" onclick="noteSaveClick(this,true)">
                        Kaydet
                    </button>
                </div >`

    var template = document.createElement('template');
    template.innerHTML = newElement;
    var content = template.content;
    noteContainer.insertBefore(content, lastChild)

}

const noteSaveClick = (event, IsNew) => {
    var noteContainer = document.getElementById("note-container");
    if (IsNew) {
        const id = event.id;
        const currentElement = noteContainer.children[id];
        const input = currentElement.getElementsByTagName('input').item(0);
        const textarea = currentElement.getElementsByTagName('textarea').item(0);
        const topic = input?.value
        const content = textarea?.value?.replace(/\s/g, '');
        if (topic && content) {

            sendPostRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/addNoteByUserId?",
                { topic, content, "creationTime": "2023-06-06T00:54:00.684Z", "lastModifiedTime": "2023-06-06T00:54:00.684Z" })
        }
    } else {

    }
}
