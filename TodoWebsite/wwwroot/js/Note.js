async function sendPostRequest(url, body) {
    var userId = document.getElementById("userId");
    userId=userId.value

    const response = await fetch(url + new URLSearchParams({
        id: userId,
    }), {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "*",
           'Access-Control-Allow-Headers': "*",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
    })
    var body2 = await response.json();

    return body2?.data;

}
async function sendPutRequest(url, body) {
    var userId = document.getElementById("userId");
    userId = userId.value


    const response = await fetch(url + new URLSearchParams({
        id: userId,
    }), {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
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
    var body2 = await response.json();

    return body2?.data;

}
async function sendDeleteRequest(url, body,query) {
    var userId = document.getElementById("userId");
    query["id"] = userId.value
    userId = userId.value


    const response = await fetch(url + new URLSearchParams({ ...query }), {
        method: "DELETE",
        mode: "cors", // no-cors, *cors, same-origin
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
    var body2 = await response.json();

    return body2;

}
function addNote() {
    var noteContainer = document.getElementById("note-container");
    let lastChild = noteContainer.children[noteContainer.childElementCount - 1];
    let newElement=


        `<div tabindex="1" id=${(noteContainer.childElementCount) * 1000} class="notepad notepad-item">
                    <label id="-1" style="display: none"></label>
                    <div class="notepad-header">
                        <input class="notepad-header-text" contenteditable="true" asp-for="Notes" onblur="noteSaveClick(${noteContainer.childElementCount - 1})" />
                        <button id="${noteContainer.childElementCount - 1}" class="note-close-button" type="submit" onclick="noteDeleteClick(${noteContainer.childElementCount})">
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <textarea class="paper" onblur="noteSaveClick(${noteContainer.childElementCount - 1})"></textarea>
                </div>`


    var template = document.createElement('template');
    template.innerHTML = newElement;
    var content = template.content;
    noteContainer.insertBefore(content, lastChild)

}

async function noteSaveClick(number) {
    if (number != null) {
        var noteContainer = document.getElementById("note-container");
        /*const id = event.id;*/
        const currentElement = noteContainer.children[number];
        const label = currentElement.getElementsByTagName('label').item(0);
        const textarea = currentElement.getElementsByTagName('textarea').item(0);
        const headerDiv = currentElement.getElementsByTagName('div').item(0);
        const input = headerDiv.getElementsByTagName('input').item(0);


        if (label.id != "-1") {
            const topic = input?.value
            const content = textarea?.value
            if (topic && content) {

                var data = await sendPutRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/updateNoteByUserId?",
                    { id: label.id, topic, content })
                if (data) {
                    //label.id = data.id
                    document.getElementById("alertMessage").innerHTML = "Update successful"
                    document.getElementById("alertContent").style.display = "block"
                    setTimeout(() => {
                        document.getElementById("alertContent").style.display = "none"
                    }, [2000])
                }
            }
        } else {
            const topic = input?.value
            const content = textarea?.value;
            if (topic && content) {

                var data = await sendPostRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/addNoteByUserId?",
                    { topic, content })
                if (data) {
                    label.id = data.id
                    document.getElementById("alertMessage").innerHTML = "Creating successful"
                    document.getElementById("alertContent").style.display = "block"
                    setTimeout(() => {
                        document.getElementById("alertContent").style.display = "none"
                    }, [2000])
                }
            }
        }
    }
}


async function noteDeleteClick(eventnumber) {
    var noteContainer = document.getElementById("note-container");
    const currentElement = noteContainer.children[eventnumber-1];
    const label = currentElement.getElementsByTagName('label').item(0)
        if (label?.id) {
            var result = await sendDeleteRequest("https://mongodbinfra20230605150723.azurewebsites.net/Note/deleteNoteByUserId?", null, { noteid: label.id })
            //location.reload();
            if (result && result.success) {
                document.getElementById("alertMessage").innerHTML = result.message
                document.getElementById("alertContent").style.display = "block"
                var contianer = document.getElementById((eventnumber) * 1000)

                contianer.style.display = "none"
                setTimeout(() => {
                    document.getElementById("alertContent").style.display = "none"
                }, [2000])
            } else {

            document.getElementById("alertMessage").innerHTML = result.message??"Hata oluþtu"
            document.getElementById("alertContent").style.display = "block"
            setTimeout(() => {
                document.getElementById("alertContent").style.display = "none"
            }, [5000])
            }

        }
}


async function test() {
    console.log("tetiklendi")
}

//`<div id=${(noteContainer.childElementCount - 1) * 1000} class="notepad notepad-item">
//                    <label id="-1" style="display: none"></label>
//                    <input class="top" contenteditable="true" asp-for="Notes"  />
//                    <textarea class="paper">
//                    </textarea>
//                    <button id=${noteContainer.childElementCount - 1} type="submit" class="saveNote btn btn-success" onclick="noteSaveClick(this)" style="width:100%">
//                        Kaydet
//                    </button>
                        

//                  <button class="btn btn-dark" type="submit" style="width:100%" onclick="noteDeleteClick(${noteContainer.childElementCount - 1})" >
//                            Sil
//                     </button>
//                </div >`