var index;

function setUp() {
    alert("index = ", index);
    if(index == null) {
        alert("index is null");
        document.getElementById("employeeIndex").setAttribute('data-value', 1);;
    }
    else {
        document.getElementById("employeeIndex").setAttribute('data-value', index);
    }
}

function addOne() {
    var elem = document.getElementById("employeeIndex").getAttribute('data-value');
    elem = parseInt(elem);
    elem += 1;
    document.getElementById("employeeIndex").setAttribute('data-value', elem);
    index = elem;
    alert("new id = "+ elem);
    // changeEmployee();
}

function subtractOne() {
    var elem = document.getElementById("employeeIndex").getAttribute('data-value');
    elem = parseInt(elem);
    elem -= 1;
    document.getElementById("employeeIndex").setAttribute('data-value', elem);
    index = elem;
    alert("new id = "+ elem);
    // changeEmployee();
}

// function changeEmployee() {
//     var xhttp = new XMLHttpRequest();

//     // xhttp.open("POST", "showEmployee.php", true);
//     // xhttp.send();

//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("test").innerHTML = document.getElementById("employeeIndex").getAttribute('data-value');
//         }
//     };
// }