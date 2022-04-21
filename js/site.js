// controller
function getValues() {

    let start = 1;
    let end = 100;
    let fizz = parseInt (document.getElementById("fizzValue").value);
    let buzz = parseInt (document.getElementById("buzzValue").value);

    if (!Number.isInteger(fizz) || !Number.isInteger(buzz)) {
        alert ("Please enter a number only.")
        return;
    }

    let items = generateItems (start, end, fizz, buzz);
    //displayItems (items);
    displayTemplate (items);
}

// logic
function generateItems (start, end, fizz, buzz) {
    if (end < start)  // ensure start less than end
    {
        let m = end;
        end = start;
        start = m;
    }
    let items = [];
    for (let i = start; i <= end; i++) {
        let fmod = (i % fizz == 0);
        let bmod = (i % buzz == 0);
        let s = "";

        switch(true) {
            case fmod && bmod: s = "FB";         break;
            case fmod:         s = "F";          break;
            case bmod:         s = "B";          break;
            default:           s = i.toString(); break;
        }
/*
        if (fmod && bmod)  s = "FB";
        else if (fmod)     s = "F";
        else if (bmod)     s = "B";
        else               s = i.toString();
*/            
        items.push(s);
    }
    return items;
}

// display
function displayItems(items) {

    let titems = "";

    let ilast = items.length-1;
    for (let i=0; i<=ilast; i++) {
        let rowStart = "";
        let rowEnd = "";
        let item = items[i];
        let className = "NoFizzBuzz";
        let td = "";

        if (item === "F") {
            td = className = "Fizz";
        } 
        else if (item === "B") {
            td = className = "Buzz";
        }
        else if (item == "FB") {
            td = className = "FizzBuzz";
        }
        else {
            className = "NoFizzBuzz";
            td = i.toString();
        }

        if (i % 5 == 0) {
            rowStart = "<tr> ";
        }
        else if (i % 5 == 4) {
            rowEnd = '</tr>\n';
        }

        titems += rowStart + `<td class="${className}">${td}</td> ` + rowEnd;
    }
    document.getElementById ("resbody").innerHTML = titems;
}


function displayTemplate (items) {
    let tbody = document.getElementById("resbody");
    let tmplRow = document.getElementById("fbTemplate");
    tbody.innerHTML = "";

    let trow = document.importNode(tmplRow.content, true);
    let rowCols = trow.querySelectorAll("td");
    let colsPerRow = rowCols.length;

    for (let i=0; i<items.length; i+=colsPerRow) {
        trow = document.importNode(tmplRow.content, true);
        rowCols = trow.querySelectorAll("td");

        for (let j=0; j<colsPerRow; j++) {
            let ij = i + j;

            let item = items[ij].toString();
            let td = item;
            let className = "";

            if (item === "F") {
                td = className = "Fizz";
            } 
            else if (item === "B") {
                td = className = "Buzz";
            }
            else if (item == "FB") {
                td = className = "FizzBuzz";
            }
            else {
                td = item;
                className = "NoFizzBuzz";
            }

            rowCols[j].textContent = td;
            if (className.length > 0) {
                let cl = rowCols[j].classList;
                let xl = cl;
                rowCols[j].classList.add (className);
            }

        }
        tbody.appendChild(trow);
    }
}