/**
 * This class is the one who manages the events for the gallery
 * Events can be called by mouse, by keyboard...
 * @author Pelayo Sanchez Margareto
 * @date Feb 2nd, 2011
 * @version 1.0
 */

Rampage.gui.gallery.Events = {
    _target : null,

    getTarget : function() {
        return this._target;
    },

    setTarget : function(item) {
        this._target = item;
    }
};

Rampage.ready();