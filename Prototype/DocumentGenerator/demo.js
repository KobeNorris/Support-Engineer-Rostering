var employeeReport;

function generateDocument() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Employee Profile",
        Subject: "Test",
        Author: "Kejia Wu",
        CreatedDate: new Date()
    };
    wb.SheetNames.push("Test Sheet");

    var ws_data = generateReport();
    // var ws_data = [["S", "h", "e", "e", "t", "J", "S"], [1, 2, 3, 4, 5]];

    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    var wscols = [
        { width: 20 },
        { width: 20 },
        { width: 40 }
    ];

    ws['!cols'] = wscols;

    wb.Sheets["Test Sheet"] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'test.xlsx');
}

function getReport() {
    var url = "./php/employeeReport.php";
    var data = "action=getInfo";

    AJAX.post(url, data,
        function (responseText) {
            employeeReport = JSON.parse(responseText);
            generateDocument();
        }
    )
}

function generateReport() {
    var report = [
        [],
        ["Associate Name", ""],
        ["Department Name", "Software Engineering"],
        ["Cost Centre", "50587"],
        ["Employee ID", ""],
        ["Employee Number", ""],
        ["Claim Month/Year", ""],
        []
    ]

    employeeReport.forEach(element => {
        report.push([element["date"], element["onDuty"]]);
    });

    report.push([]);
    report.push(["Payroll Instruction: ", ""]);
    report.push(["Total: ", ""]);

    return report;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}