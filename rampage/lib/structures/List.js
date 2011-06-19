/**
 * This class implements a basic dynamic list using Node
 * @author Pelayo Sanchez Margareto
 * @date Nov 06th, 2010
 * @version 1.0
 *
 * @uses Rampage.structures.Node
 * @uses Rampage.structures.ListIterator
 */

Rampage.structures.List = function() {
    this.header = null;
    this.tail = null;
    this.length = 0;

    /**
     * This mehtod adds an element to the end of the structure
     * @param value The value of the new element
     */
    this.add = function(value) {
        var next = new Rampage.structures.Node(null, value, null);
        if(this.tail != null) {
            next.setPrevious(this.tail);
            this.tail.setNext(next);
            this.tail = next;
        }
        else {
            this.header = next;
            this.tail = next;
        }
        this.length++;
    }

    /**
     * This method adds an element to the start of the structure
     * @param value The value of the new element
     */
    this.addFirst = function(value) {
        var first = new Rampage.structures.Node(null, value, null);
        if(this.header != null) {
            this.header.setPrevious(first);
            first.setNext(this.header);
            this.header = first;
        }
        else {
            this.header = first;
            this.tail = first;
        }
        this.length++;
    }

    /**
     * This method returns a new iterator for the list
     * @return ListIterator
     */
    this.createIterator = function() {
        return new Rampage.structures.ListIterator(this);
    }

    /**
     * This method returns the current header of the list
     * It's only called from the iterator.
     */
    this.getHeader = function() {
        return this.header;
    }

    /**
     * This method removes an element from the list
     * @param n The Node to remove
     */
    this.remove = function(n) {
        if(this.header != null) {
            var del = this.header;
            while(del != null) {
                if(del == n) {
                    if(del == this.header) this.header = del.getNext();
                    else del.getPreivious().setNext(del.getNext());
                    this.length--;
                    break;
                }
                del = del.getNext();
            }
        }
    }

    /**
     * This method returns the current size of the list
     * @return int
     */
    this.size = function() {
        return this.length;
    }

    /**
     * This method converts current structure to an array with all its elements at the same order
     * @return Array
     */
    this.toArray = function() {
        var obj = new Array();
        var x = this.getHeader();
        while(x != null) {
            obj.push(x.getValue());
            x = x.getNext();
        }
        return obj;
    }
}

Rampage.ready();