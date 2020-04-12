/**
 * Page initialization methods
 * @copyright 2018-2019 University of Nottingham, Nottingham, United Kingdom
 * @version 1.0
 * @author Kejia Wu (KobeNorrisWu@gmail.com)
 * All rights are reserved.
 */

var group_id;

init();

/**
 * Initialize the web page and get data from database
 */
function init() {
    group_id = groupList[0];
    checkRepeat();
    getNameList();
    getMonthData();
    refreshTimeSelector();

    presentDate = new Date();
    cleanExpiredDate(presentDate.getFullYear() + "-" + (presentDate.getMonth() + 1) + "-" + presentDate.getDate());
}

function cleanExpiredDate(presentDate) {
    var url = "./php/expiredDateCleaner.php";
    var data = "presentDate=" + presentDate;

    AJAX.post(url, data,
        function (responseText) {
            // console.log(responseText);
            if (responseText != "Succeed")
                popWarningWindow(responseText);
        }
    )
}