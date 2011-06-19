/**
 * This class generates an Administration Application for any website.
 * The html syntax to load the Administration Application is:
 *  The container of the data to modify must be a div with the class 'Rampage_AdminApp'
 *  The container must have an attribute init which may be the options to submit the data when modified
 *  The container must get inside all the attributes the administrator can modify. The must have the following structure
 *      <tag init="{name: name, type: type, title: title, allowModify: allowModify, allowDelete: allowDelete...}" ... >value</tag> in case of HTML elements (div, span, p, h1, h2, ..., hn, ...)
 *      <img rampageName="name" src="value" ... /> in case of Images
 *      <tag rampageName="name" rampageType="type" value="value".../> in case of XHTML elements (input, ...)
 *
 *      Where:
 *          type = Type of the content (It can be text, textarea, password, checkbox, ...)
 *          name = The name for that content (It will be submitted to server with this name
 *          value = The current value of that element (It will be displayed in the form input)
 *
 * The default method of submitting data is post
 * If any image is loaded, it will be submitted in multipart/form-data automatically
 * Note that if in any Rampage_AdminApp container there are a tag without rampageName, it will be considered NON-modificable.
 *
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 *
 * @see Rampage.html.RampageProcessor
 * @see Rampage.gui.apps.adminapp.Child
 * @see Rampage.gui.apps.adminapp.Events
 *
 * @param id The id of the element to create the AdminApp into
 * @param ops The options for the panel
 */

Rampage.gui.apps.AdminApp = function(id, ops) {
    var options = eval(ops);
    options = options[0];

    this._id = id;
    this._target = Rampage.id(this._id);
    this._title = 'Modificar contenido';
    this._action = options.url;
    this._children = null;
    this._allowNewContent = options.allowNewContent;
    this._allowModify = options.allowModify;
    this._allowDelete = options.allowDelete;

    /**
     * This function will generate the mouse events to allow user editing content.
     * By default, it will add a panel when user generates a onmouseover event, just in the same position of the element
     */
    this._bindMouse = function() {
        var target = this._id;
        this._target.onmouseover = function(e) {
            if(!e) e = window.event;
            var src = Rampage.id(target);
            Rampage.gui.apps.adminapp.Events.mouseOver(e, src);
        }
    }

    this.getAction = function() {
        return this._action;
    }

    /**
     * This method will return all the children of this app
     */
    this.getChildren = function() {
        return this._children;
    }

    /**
     * This method will return the title of the App
     */
    this.getTitle = function() {
        return this._title;
    }

    /**
     * This function will initialize the app by getting all the children of it, and saving all its values.
     * After, it will generate the mouse events for the AdminApp items
     */
    this._init = function() {
        var children = this._target.childNodes;
        this._children = new Rampage.structures.List();
        for(var i=0;i<children.length;i++) {
            var elem = children[i];
            var tag = elem.tagName;
            if(tag != undefined) {
                var init = elem.getAttribute('init');
                elem.removeAttribute('init');
                if(elem.style.display == 'none') {
                    //Remove element
                }
                if(!init) break;
                var ops = eval(init);
                ops = ops[0];
                var type = ops.type;
                var name = ops.name;
                var title = ops.title;

                var value = null;
                if(name != undefined) {
                    if(type == undefined && tag.toLowerCase() == 'img') {
                        type = 'file';
                        value = elem.getAttribute('src');
                    }
                    else {
                        if(elem.firstChild && elem.firstChild.nodeValue) value = elem.firstChild.nodeValue;
                        else value = elem.getAttribute('value');
                    }
                    this._children.add(new Rampage.gui.apps.adminapp.Child(name, type, value, title));
                }
            }
        }
        this._bindMouse();
    }

    this._unBindMouse = function() {
        this._target.onmouseover = null;
    }

    this.isEditable = function() {
        return this._allowModify;
    }

    this.isEraseable = function() {
        return this._allowDelete;
    }

    this.isAllowingNewContent = function() {
        return this._allowNewContent;
    }

    this._init();
}
Rampage.ready();
