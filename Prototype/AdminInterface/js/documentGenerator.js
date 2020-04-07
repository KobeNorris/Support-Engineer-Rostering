var employeeReport;
var employeeProfile;
// var targetWorking_id = "scykw1";
// var targetJobRole = "PrimaryEngineer";
// var payment = 35.72;
// var targetYear = 2019;
// var targetMonth = 12;
var targetWorking_id;
var targetJobRole;
var payment;
var targetYear;
var targetMonth;

// Get report data from database
function getReport() {
    var url = "./php/employeeReport.php";
    var data = "action=getReportData&working_id=" + targetWorking_id +
        "&job_role=" + targetJobRole +
        "&year=" + targetYear +
        "&month=" + targetMonth;

    AJAX.post(url, data,
        function (responseText) {
            // console.log(responseText);
            employeeReport = JSON.parse(responseText);
            getEmployeeProfile();
        }
    )
}

// Get employee profile information from database
function getEmployeeProfile() {
    var url = "./php/employeeReport.php";
    var data = "action=getEmployeeInfo&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            // console.log(responseText);
            employeeProfile = JSON.parse(responseText);
            generateDocument();
        }
    )
}

// Generate a downloadable document containing empolyee's report
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

// Generate the content of the report
function generateReport() {
    var ondutyCounter = 0;
    var report = [
        [],
        ["Associate Name", employeeProfile['group_id']],
        ["Department Name", "Software Engineering"],
        ["Cost Centre", "50587"],
        ["Employee ID", targetWorking_id],
        ["Employee Number", employeeProfile['phone_number']],
        ["Employee Job Role", targetJobRole],
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

// S to ab transform
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}