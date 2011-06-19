/**
 * This class implements a Basic Iterator for dynamic list's queries.
 * @author Pelayo Sanchez Margareto
 * @date Nov 06th, 2010
 * @version 1.0
 *
 * @uses Rampage.structures.Node
 *
 * @param list The current list to iterate
 */

Rampage.structures.ListIterator = function(list) {
    this.list = list;
    this.current = null;

    /**
     * This method returns true if pointer is pointing to an element
     * @return boolean
     */
    this.areMore = function() {
        return this.current != null;
    }

    /*
     * This method allocates the pointer of the list at the first element
     */
    this.first = function() {
        this.current = this.list.getHeader();
    }

    /**
     * This method returns the current element
     * @return Object
     */
    this.getCurrent = function() {
        if(this.areMore()) return this.current.getValue();
        return null;
    }

    /**
     * This method allocates the pointer at the next element
     */
    this.next = function() {
        if(this.areMore()) this.current = this.current.getNext();
    }

    /**
     * This method removes the current element from the list
     */
    this.remove = function() {
        if(this.areMore()) {
            this.list.remove(this.current);
            this.current = this.current.getNext();
        }
    }

    this.first();
}

Rampage.ready();