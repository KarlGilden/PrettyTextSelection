currentNodeId = "";
currentSelectedElements = [];

const handleTextSelection = () => {
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
        return [parseInt(anchorNodeId[1])];
    }

    returnList = [];

    anchorNodeId = parseInt(anchorNodeId[1]);
    focusNodeId = parseInt(focusNodeId[1]);

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
    clearHighlights();
};

document.addEventListener("selectionchange", handleTextSelection);
document.addEventListener("mouseup", handleMouseUp);