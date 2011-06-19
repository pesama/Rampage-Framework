/**
 * This object is used to manage both Synchronous and asynchronous Ajax requests
 * @author Pelayo Sanchez Margareto
 * @date Feb 16th, 2011
 * @version 1.0
 */

Rampage.communications.Ajax = {

    /**
     * This function returns a new XMLHttpRequest object, needed for ajax communications
     * @return XMLHttpRequest | ActiveXObject
     */
    _XMLHttpRequest : function() {
        if(window.XMLHttpRequest) return new XMLHttpRequest();
        else {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP')
            }catch(e) {
                alert('Ajax is not supported by your browser');
                //Change this.
            }
        }
    },

    /**
     * This function makes a Synchronous ajax call to the given URL, and returns the answer of the server
     * @param url String The url to send the request
     * @param method String The method to sync with (Default get)
     * @param send String the parameters to submit (Default null)
     *
     * @return String the response of the server
     */
    sync : function(url, method, send) {
        if(!method) method = 'GET';
        var req = Rampage.communications.Ajax._XMLHttpRequest();
        req.open(method, url, false);
        req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        req.send(send);
        return req.responseText;
    }
};
Rampage.sync = Rampage.communications.Ajax.sync;
Rampage.ready();