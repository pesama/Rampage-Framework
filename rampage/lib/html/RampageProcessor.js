/**
 * This class is the one who links the application with the html code
 * It will convert all the <rampage> tags into objects.
 * The syntax for Rampage elements is the following:
 *  <div id="id" class="Rampage_class ..." init="initVars" ...>...</div>
 *
 *  Where:
 *      id is the HTML id for the element
 *      Rampage_class is the target class of the element (see below the _objects object, which contain all the target classes available)
 *      initVars are the variables and attributes to apply to the element (see each Rampage element handler to see the structure for the vars)
 *      
 *
 * @autor Pelayo Sanchez Margareto
 * @date Feb 15th, 2011
 * @version 1.0
 *
 * @uses Rampage.html.Store
 */
Rampage.html.RampageProcessor = {
    /**
     * The _objects Object is the container of all the replacements. It converts the tag className, it assigns the handler of the element, etc.
     */
    _objects : {
        _adminApp : { //Rampage.gui.apps.AdminApp
            _targetClass : 'Rampage_AdminApp',
            _htmlClass : '',
            _handler : Rampage.gui.apps.AdminApp
        },

        _gallery : {//Gallery converter config
            _targetClass : 'Rampage_Gallery',
            _htmlClass : 'Rampage_gui_Gallery',
            _handler : Rampage.gui.Gallery
        },
        
        _googleMaps : { //Gogle maps converter config
            _targetClass : 'Rampage_google_Maps', //target class (for the listener)
            _htmlClass : 'Rampage_apis_google_maps_map', //html class to substitute
            _handler : Rampage.apis.google.maps.Map //The handler of this kind of elements.
        }
    },

    /**
     * This function adds into the execution queue the function to load when the page inits
     * @param id The id of the handler of the element
     */
     _dispatchTag : function(id) {
        Rampage.html.Store.executionQueue.push(Rampage.html.Store[id]);
    },

    /**
     * This function reads all the tags for the html code, and it continue the process.
     */
    _getTags : function() {
        var elements = Rampage.all(document.body);
        var iterator = elements.createIterator();
        while(iterator.areMore()) {
            var className = iterator.getCurrent().className;
            if(className && className.indexOf('Rampage_') == 0) {
                for(var name in this._objects) {
                    if(className.indexOf(this._objects[name]._targetClass) == 0) {
                        this._replaceTag(iterator.getCurrent());
                        break;
                    }
                }
            }
            iterator.next();
        }
    },

    /**
     * This function receives a target parsed ready to be processed
     * It means add to the store its handler, replace the html reference element with the Rampage element.
     * and finally call to _dispatchTag
     * @param tag The tag to replace
     */
    _replaceTag : function(tag) {
        var init = tag.getAttribute('init');
        tag.removeAttribute('init');
        var id = tag.getAttribute('id');
        var allClasses = tag.className.split(' ');
        var className = allClasses[0];
        for(var name in this._objects) {
            var obj = this._objects[name];
            if(obj._targetClass == className) {
                Rampage.html.Store[id] = {
                    _target : Rampage.id(id),
                    _init : init,
                    _className : obj._targetClass,
                    _handler : null,
                    
                    init : function() {
                        this._handler = new obj._handler(id, init);
                    }
                }
                var newClass = obj._htmlClass;
                if(allClasses.length != 1) {
                    for(var i=0;i<allClasses.length;i++) {
                        if(allClasses[i] != obj._targetClass) {
                            newClass += ' '+allClasses[i];
                        }
                    }
                }
                tag.setAttribute('class', newClass);
                break;
                
            }
        }
        this._dispatchTag(id);
    },

    /**
     * This function is called by the Rampage initialization process to convert all the tags.
     */
    init : function() {
        this._getTags();
    }
}
Rampage.ready();