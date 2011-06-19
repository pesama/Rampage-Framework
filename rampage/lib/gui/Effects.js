/**
 * This class performs the main animations of the framework.
 * @author Pelayo Sanchez Margareto
 * @date Mar 03rd, 2011
 * @version 1.0
 */

Rampage.gui.Effects = {
    _target : null,
    _animating : false,
    _callback : null,

    /**
     * This method applies the css change to the given element
     * @param name The style property to change
     * @param value The value to asign
     */
    changeProperty : function(name, value) {
        this._target.style[name] = value;
    },

    /**
     * This function is called when the current animation finishes.
     * It deactivate the _animating flag, it calls the callback, and if are there more effects to do, it does them.
     */
    ready : function() {
        this._animating = false;
        this._callback(this._target.id);
    },


    //EFFECTS BELOW HERE

    /**
     * This function performs a simple CSS slide with the given ops
     * @param item The item to animate
     * @param time The time animation will take
     * @param ops The object with the css animation
     * @param callback The function to call when the animation finishes
     */
    slide : function(item, time, ops, callback) {
        if(this._animating) {
            return;
        }
        this._animating = true;
        this._target = item;
        this._callback = callback;
        for(var name in ops) {
            var step_time = Math.abs(time / ops[name]);
            var current = 0;
            var step = ops[name] > 0 ? 1 : -1;
            current += step;
            switch(name) {
            case 'left':
                current += item.offsetLeft;
                break;
            case 'top':
                current += item.offsetTop;
                break;
            }
            var currentTime = 0;
            while(currentTime < time) {
                var options = {};
                options[name] = current;
                current += step;
                setTimeout('Rampage.gui.Effects.changeProperty(\''+name+'\', \''+current+'px\')', currentTime);
                currentTime += step_time;
            }
        }
        setTimeout('Rampage.gui.Effects.ready()', time);
    }
};

Rampage.ready();