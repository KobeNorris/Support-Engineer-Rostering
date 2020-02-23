function generateDocument() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Test excel",
        Subject: "Test",
        Author: "Kejia Wu",
        CreatedDate: new Date()
    };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [["S", "h", "e", "e", "t", "J", "S"], [1, 2, 3, 4, 5]];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'test.xlsx');
}

function getReport() {
    var url = "./php/employeeReport.php";
    var data = "action=getInfo";

    AJAX.post(url, data,
        function (responseText) {
            employeeReport = JSON.parse(responseText);
            // console.log(employeeReport);
            generateDocument();
        }
    )
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}