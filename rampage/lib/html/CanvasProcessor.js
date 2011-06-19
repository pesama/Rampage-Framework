/**
 * This class is the one who links the application with the html code
 * It will create and store a handler for the <canvas> tags
 * @autor Pelayo Sanchez Margareto
 * @date Feb 15th, 2011
 * @version 1.0
 *
 * @uses Rampage.html.Store
 * @uses Rampage.gui.canvas.Canvas
 */

Rampage.html.CanvasProcessor = {

    /**
     * This method sets up the automatic function to load when module ready
     * @param id the html id of the canvas element
     */
    _dispatchTag : function(id) {
        Rampage.html.Store.executionQueue.push(Rampage.html.Store[id]);
    },
    
    /**
     * This function reads all the tags for the html code, and it continue the process.
     */
    _getTags : function() {
        var canvastags = document.getElementsByTagName('canvas');

        for(var i=0;i<canvastags.length;i++) {
            var id = canvastags[i].getAttribute('id');
            var init = canvastags[i].getAttribute('init');
            canvastags[i].removeAttribute('init');
            this._processTag(id, init);
        }
    },

    /**
     * This function receives a target parsed ready to be processed
     * It means add to the store the canvas handler and finally call to _dispatchTag
     * @param id the id of the canvas
     * @param init Function to call when software initiates
     */
    _processTag : function(id, init) {
        Rampage.html.Store[id] = {
            _target : Rampage.id(id),
            _init : init,
            _handler : null,

            init : function() {
                this._handler = new Rampage.gui.canvas.Canvas(this._target);
                eval(this._init);
            }
        }
        this._dispatchTag(id);
    },

    /**
     * This function initializes the Processor, starting searching tags.
     */
    init : function() {
        this._getTags();
    }
};

Rampage.ready();