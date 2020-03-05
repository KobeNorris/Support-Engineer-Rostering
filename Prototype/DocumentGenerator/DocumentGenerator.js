var employeeReport;
var targetWorking_id = "scykw1";
var targetJobrole = "PrimaryEngineer";
var payment = 35.72;
var targetYear = 2019;
var targetMonth = 12;

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

    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    var wscols = [
        { width: 20 },
        { width: 20 },
        { width: 40 }
    ];

    ws['!cols'] = wscols;

    wb.Sheets["Test Sheet"] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), targetWorking_id + '-' + targetMonth + ' ' + targetYear + '.xlsx');
}

function getReport() {
    var url = "./php/employeeReport.php";
    var data = "action=getInfo&wokring_id=" + targetWorking_id +
        "&job_Role" + "";

    AJAX.post(url, data,
        function (responseText) {
            employeeReport = JSON.parse(responseText);
            generateDocument();
        }
    )
}

function generateReport() {
    var ondutyCounter = 0;
    var report = [
        [],
        ["Associate Name", ""],
        ["Department Name", "Software Engineering"],
        ["Cost Centre", "50587"],
        ["Employee ID", targetWorking_id],
        ["Employee Number", ""],
        ["Claim Month/Year", targetMonth + "/" + targetYear],
        []
    ]

    employeeReport.forEach(element => {
        report.push([element["date"], element["onDuty"]]);
        if (element["onDuty"] == "Y")
            ondutyCounter++;
    });

    report.push([]);
    report.push(["Payroll Instruction: ", "Please pay " + ondutyCounter + " days ( £" + payment + "/day )"]);
    report.push(["Total: ", "£" + ondutyCounter * payment]);

    return report;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}