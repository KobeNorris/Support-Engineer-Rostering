var group_id;

init();

function init() {
    group_id = groupList[0];
    checkRepeat();
    getNameList();
    getMonthData();
    refreshTimeSelector();
}