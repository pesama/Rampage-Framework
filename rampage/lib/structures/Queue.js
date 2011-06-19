/**
 * This class implements a basic FIFO structure, used by the application.
 * It needs a Rampage.structures.Node, that wil be loaded just when this script is finally loaded.
 *
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 *
 * @uses Rampage.structures.Node
 */

Rampage.include('Rampage.structures.Node');
Rampage.structures.Queue = function() {
    this.className = 'Rampage.structures.Queue';
    this.header = null;
    this.tail = null;

    /**
     * This method returns true if stack is empty, false otherwise
     * @return boolean
     */
    this.isEmpty = function() {
        return this.header == null;
    }

    /**
     * This method removes an element from the end of the structure and returns its value
     * @return object
     */
    this.pop = function() {
        if(!this.isEmpty()) {
            var value = this.header.getValue();
            if(this.tail == this.header) this.header = this.tail = null;
            else this.header = this.header.getNext();
            return value;
        }
        return null;
    }

    /**
     * This method adds an element at the end of the structure
     * @param value The object to append
     */
    this.push = function(value) {
        var n = new Rampage.structures.Node(null, value, null);
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
}