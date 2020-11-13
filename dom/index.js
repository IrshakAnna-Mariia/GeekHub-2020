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

    switch (action) {
        case 'add-left':
            let k=0;
            for (let counter = 0; counter< alphabet_A.length; counter++){
                if(currentColumn.childNodes[0].nodeValue ===alphabet_A[counter]) {
                    columnName_A = counter;
                }
            }
            currentColumn.insertAdjacentHTML("beforebegin", "<th>" + currentColumn.childNodes[0].nodeValue + "</th>");
            for(let counter = 0; counter<document.body.children[0].children[0].children[0].children.length; counter++) {
                if(document.body.children[0].children[0].children[0].children[counter].childNodes[0].nodeValue===alphabet_A[columnName_A+k+1]){
                    k++;
                    document.body.children[0].children[0].children[0].children[counter].childNodes[0].nodeValue=alphabet_A[columnName_A+k+1];
                }
            }
            currentColumn.childNodes[0].nodeValue = alphabet_A[columnName_A+1];

            let indexOfCurrentColumn = currentColumn.cellIndex;
            for(let counter=0; counter<document.body.children[0].children[1].children.length; counter++){
                document.body.children[0].children[1].children[counter].children[indexOfCurrentColumn-1].insertAdjacentHTML("beforebegin", "<td><input type=\"text\" name=\"" + alphabet_a[indexOfCurrentColumn-2] + numeral[counter] + "\" value=\"\"/></td>");
            }

            for (let counterCell = indexOfCurrentColumn; counterCell<document.body.children[0].children[1].children[0].children.length; counterCell++){
                for (let counterRow = 0; counterRow<document.body.children[0].children[1].children.length; counterRow++){
                    document.body.children[0].children[1].children[counterRow].children[counterCell].children[0].name = alphabet_a[counterCell-1] + numeral[counterRow];
                }
            }
            break;

        case 'add-right':


            break;

        case 'remove':


            break;
    }

    jQuery('#column-menu').removeClass('d-block');
});
