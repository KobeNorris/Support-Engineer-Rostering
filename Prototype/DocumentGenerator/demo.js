function generateDocument() {
    // var file = new File(["Hello, world!"], "hello world.txt", { type: "text/plain;charset=utf-8" });

    // saveAs(file);

    // var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });

    // saveAs(blob, "hello world.txt");

    var EmployeeProfile = new Blob(["Welcome to Websparrow.org."], { type: "txt/plain;charset=utf-8" });

    // console.log(EmployeeProfile);

    saveAs(EmployeeProfile, "static.txt");
}