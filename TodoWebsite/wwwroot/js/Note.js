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
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
    })
    var body2 = await response.json();

    return body2?.data?.id;

}
async function sendPutRequest(url, body) {
    var userId = document.getElementById("userId");
    userId = userId.value


    const response = await fetch(url + new URLSearchParams({
        id: userId,
    }), {
        method: "PUT",
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
                    <label id="-1" style="display: none"></label>
                    <input class="top" contenteditable="true" asp-for="Notes"  />
                    <textarea class="paper">
                    </textarea>
                    <button id=${noteContainer.childElementCount - 1} type="submit" class="saveNote btn btn-success" onclick="noteSaveClick(this)" style="width:100%">
                        Kaydet
                    </button>
                        

                    <button class="btn btn-dark" type="submit" style="width:100%">
                            Sil
                     </button>
                </div >`

    var template = document.createElement('template');
    template.innerHTML = newElement;
    var content = template.content;
    noteContainer.insertBefore(content, lastChild)

}

async function noteSaveClick(event){
    var noteContainer = document.getElementById("note-container");
        const id = event.id;
        const currentElement = noteContainer.children[id];
        const input = currentElement.getElementsByTagName('input').item(0);
        const textarea = currentElement.getElementsByTagName('textarea').item(0);
        const label = currentElement.getElementsByTagName('label').item(0);
        if (label.id!="-1") {
            console.log(label.value)
            const topic = input?.value
            const content = textarea?.value?.replace(/\s/g, '');
            if (topic && content) {

                sendPutRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/updateNoteByUserId?",
                    { id : label.id,topic, content })
            }
        } else {
            const topic = input?.value
            const content = textarea?.value?.replace(/\s/g, '');
            if (topic && content) {

                var noteId=await sendPostRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/addNoteByUserId?",
                    { topic, content, "creationTime": "2023-06-06T00:54:00.684Z", "lastModifiedTime": "2023-06-06T00:54:00.684Z" })
                if (noteId) {
                    label.id = noteId
                }
            }
        }


}
