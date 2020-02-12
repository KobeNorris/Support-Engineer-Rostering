function generateDocument() {
    var res = ['Header 1, Header 2, Header 3, Header 4', 'data 1, data 2, data 3, data 4']
    var file = new File([res.join('\r\n')], "csv.csv", { type: "text/plain;charset=utf-8" });
    saveAs(file, "Document");
}