currentNodeId = "";
currentSelectedElements = [];

const handleTextSelection = (e) => {
    newSelection = document.getSelection();
    anchorNode = newSelection.anchorNode;
    focusNode = newSelection.focusNode;

    anchorNodeId = anchorNode.parentNode.id;
    focusNodeId = focusNode.parentNode.id;
    
    if(focusNodeId === "" || focusNodeId === currentNodeId){
        return;
    }

    currentNodeId = focusNodeId;

    allSelectedNodeIds = getMiddleNodes(anchorNodeId, focusNodeId);

    renderHighlight(allSelectedNodeIds);
};

const getMiddleNodes = (anchorNodeId, focusNodeId) => {
    if(anchorNodeId === focusNodeId){
        return [parseInt(anchorNodeId.substring(1))];
    }

    returnList = [];

    anchorNodeId = parseInt(anchorNodeId.substring(1));
    focusNodeId = parseInt(focusNodeId.substring(1));

    maxBound = anchorNodeId <= focusNodeId ? focusNodeId : anchorNodeId;
    minBound = anchorNodeId >= focusNodeId ? focusNodeId : anchorNodeId;

    for(let i=minBound;i<=maxBound;i++){
        returnList.push(i);
    }

    return returnList;
};

const renderHighlight = (nodeIds) => {
    clearHighlights();

    for(let i=0;i<nodeIds.length;i++){
        wordNode = document.getElementById("w"+nodeIds[i]);
        if(!wordNode) return;
        currentSelectedElements.push(wordNode);
        wordNode.classList.add("selected");
    }
};

const clearHighlights = () => {
    console.log("before: " + currentSelectedElements)
    for(let i=0;i<currentSelectedElements.length;i++){
        console.log(currentSelectedElements[i])
        currentSelectedElements[i].classList.remove("selected");
    }
    currentSelectedElements = [];
    console.log("after: " + currentSelectedElements)
};

const handleMouseUp = (e) => {
    console.log(getSelectedText());
};

const getSelectedText = () => {
    let text = "";

    for(let i=0;i<currentSelectedElements.length;i++){
        text += currentSelectedElements[i].textContent + " ";
    }

    return text;
};

const initPrettySelectionForContainer = (textWrapperId) => {
    const textWrapper = document.getElementById(textWrapperId);
    const text = textWrapper.innerText.split(" ");

    textWrapper.innerHTML = "";
    
    for(let i=0;i<text.length;i++){
        textWrapper.appendChild(createSpanElement(text[i], i+1));
        textWrapper.appendChild(document.createTextNode(" "))
    }

    document.addEventListener("selectionchange", handleTextSelection);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", ()=>{clearHighlights()});
}

const createSpanElement = (word, index) => {
    const span = document.createElement("span");
    span.id = "w"+index;
    span.classList.add("word");
    span.innerText = word;

    return span;
};

