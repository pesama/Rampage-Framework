/**
 * This class implements a Node for data Structures. Double-linked
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 */

Rampage.structures.Node = function(previous, value, next) {
    this.previous = previous;
    this.next = next;
    this.value = value;

    /**
     * This method returns the next Node
     * @return Node
     */
    this.getNext = function() {
        return this.next;
    }

    /**
     * This method returns the previous Node
     * @return Node
     */
    this.getPrevious = function() {
        return this.previous;
    }

    /**
     * This method returns the value of the Node
     * @return Object
     */
    this.getValue = function() {
        return this.value;
    }

    /**
     * This method sets up the next Node of the current Node
     * @param next the next Node
     */
    this.setNext = function(next) {
        this.next = next;
    }

    /**
     * This method sets up the previous Node of the current Node
     * @param previous The previous Node
     */
    this.setPrevious = function(previous) {
        this.previous = previous;
    }

    /**
     * This method sets up the value of the Node.
     * @param value The value of the Node
     */
    this.setValue = function(value) {
        this.value = value;
    }
}

Rampage.ready();