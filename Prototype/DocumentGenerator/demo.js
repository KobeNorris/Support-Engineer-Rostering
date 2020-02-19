// function generateDocument() {

//     // var EmployeeProfile = new Blob(["Welcome to Websparrow.org."], { type: "txt/plain;charset=utf-8" });

//     // saveAs(EmployeeProfile, "static.txt");

//     var wb = XLSX.utils.book_new();
//     wb.Props = {
//         Title: "Test excel",
//         Subject: "Test",
//         Author: "Kejia Wu",
//         CreatedDate: new Date()
//     };
//     wb.SheetNames.push("Test Sheet");
//     var ws_data = [['hello', 'world']];
//     var ws = XLSX.utils.aoa_to_sheet(ws_data);
//     wb.Sheets["Test Sheet"] = ws

//     var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

//     saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'test.xlsx');
// }

function generateDocument() {
    var htmls = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">

    <head>
            <meta charset="UTF-8">
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head>

    <body>
        <table>
            <tr>
                <td>dfdsf</td>
                <td>dfdsf</td>
                <td>dfdsf哈哈哈</td>
            </tr>
            <tr>
                <td>dfdsf</td>
                <td>dfdsf</td>
                <td>dfdsf哈哈哈</td>
            </tr>
            <tr>
                <td>dfdsf</td>
                <td>dfdsf</td>
                <td>dfdsf哈哈哈</td>
            </tr>
        </table>
    </body>

    </html>`;
    // var blob = new Blob([htmls], { type: "application/octet-stream" });
    // saveAs(blob, 'test.xlsx');
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}