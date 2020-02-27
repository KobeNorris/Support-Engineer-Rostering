/**
 * Ecapsulation of AJAX.
 * @copyright 2018-2019 University of Nottingham, Ningbo, China - IT Services - ECIS Group.
 * @version 0.2
 * @author Yichen Liu (scyyl2@nottingham.edu.cn)
* All rights are reserved.
 */
"use strict";

/**
 * Ecapsulation of AJAX functions
 */
var AJAX = {
    /**
     * @param {string} url  The url to send request to
     * @param {(reponseText: string) => void} onsuccess
     *          The callback function to be called when request is success. Get responseText as parameter
     * @param {(errorCode: number) => void} [onerror]
     *          The callback function to be called when request is fail. Get error code as parameter
     */
    get: function (url, onsuccess, onerror) {
        var xhr;
        // Standard Browser
        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();
        // IE with old version
        else if (window.ActiveXObject)
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        // Really old browsers, no AJAX
        else {
            onerror(-10);
            return;
        }

        xhr.onreadystatechange = function (event) {
            // When the sever have made response
            if (xhr.readyState == 4)
                // When
                if (xhr.status >= 200 && xhr.status <= 299)
                    onsuccess(xhr.responseText);
                else {
                    if (onerror)
                        onerror(xhr.status);
                }
        }
        if (onerror) {
            xhr.onerror = function () {
                onerror(xhr.status)
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    },

    /**
     * @param {string} url  The url to send request to
     * @param {string} data  The data to send (in string).
     * @param {(reponseText: string) => void} onsuccess
     *          The callback function to be called when request is success. Get responseText as parameter
     * @param {(errorCode: number) => void} [onerror]
     *          The callback function to be called when request is fail. Get error code as parameter
     * @param {string} [contentType="application/x-www-form-urlencoded"]
     *          The `Content-type` header of the request. Defaultly `"application/x-www-form-urlencoded"`
     */
    post: function (url, data, onsuccess, onerror, contentType) {
        var xhr;
        // Standard Browsers
        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();
        // IE with old version
        else if (window.ActiveXObject)
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        // Really old browsers, no AJAX
        else {
            onerror(-10);
            return;
        }


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4)
                if (xhr.status >= 200 && xhr.status <= 299)
                    onsuccess(xhr.responseText);
                else {
                    if (onerror)
                        onerror(xhr.status);
                }
        }
        if (onerror) {
            xhr.onerror = function () {
                onerror(xhr.status)
            }
        }
        xhr.open("POST", url, true);

        if (contentType === undefined)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        else
            xhr.setRequestHeader("Content-type", contentType);

        xhr.send(data);
    }
};
