/**
 * This class implements a Basic LIFO structure using Node
 * @author Sunshine Software
 * @date Nov 06th, 2010
 * @version 1.0
 *
 * @see lib.structures.data.Node
 */

Sunshine.include("lib.structures.data.Node");
var Stack = function() {
    this.header = null;
    this.tail = null;

    /**
     * (Private Method)
     * This method returns true if stack is empty, false otherwise
     * @return boolean
     */
    this.isEmpty = function() {
        return this.header == null;
    }

    /**
     * This method adds an element at the end of the structure
     * @param value The object to append
     */
    this.push = function(value) {
        var n = new Node(null, value, null);
        if(this.isEmpty()) {
            this.header = n;
            this.tail = n;
        }
        else {
            this.tail.setNext(n);
            n.setPrevious(this.tail);
            this.tail = n;
        }
    }

    /**
     * This method removes an element from the end of the structure and returns its value
     * @return object
     */
    this.pop = function() {
        if(!this.isEmpty()) {
            var value = this.tail.getValue();
            if(this.tail == this.header) this.header = this.tail = null;
            else this.tail = this.tail.getPrevious();
            return value;
        }
        return null;
    }
}