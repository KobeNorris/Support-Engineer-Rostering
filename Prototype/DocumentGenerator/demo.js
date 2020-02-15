function generateDocument() {
    // var file = new File(["Hello, world!"], "hello world.txt", { type: "text/plain;charset=utf-8" });

    // saveAs(file);

    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });

    saveAs(blob, "hello world.txt");
}


    // var res = ['Header 1, Header 2, Header 3, Header 4', 'data 1, data 2, data 3, data 4']
    // var file = new File([res.join('\r\n')], "EmployeeReport.csv", { type: "csv/plain;charset=utf-8" });