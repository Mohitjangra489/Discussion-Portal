
let rightPlaceHolder = document.getElementById("rightPlaceHolder");
let disscussList = document.getElementById("disscussList");
let searchBox = document.getElementById("searchBox");
//
let welcomeMssg;
let indicator;
let questionInp;
let quesDissInp;
let submDiv;
let submitButton;
//
let questionDescriptionFull;
let questionTitleFull;
let questionShower;
let resolveCont;
let quesCont;
let resolveButton;

let responseShower;
let responseItem;
let responseTimeStamp;
let resposeTimeCont;
let solnUserName;
let solnText;
let responseHeading;
let responselist;

let addResponseCont;
let addResponseHeading;
let addResponseUserName;
let addResponseTextArea;
let addResponseSubmitCont;
let addResponseSubmitButton;
let addResponseListItem;



//console.log(currentTime);

function timeCalculator(responseTimeStamp) {
    let inbetweenTime = parseInt(Date.now() - responseTimeStamp);
    let seconds = parseInt(inbetweenTime / 1000);
    let minutes = parseInt(seconds / 60);
    let hours = parseInt(minutes / 60);
    let days = parseInt(hours / 24);
    let months = parseInt(days / 28);
    let years = parseInt(months / 12);
    if (seconds < 60) {
        return seconds + "sec ago";
    } else if (minutes < 60) {
        return minutes + "mins ago";
    } else if (hours < 24) {
        return hours + "hrs ago";
    } else if (days < 28) {
        return days + " days ago";
    } else if (months < 12) {
        return months + " months ago";
    } else {
        return years + " years ago";
    }
}


let descDiv;
let titleDiv;
let listItem;
let queTime;
let actionDivForQuestion;
let likeSpan, likeImg, dislikeSpan, dislikeImg;
let favIndi;


let quesModal = {
    id: "",
    question: "",
    description: "",
    response: []
}
let responseModal = {
    userName: "",
    responseData: "",
    timeStamp: ""
}

// local Storage
let database = [];

if (localStorage.getItem("database") != null) {
    database = JSON.parse(localStorage.getItem("database"));
}
//NOTE :=> question number must have to be updated  with (highest id available)later...  [Done]
//
let questionNO = database.length;

var rightOpen = 0;
var quesOpen = 0;
var questionId;
let max = 0;
let isFavActive = 0;

if ((localStorage.getItem("database") != null)) {

    for (key in database) {
        if (max < database[key].id) {
            max = database[key].id;
        }
        // modal feeding
        quesModal = {
            id: "",
            question: "",
            description: "",
            response: [],
            timeStamp: "",
            noOfresponse: 0,
            isFav: 0,
            noOfLikes: 0,
            noOfDislikes: 0
        }
        quesModal.id = database[key].question;
        quesModal.question = database[key].question;
        quesModal.description = database[key].description;
        quesModal.timeStamp = database[key].timeStamp;
        quesModal.isFav = database[key].isFav;
        quesModal.noOfLikes = database[key].noOfLikes;
        quesModal.noOfDislikes = database[key].noOfDislikes;

        //
        favIndi = document.createElement("img");
        if (quesModal.isFav == 1) {
            favIndi.setAttribute("src", "imgs/fav1.png");
        } else {
            favIndi.setAttribute("src", "imgs/fav0.png");
        }
        favIndi.setAttribute("id", `fav${database[key].id}`);
        favIndi.classList.add("favClass");

        // action DIv
        likeSpan = document.createElement("span");
        dislikeSpan = document.createElement("span");
        likeImg = document.createElement("img");
        dislikeImg = document.createElement("img");
        dislikeImg.setAttribute("src", "imgs/dislikeOff.png");
        likeImg.setAttribute("src", "imgs/likeOff.png");
        likeImg.classList.add("likeImage");
        dislikeImg.classList.add("dislikeImage");

        likeImg.setAttribute("id", `lImg${database[key].id}`);
        dislikeImg.setAttribute("id", `dImg${database[key].id}`);

        likeSpan.innerText = quesModal.noOfLikes;
        dislikeSpan.innerText = quesModal.noOfDislikes;

        likeSpan.setAttribute("id", `lspan${database[key].id}`);
        dislikeSpan.setAttribute("id", `dspan${database[key].id}`);

        actionDivForQuestion = document.createElement("div");
        actionDivForQuestion.classList.add("actionDivForQuestion");

        actionDivForQuestion.append(likeImg, likeSpan, dislikeImg, dislikeSpan);
        //
        queTime = document.createElement("p");
        queTime.innerText = timeCalculator(quesModal.timeStamp);
        listItem = document.createElement("div");
        listItem.classList.add("listItems");
        listItem.setAttribute("id", database[key].id);
        titleDiv = document.createElement("div");
        titleDiv.classList.add("dissListTitle");
        titleDiv.style.pointerEvents = "none";
        titleDiv.innerText = database[key].question;
        descDiv = document.createElement("div");
        descDiv.innerText = database[key].description;
        descDiv.classList.add("dissListDesp");
        descDiv.style.pointerEvents = "none";
        listItem.append(favIndi, queTime, titleDiv, descDiv, actionDivForQuestion);
        disscussList.appendChild(listItem);
    }
    questionNO = max + 1;
    //quesOpen = 1;
    //console.log(disscussList);
}
let x = 0;
let timeUpdater = setInterval(function () {
    if (database.length != 0) {
        if (localStorage.getItem("database") != null) {
            let allQuestionElements = document.getElementById("disscussList").children;
            for (key in allQuestionElements) {
                for (key in database) {
                    if (allQuestionElements[key].id == database[key].id) {
                        let childEl = allQuestionElements[key].children;
                        childEl[1].innerText = timeCalculator(database[key].timeStamp);
                    }
                }
            }
            if(questionId != undefined){
                if(responselist != undefined){
                    let childEl = responselist.children;
                    //console.log(Array.from(childEl));
                    let i = 0;
                    for(key in childEl){
                        database.forEach(function(value,index){
                            if(questionId == value.id){
                                let ts = database[index].response[key].timeStamp
                                childEl[key].firstElementChild.firstElementChild.innerText = timeCalculator(ts) ;
                            }
                        });
                        if(key == childEl.length-1)
                            break;
                    }
                }
            }
        }
    }
}, 1000);
//vars 


let responseNo = 0;

addDissButton.addEventListener('click', function () {
    if (!rightOpen) {
        if (quesOpen) {
            quesOpen = 0;
            questionShower.remove(questionShower);
            responseShower.remove(responseShower);
            addResponseCont.remove(addResponseCont);
        }
        welcomeMssg = document.createElement("h1");
        indicator = document.createElement("p");
        questionInp = document.createElement("input");
        quesDissInp = document.createElement("textarea");
        submDiv = document.createElement("div");
        submitButton = document.createElement("button");
        //adding properties to them
        welcomeMssg.classList.add("welcomeMessage");
        indicator.setAttribute("id", "indicator");
        submDiv.setAttribute("style", "text-align: right; margin:1rem 1rem");
        submitButton.setAttribute("id", "submitDiss");
        //inner texts
        welcomeMssg.innerText = "Welcome to Disscussion Portal !";
        indicator.innerText = "Enter a Subject and Question to get Started";
        submitButton.innerText = "Submit";
        //inps
        questionInp.setAttribute("id", "questionEditText");
        questionInp.setAttribute("placeholder", "Ask here ....");
        questionInp.setAttribute("type", "search");
        questionInp.classList.add("searchElemClass");

        quesDissInp.setAttribute("id", "descriptionEditText");
        quesDissInp.setAttribute("placeholder", "Description ....");
        quesDissInp.setAttribute("type", "text");
        quesDissInp.setAttribute("name", "questionDesp");
        quesDissInp.setAttribute("rows", "10");
        quesDissInp.setAttribute("cols", "30");
        quesDissInp.classList.add("searchElemClass");
        //appending all
        submDiv.appendChild(submitButton);
        rightPlaceHolder.appendChild(welcomeMssg);
        rightPlaceHolder.appendChild(indicator);
        rightPlaceHolder.appendChild(questionInp);
        rightPlaceHolder.appendChild(quesDissInp);
        rightPlaceHolder.appendChild(submDiv);
        rightOpen = 1;


        submitButton.addEventListener('click', submitFunction);
    } else {

    }
});

function submitFunction() {
    if (questionInp.value != "" && quesDissInp.value != "") {
        indicator.innerText = "Enter a Subject and Question to get Started";
        indicator.style.color = "";
        // modal feeding
        quesModal = {
            id: "",
            question: "",
            description: "",
            response: [],
            noOfresponse: 0,
            timeStamp: "",
            isFav: 0,
            noOfLikes: 0,
            noOfDislikes: 0
        }
        quesModal.id = questionNO;
        quesModal.question = questionInp.value;
        quesModal.description = quesDissInp.value;
        quesModal.timeStamp = Date.now();

        database.push(quesModal);
        localStorage.setItem("database", JSON.stringify(database));

        queTime = document.createElement("p");
        queTime.innerText = timeCalculator(quesModal.timeStamp);
        queTime.classList.add(`queTime`);

        likeSpan = document.createElement("span");
        dislikeSpan = document.createElement("span");
        likeImg = document.createElement("img");
        dislikeImg = document.createElement("img");
        dislikeImg.setAttribute("src", "imgs/dislikeOff.png");
        likeImg.setAttribute("src", "imgs/likeOff.png");
        likeImg.classList.add("likeImage");
        dislikeImg.classList.add("dislikeImage");

        likeImg.setAttribute("id", `lImg${questionNO}`);
        dislikeImg.setAttribute("id", `dImg${questionNO}`);

        likeSpan.innerText = "0";
        dislikeSpan.innerText = "0";

        likeSpan.setAttribute("id", `lspan${questionNO}`);
        dislikeSpan.setAttribute("id", `dspan${questionNO}`);

        actionDivForQuestion = document.createElement("div");
        actionDivForQuestion.classList.add("actionDivForQuestion");

        actionDivForQuestion.append(likeImg, likeSpan, dislikeImg, dislikeSpan);

        favIndi = document.createElement("img");
        favIndi.classList.add("favClass");
        favIndi.setAttribute("src", "imgs/fav0.png");
        favIndi.setAttribute("id", `fav${questionNO}`);
        listItem = document.createElement("div");
        listItem.classList.add("listItems");
        listItem.setAttribute("id", questionNO);
        titleDiv = document.createElement("div");
        titleDiv.classList.add("dissListTitle");
        titleDiv.style.pointerEvents = "none";
        titleDiv.innerText = questionInp.value;
        descDiv = document.createElement("div");
        descDiv.innerText = quesDissInp.value;
        descDiv.classList.add("dissListDesp");
        descDiv.style.pointerEvents = "none";
        listItem.appendChild(favIndi);
        listItem.appendChild(queTime);
        listItem.appendChild(titleDiv);
        listItem.appendChild(descDiv);
        listItem.appendChild(actionDivForQuestion);
        disscussList.appendChild(listItem);
        // value = ""
        questionInp.value = "";
        quesDissInp.value = "";
        //removing clilds
        welcomeMssg.remove(welcomeMssg);
        indicator.remove(indicator);
        questionInp.remove(questionInp);
        quesDissInp.remove(quesDissInp);
        submDiv.remove(submDiv);
        rightOpen = 0;
        questionNO++;
    } else {
        indicator.innerText = "Please Enter Proper Input";
        indicator.style.color = "red";
    }
}

disscussList.addEventListener('click', function (event) {

    //for bookmark

    if (event.target.getAttribute("class") == "favClass") {
        let index = -1;
        for (key in database) {
            if (database[key].id == (event.target.id).slice(3)) {
                isFavActive = database[key].isFav;
                index = key;
                break;
            }
        }
        if (!isFavActive) {
            event.target.setAttribute("src", "imgs/fav1.png");
            database[index].isFav = 1;
            isFavActive = 1;
        } else {
            event.target.setAttribute("src", "imgs/fav0.png");
            database[index].isFav = 0;
            isFavActive = 0;
        }
        localStorage.setItem("database", JSON.stringify(database));
    }

    //for like or dislike

    if (event.target.getAttribute("class") == "likeImage"
        || event.target.getAttribute("class") == "dislikeImage") {
        //console.log("|| or worked");
        let index = -1;
        let itemId = -1;
        for (key in database) {
            if (database[key].id == (event.target.id).slice(4)) {
                index = key;
                itemId = database[key].id;
                break;
            }
        }
        if (event.target.getAttribute("id") == `lImg${itemId}`) {
            database[index].noOfLikes += 1;
            let likeCount = document.getElementById(`lspan${itemId}`);
            likeCount.innerText = database[index].noOfLikes;
        } else if (event.target.getAttribute("id") == `dImg${itemId}`) {
            database[index].noOfDislikes += 1;
            let dislikeCount = document.getElementById(`dspan${itemId}`);
            dislikeCount.innerText = database[index].noOfDislikes;
        }
        localStorage.setItem("database", JSON.stringify(database));
    }

    if (event.target.getAttribute("class") == "listItems") {
        //console.log("clicked");
        if (quesOpen) {
            questionShower.remove(questionShower);
            responseShower.remove(responseShower);
            addResponseCont.remove(addResponseCont);
        }

        questionId = event.target.id;

        questionShower = document.createElement("div");
        questionShower.classList.add("questionShower");
        // others
        let h3 = document.createElement("h3");
        h3.innerText = "Question";

        quesCont = document.createElement("div");
        quesCont.classList.add("queCont");

        let children = event.target.children;

        questionTitleFull = document.createElement("p");
        questionTitleFull.innerText = children[2].innerText;
        questionTitleFull.setAttribute("id", "questionTitleFull");
        questionTitleFull.classList.add("title");
        questionDescriptionFull = document.createElement("p");
        questionDescriptionFull.innerText = children[3].innerText;
        questionDescriptionFull.setAttribute("id", "questionDescriptionFull");
        questionDescriptionFull.classList.add("desc");

        quesCont.append(questionTitleFull, questionDescriptionFull);

        resolveCont = document.createElement("div");
        resolveCont.classList.add("resolveContainer");

        resolveButton = document.createElement("button");
        resolveButton.setAttribute("id", "resolveButton");
        resolveButton.innerText = "Resolve";

        resolveButton.addEventListener('click', resolveButtonFunction);



        resolveCont.appendChild(resolveButton);

        questionShower.append(h3, quesCont, resolveCont);

        //responses

        responseShower = document.createElement("div");
        responseShower.classList.add("responsesShower");
        responseShower.setAttribute("id", "responsesShowerid");

        responseHeading = document.createElement("h3");
        responseHeading.innerText = "ADD Response";
        responseHeading.style = "color: rgb(102, 102, 102); cursor:pointer";

        responseHeading.addEventListener('click', responseHeadingFunction);

        responselist = document.createElement("div");
        responselist.classList.add("responseListCont");
        responseShower.append(responseHeading);
        if ((database.length != 0)) {
            database.forEach(function (val, index) {
                //console.log("val.id = ", val.id); // get id
                responseItem = document.createElement("div");
                responseItem.classList.add("responseItem");

                solnUserName = document.createElement("p");
                solnText = document.createElement("p");

                //console.log(questionId, "==", val.id);

                if (questionId == val.id) {
                    if (localStorage.getItem("database")) {
                        for (key in val.response) {

                            responseItem = document.createElement("div");
                            solnUserName = document.createElement("p");
                            resposeTimeCont = document.createElement("div");
                            resposeTimeCont.style = "text-align: right; margin:1rem 1rem";
                            responseTimeStamp = document.createElement("p");
                            solnText = document.createElement("p");
                            responseTimeStamp.innerText = timeCalculator(database[index].response[key].timeStamp);
                            solnUserName.innerText = database[index].response[key].userName;
                            solnText.innerText = database[index].response[key].responseData;
                            solnUserName.classList.add("solnUserName");
                            solnText.classList.add("responseSolnText");
                            responseItem.classList.add("responseItem");
                            resposeTimeCont.append(responseTimeStamp);
                            responseItem.append(resposeTimeCont);
                            responseItem.append(solnUserName, solnText);
                            responselist.appendChild(responseItem);
                            responseShower.appendChild(responselist);
                        }
                    }
                }
            });
        }
        //addResponse Column
        addResponseCont = document.createElement("div");
        addResponseHeading = document.createElement("h3");
        addResponseUserName = document.createElement("input");
        addResponseTextArea = document.createElement("textarea");
        addResponseSubmitCont = document.createElement("div"); addResponseCont
        addResponseSubmitButton = document.createElement("button");

        addResponseHeading.innerText = "Add Response";
        addResponseHeading.style.color = "rgb(102, 102, 102)";
        addResponseUserName.setAttribute("placeholder", "Your Name...");
        addResponseUserName.setAttribute("class", "searchElemClass");
        addResponseUserName.setAttribute("type", "text");

        addResponseTextArea.setAttribute("name", "responseText");
        addResponseTextArea.setAttribute("id", "responseText");
        addResponseTextArea.setAttribute("placeholder", "Description");
        addResponseTextArea.setAttribute("cols", "30");
        addResponseTextArea.setAttribute("rows", "30");

        addResponseSubmitCont.classList.add("responseSubmitContainer");
        addResponseSubmitButton.setAttribute("id", "responseSubmit");
        addResponseSubmitButton.innerText = "Submit";

        addResponseSubmitCont.appendChild(addResponseSubmitButton);

        addResponseCont.classList.add("addResponseHolder");
        addResponseCont.append(addResponseHeading, addResponseUserName, addResponseTextArea, addResponseSubmitCont);

        //appending data
        rightPlaceHolder.appendChild(questionShower);
        rightPlaceHolder.appendChild(responseShower);
        //rightPlaceHolder.appendChild(addResponseCont);

        //removeing form elements
        if (rightOpen) {
            welcomeMssg.remove(welcomeMssg);
            indicator.remove(indicator);
            questionInp.remove(questionInp);
            quesDissInp.remove(quesDissInp);
            submDiv.remove(submDiv);
            rightOpen = 0;
            quesOpen = 1;
        }
        quesOpen = 1;
    }
});

function responseHeadingFunction() {
    rightPlaceHolder.appendChild(addResponseCont);
    addResponseSubmitButton.addEventListener('click', addResponseSubmitButtonFunction);
}

function resolveButtonFunction() {
    //console.log("called", questionId);
    for (key in database) {
        if (database[key].id == questionId) {
            database.splice(key, 1);
        }
    }

    //console.log(database);
    localStorage.setItem("database", JSON.stringify(database));
    if (localStorage.getItem("database") != null) {
        //console.log("true");
        database = JSON.parse(localStorage.getItem("database"));
    }
    let delNode = document.getElementById(questionId);
    delNode.remove(delNode);
    questionShower.remove(questionShower);
    responseShower.remove(responseShower);
    if (addResponseCont != undefined) {
        addResponseCont.remove(addResponseCont);
    }
}

function addResponseSubmitButtonFunction() {
    if (addResponseUserName.value != "" && addResponseTextArea.value != "") {

        //modalFeeding
        responseModal = {
            userName: "",
            responseData: "",
            timeStamp: ""
        }

        responseModal.userName = addResponseUserName.value;
        responseModal.responseData = addResponseTextArea.value;
        responseModal.timeStamp = Date.now();
        //console.log(questionId);
        database.forEach(function (value, index) {
            if (value.id == questionId) {
                database[index].response.push(responseModal);
                database[index].noOfresponse = ++responseNo;
            }
        });

        localStorage.setItem("database", JSON.stringify(database));

        addResponseHeading.innerText = "Add Response";
        addResponseHeading.style.color = "";

        responseItem = document.createElement("div");
        responseItem.classList.add("responseItem");

        resposeTimeCont = document.createElement("div");
        responseTimeStamp = document.createElement("p");
        responseTimeStamp.innerText = timeCalculator(responseModal.timeStamp);
        resposeTimeCont.style = "text-align: right; margin:1rem 1rem";
        solnUserName = document.createElement("p");
        solnText = document.createElement("p");
        solnUserName.innerText = addResponseUserName.value;
        solnText.innerText = addResponseTextArea.value;
        solnUserName.classList.add("solnUserName");
        solnText.classList.add("responseSolnText");

        resposeTimeCont.append(responseTimeStamp);
        responseItem.append(resposeTimeCont);
        responseItem.append(solnUserName, solnText);
        responselist.appendChild(responseItem);
        //console.log(responselist);
        document.getElementById("responsesShowerid").append(responselist);
        addResponseUserName.value = "";
        addResponseTextArea.value = "";

    } else {
        addResponseHeading.innerText = "Please enter valid Response";
        addResponseHeading.style.color = "red";
    }
}

searchBox.addEventListener('input', function (event) {
    let allQuestions = disscussList.children;
    //disscussList.innerHTML = "Please enter some Query";
    if (searchBox.value == "") {
        Array.from(allQuestions).forEach(function (value, index) {
            value.style.display = "block";
            value.style.boxShadow = ""
        });
    } else {
        //console.log(searchBox.value);
        Array.from(allQuestions).forEach(function (value, index) {
            if (((value.innerText).toLowerCase()).includes((searchBox.value).toLowerCase())) {
                //searched elements
                value.style.display = "block";
                value.style.boxShadow = ".1rem .1rem";
            } else {
                value.style.display = "none";
            }
        });
    }
});