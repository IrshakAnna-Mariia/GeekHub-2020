jQuery('input').on('paste', function (e) {
    e.preventDefault();

    let text = e.originalEvent.clipboardData.getData('text/plain');
    let input = e.currentTarget;

    const alphabet_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const alphabet_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numeral = ['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11','12', '13', '14', '15', '16','17','18', '19', '20', '21', '22', '23', '24', '25', '26'];

    let textOf = [];
    textOf = text.split('\n');
    for (let counter = 0; counter < textOf.length; counter++){
        textOf[counter] = textOf[counter].split(';');
    }
    let inputName = input.name.split('');
    let letter;
    let number;

    for (let i = 0; i<alphabet_A.length; i++){
        if (inputName[0]===alphabet_a[i]){letter = i;}
        if (inputName[1]===numeral[i]){number = i;}
    }

    for (let row = number; row < textOf.length+number; row++){
        for (let column = letter; column < textOf[0].length+letter; column ++){
            let cellName = document.getElementsByName(alphabet_a[column] + numeral[row])[0];

            if (cellName===undefined){

                if (document.getElementsByName(alphabet_a[column-1] + numeral[row]).length>0){
                    let newElement = document.body.children[0].children[0].children[0].appendChild(document.createElement("th"));
                    newElement.innerHTML = alphabet_A[column];
                    for (let counter = 0; counter < document.body.children[0].children[1].children.length; counter++) {
                        let newElementColumn = document.body.children[0].children[1].children[counter].appendChild(document.createElement('td'));
                        newElementColumn.innerHTML = "<input type=\"text\" name=\"" + alphabet_a[column] + numeral[counter] + "\" value=\"\"/>";
                    }
                    cellName = document.getElementsByName(alphabet_a[column] + numeral[row])[0];
                }

                else {
                    let newElement1 = document.body.children[0].children[1].appendChild(document.createElement('tr'));
                    newElement1.innerHTML = "<th>" + numeral[row] + "</th>";
                    for (let counter = 0; counter < document.body.children[0].children[1].children[0].children.length-1; counter++){
                        let newElementRow = document.body.children[0].children[1].children[row].appendChild(document.createElement('td'));
                        newElementRow.innerHTML = "<input type=\"text\" name=\"" + alphabet_a[counter] + numeral[row] + "\" value=\"\"/>";
                    }
                    cellName = document.getElementsByName(alphabet_a[column] + numeral[row])[0];
                }
            }

            cellName.value = textOf[row-number][column-letter];

        }
    }
});

var currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
    e.preventDefault();

    currentColumn = e.currentTarget;

    const dontShow = document.body.children[0].children[0].children[0].children[0];
    if(currentColumn===dontShow){
        return;
    }

    var menu = jQuery('#column-menu');

    menu.addClass('d-block');

    menu.css({
        left: e.clientX,
        top: e.clientY
    });
});

jQuery('#column-menu [data-action]').on('click', function (e) {
    e.preventDefault();

    var action = e.currentTarget.getAttribute('data-action');

    const alphabet_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const alphabet_A = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numeral = ['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11','12', '13', '14', '15', '16','17','18', '19', '20', '21', '22', '23', '24', '25', '26'];
    let columnName_A;
    let k=0;

    let indexOfCurrentColumn = currentColumn.cellIndex;

    for (let counter = 0; counter< alphabet_A.length; counter++){
        if(currentColumn.childNodes[0].nodeValue ===alphabet_A[counter]) {
            columnName_A = counter;
        }
    }

    function renameCell( left0_right2) {
        for(let counter = indexOfCurrentColumn+left0_right2; counter<document.body.children[0].children[0].children[0].children.length; counter++) {
            if(document.body.children[0].children[0].children[0].children[counter].childNodes[0].nodeValue===alphabet_A[columnName_A+k+1]){
                k++;
                document.body.children[0].children[0].children[0].children[counter].childNodes[0].nodeValue=alphabet_A[columnName_A+k+1];
            }
        }
    }

    function renameInput() {
        for (let counterCell = indexOfCurrentColumn; counterCell<document.body.children[0].children[1].children[0].children.length; counterCell++){
            for (let counterRow = 0; counterRow<document.body.children[0].children[1].children.length; counterRow++){
                document.body.children[0].children[1].children[counterRow].children[counterCell].children[0].name = alphabet_a[counterCell-1] + numeral[counterRow];
            }
        }
    }

    switch (action) {
        case 'add-left':
            currentColumn.insertAdjacentHTML("beforebegin", "<th>" + currentColumn.childNodes[0].nodeValue + "</th>");
            renameCell(0);
            currentColumn.childNodes[0].nodeValue = alphabet_A[columnName_A+1];

            for(let counter=0; counter<document.body.children[0].children[1].children.length; counter++){
                document.body.children[0].children[1].children[counter].children[indexOfCurrentColumn].insertAdjacentHTML("beforebegin", "<td><input type=\"text\" name=\"" + alphabet_a[indexOfCurrentColumn-2] + numeral[counter] + "\" value=\"\"/></td>");
            }

            renameInput();
            break;

        case 'add-right':
            currentColumn.insertAdjacentHTML("afterend", "<th>" + alphabet_A[columnName_A+1] + "</th>");
            renameCell(2);
            for(let counter=0; counter<document.body.children[0].children[1].children.length; counter++){
                document.body.children[0].children[1].children[counter].children[indexOfCurrentColumn].insertAdjacentHTML("afterend", "<td><input type=\"text\" name=\"" + alphabet_a[indexOfCurrentColumn] + numeral[counter] + "\" value=\"\"/></td>");
            }
            renameInput();
            break;

        case 'remove':
            currentColumn.remove();
            for(let counterRow=0; counterRow < document.body.children[0].children[1].children.length; counterRow++){
                document.body.children[0].children[1].children[counterRow].children[indexOfCurrentColumn].remove();
            }
            for(let counter = indexOfCurrentColumn; counter<document.body.children[0].children[0].children[0].children.length; counter++) {
                document.body.children[0].children[0].children[0].children[counter].childNodes[0].nodeValue=alphabet_A[columnName_A+k];
                k++;
            }
            renameInput();
            break;
    }

    jQuery('#column-menu').removeClass('d-block');
});

let currentRow;
jQuery('tbody th').on('contextmenu', function (e) {
    e.preventDefault();

    currentRow = e.currentTarget;

    var menu = jQuery('#row-menu');

    menu.addClass('d-block');

    menu.css({
        left: e.clientX,
        top: e.clientY
    });
});

jQuery('#row-menu [data-action]').on('click', function (e) {
    e.preventDefault();
    let indexOfCurrentRow;


    var action = e.currentTarget.getAttribute('data-action');
    const alphabet_a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numeral = ['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11','12', '13', '14', '15', '16','17','18', '19', '20', '21', '22', '23', '24', '25', '26'];
    let lengthOfRow = document.body.children[0].children[1].children[0].children.length;

    function currentRowIndex() {
        for(let counter = 0; counter<document.body.children[0].children[1].children.length; counter++){
            if (currentRow===document.body.children[0].children[1].children[counter].children[0]){
                indexOfCurrentRow = counter;
            }
        }
    }
    function renameRow() {
        for(let counter = 0; counter < document.body.children[0].children[1].children.length; counter++){
            document.body.children[0].children[1].children[counter].children[0].childNodes[0].nodeValue = numeral[counter];
        }
    }
    function addCell(row) {
        for (let counter = 0; counter<lengthOfRow-1; counter++){
            document.body.children[0].children[1].children[indexOfCurrentRow+row].children[counter].insertAdjacentHTML("afterend", "<td><input type=\"text\" name=\"\" value=\"\"/></td>")
        }
    }
    function renameInput() {
        for (let counterCell = 1; counterCell<document.body.children[0].children[1].children[0].children.length; counterCell++){
            for (let counterRow = indexOfCurrentRow; counterRow<document.body.children[0].children[1].children.length; counterRow++){
                document.body.children[0].children[1].children[counterRow].children[counterCell].children[0].name = alphabet_a[counterCell-1] + numeral[counterRow];
            }
        }
    }

    switch (action) {
        case 'add-above':
            currentRowIndex();
            document.body.children[0].children[1].children[indexOfCurrentRow].insertAdjacentHTML("beforebegin", "<tr><th>"+numeral[indexOfCurrentRow]+"</th></th></tr>");
            renameRow();
            addCell(0);
            renameInput();
            break;

        case 'add-under':
            currentRowIndex();
            document.body.children[0].children[1].children[indexOfCurrentRow].insertAdjacentHTML("afterend", "<tr><th>"+numeral[indexOfCurrentRow]+"</th></th></tr>");
            renameRow();
            addCell(1);
            renameInput();
            break;

        case 'remove':
            currentRowIndex();
            document.body.children[0].children[1].children[indexOfCurrentRow].remove();
            renameRow();
            renameInput();
            break;
    }

    jQuery('#row-menu').removeClass('d-block');
});
