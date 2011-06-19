/**
 * In this class are allocated the miscellaneous functions that couldn't match in any group.
 * Note that this class may change within versions.
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 */

Rampage.util.Gui = {
    _wrapper : null,
    _htmlCanvas : null,
    _width : 0,
    _height : 0,
    _keyBindCallback : null,
    guiCallbacks : null,
    
    _init : function() {
        this.guiCallbacks = new Rampage.structures.List();
        var newBody = document.createElement('div');
            newBody.setAttribute('style', 'position:absolute;top:0px;left:0px;width:100%;height:100%;overflow:auto;');

        var wrapper = document.createElement('div');
            wrapper.setAttribute('style', 'position:absolute;top:0px;left:0px;width:100%;height:auto;');
            wrapper.setAttribute('class', 'Rampage_body');

        newBody.appendChild(wrapper);

        var currentWrapper = Rampage.byTag('body')[0];
            currentWrapper.style.overflow = 'hidden';

        var text = currentWrapper.innerHTML;
        currentWrapper.innerHTML = '';

        document.body.appendChild(newBody);
        wrapper.innerHTML = text;

        this._wrapper = document.createElement('div');
        this._wrapper.setAttribute('id', Rampage.get('guiContainer'));
        this._wrapper.setAttribute('class', 'Rampage_gui_wrapper');
        this._wrapper.style.position = 'absolute';
        this._wrapper.style.top = '0px';
        this._wrapper.style.left = '0px';
        this._wrapper.style.width = '100%';
        this._wrapper.style.height = '100%';
        this._wrapper.style.zIndex = (Rampage.get('maxWebsiteIndex')+1);
        this._wrapper.style.display = 'none';
        this._wrapper.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_background.png\') top left repeat';

        document.body.appendChild(this._wrapper);
		
        this._width = document.body.offsetWidth-50;
        this._height = document.body.offsetHeight-50;

        this._htmlCanvas = newBody;
    },

    _keyBind : function(key, func) {
        this._keyBindCallback = func;
        window.onkeypress = function(e) {
            if(!e) e = window.event;
            if(e.keyCode == key) Rampage.util.Gui._keyBindCallback();
        }
    },

    _showAdminApp : function(app) {
        new Rampage.gui.panels.AdminAppPane(app);
    },

    _showImage : function(href) {
        var close = document.createElement('img');
            close.setAttribute('src', Rampage.get('root')+'/images/Rampage_close_icon.png');
            close.style.position = 'absolute';
            close.style.top = '5px';
            close.style.right = '5px';
            close.style.width = '40px';
            close.style.height = '40px';
            close.style.cursor = 'pointer';
            close.onclick = Rampage.util.Gui.disable;

        this._wrapper.appendChild(close);

        var image = document.createElement('img');
            image.setAttribute('src', href);

        this._wrapper.appendChild(image);

        var width = image.offsetWidth;
        var height = image.offsetHeight;
        var ratio = width / height;

        while(true) {
            if(width > this._width) {
                width = (this._width);
                height = width / ratio;
            }
            if(height > this._height) {
                height = (this._height);
                width = height * ratio;
            }

            if(width < this._width && height < this._height) {
                break;
            }
        }

        var x = (this._width - width) / 2;
        var y = (this._height - height) / 2;

        image.setAttribute('style', 'position:absolute;top:'+y+'px;left:'+x+'px;width:'+width+'px;height:'+height+'px;');
    },

    _showInputPane : function(data) {
        new Rampage.gui.panels.InputPane(data);
    },
    
    _toggleRampage : function() {
        this._wrapper.style.display = this._wrapper.style.display == 'block' ? 'none' : 'block';
        if(this._wrapper.style.display == 'block') {
            this._keyBind(27, Rampage.util.Gui._toggleRampage);
        }
        else this._keyBind(27, void(0));
    },

    callbacks : function(code) {
        var iterator = this.guiCallbacks.createIterator();
        while(iterator.areMore()) {
            var item = iterator.getCurrent();
            if(item.code == code) {
                iterator.remove();
                item.callback();
                break;
            }
            iterator.next();
        }
    },

    disable : function() {
        while(Rampage.util.Gui._wrapper.style.display != 'none') {
            Rampage.util.Gui._toggleRampage();
        }
    },

    DOM : {
        /**
         * This method creates and returns a DOM element with the given tagName
         * @param tag the type of the tag (i.e. 'div')
         * @return Element the element created
         */
        Element : function(tag) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.element = document.createElement(tag);
            this.parent = null;

            /**
             * This function appends a child to the element
             * @param child Element child
             * @return Element this
             */
            this.appendChild = function(child) {
                this.element.appendChild(child);

                return this;
            }

            this.getHTML = function() {
                return this.element;
            }

            /**
             * This function sets up an attribute for the element
             * @param name the name of the attribute
             * @param value the value of the attribute
             * @return Element this
             */
            this.setAttribute = function(name, value) {
                this.element.setAttribute(name, value);
                return this;
            }

            /**
             * This function sets up the position of the element on the screen. Positions must be given in px. Width & height can be in px or 'auto'
             * @param x The x - position of the element
             * @param y The y - position of the element
             * @param width The width of the element
             * @param height The height of the element
             * @return Element this
             */
            this.setBounds = function(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;

                this.element.style.position = 'absolute';
                this.element.style.left = x+'px';
                this.element.style.top = y+'px';
                this.element.style.width = width+'px';
                this.element.style.height = height+'px';

                return this;
            }

            /**
             * This method sets up a class name for the element
             * @param className the class name to asign to
             * @return Element the element
             */
            this.setClass = function(className) {
                this.element.setAttribute('class', className)
                return this;
            }

            /**
             * This method sets up the id for the element
             * @param id The id for the element
             * @return Element this
             */
            this.setId = function(id) {
                this.element.setAttribute('id', id);
                return this;
            }

            /**
             * This method sets up a name for the element
             * @param name the name to asign to
             * @return Element the element
             */
            this.setName = function(name) {
                this.element.setAttribute('name', name);
                return this;
            }
            return this;
        }
    },

    getHTMLCanvas : function() {
        return this._htmlCanvas;
    },

    getScreenSize : function() {
        return {
            width : this._width,
            height : this._height
        };
    },

    getWrapper : function() {
        return this._wrapper;
    },
    
    show : function(href, kind) {
        this._toggleRampage();
        switch(kind) {
           case 'image':
               this._showImage(href);
               break;
           case 'Rampage_AdminApp':
               this._showAdminApp(href);
               break;
           case 'Rampage_InputPane':
               this._showInputPane(href);
               break;
               
        }
    }
}
Rampage.ready();