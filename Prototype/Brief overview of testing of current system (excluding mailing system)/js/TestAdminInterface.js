var employeeReport;
var employeeProfile;
var targetWorking_id = "scykw1";
var targetJobRole = "PrimaryEngineer";
var payment = "35";
var targetYear = "2019";
var targetMonth = "12";

function createEmployee() {
    newWorking_id = "UON";
    newPassword = "1234";
    checkPassword = "1234";

    if (true) {
        var url = "../AdminInterface/php/employeeManipulation.php";
        var data = "action=create&working_id=" + newWorking_id + "&password=" + newPassword;

        AJAX.post(url, data,
            function (responseText) {
                if (responseText == "Success") {
                    document.getElementById("CE").innerHTML = "Success";
                    deleteEmployee();
                }
                else {
                    document.getElementById("CE").innerHTML = "Failed";
                    console.log();
                }
            }
        );
    }
}

function deleteEmployee() {
    var targetWorking_id = "UON";

    var url = "../AdminInterface/php/employeeManipulation.php";
    var data = "action=delete&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("DE").innerHTML = "Success";
                accessEmployeeCategory();
            }
            else {
                document.getElementById("DE").innerHTML = "Failed";
                console.log();
            }
        }
    );
}

function accessEmployeeCategory() {
    var url = "../AdminInterface/php/employeeManipulation.php";
    var data = "action=get";

    AJAX.post(url, data,
        function (responseText) {
            document.getElementById("AEC").innerHTML = "Success";
            accessEmployeeInterface();
        }
    );
}

function accessEmployeeInterface() {
    var targetWorking_id = "scykw1";

    var url = "../AdminInterface/php/setTarget.php";
    var data = "target=other&working_id=" + targetWorking_id;

    AJAX.post(url, data,
        function (responseText) {
            if (responseText == "Success") {
                document.getElementById("AEI2").innerHTML = "Success";
                accessTimetableInterface();
            }
            else {
                document.getElementById("AEI2").innerHTML = "Failed";
                console.log();
            }
        }
    )
}

function accessTimetableInterface() {
    document.getElementById("ATI").innerHTML = "Success";
    getReport();
}

function getReport() {
    var url = "../AdminInterface/php/employeeReport.php";
    var data = "action=getReportData&working_id=" + targetWorking_id +
        "&job_role=" + targetJobRole +
        "&year=" + targetYear +
        "&month=" + targetMonth;

    AJAX.post(url, data,
        function (responseText) {
            employeeReport = JSON.parse(responseText);
            getEmployeeProfile();
        }
    )
}

function getEmployeeProfile() {
    var url = "../AdminInterface/php/employeeReport.php";
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

    document.getElementById("GR").innerHTML = "Success";
    finishAI();

    return report;
}

// S to ab transform
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

function finishAI() {
    AIFinish = true;
    if (EIFinish && TTFinish) {
        logout();
        // alert("All tests passed");
    }
}