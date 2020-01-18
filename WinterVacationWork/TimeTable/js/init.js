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
}