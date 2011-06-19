/**
 * This object is done to store all the rampage elements and canvas too.
 * You can access this elements with Rampage.html.Store.get('id')
 * @author Pelayo Sanchez Margareto
 * @date Feb 15th, 2011
 * @version 1.0
 */

Rampage.html.Store = {
    executionQueue : new Rampage.structures.Queue(),

    /**
     * This method will return the desired element, choosen by its id
     * @param id The html id of the element
     * @return The handler of this element.
     */
    get : function(id) {
        if(this[id]) return this[id]._handler;
        return null;
    },

    /**
     * This method will return all the elements identified with the given className
     * @param className String The className
     * @return Array<Object> the array of the handlers of that resources
     */
    getByClass : function(className) {
        var ret = new Array();
        for(var name in this) {
            if(name != 'get' && name != 'getByClass') {
                if(this[name]._className == className)
                    ret.push(this[name]._handler);
            }
        }
        return ret;
    }
};
Rampage.ready();