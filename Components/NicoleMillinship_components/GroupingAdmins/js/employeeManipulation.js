/**
 * Manipulation towards employee personal information
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var employeeInfo;
var newWorking_id;
var newPassword;
var checkPassword;

getEmployeeInfo();

/**
 * Get employee data from database
 */
function getEmployeeInfo() {
    var url = "./php/employeeManipulation.php";
    var data = "action=get";
  
    AJAX.post(url, data,
        function (responseText) {
            employeeInfo = JSON.parse(responseText);
            buildEmployeeTable();
        }
    );
}