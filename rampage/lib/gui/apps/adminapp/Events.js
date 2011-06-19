/**
 * This object allocates all the possible events an admin app can generate
 * This object will add the needed elements into the item container, to allow user the content modification
 *
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 */

Rampage.gui.apps.adminapp.Events = {
    _target : null,
    _x : 0,
    _y : 0,
    _width : 0,
    _height : 0,
    _visual : null, //this will be the visible object
    _callback : null,
    _callbackEvent : null,
    _isUpdating : false,

    deleteRequest : function(e) {
        if(!e) e = window.event;
        document.body.onmousemove = null;
        var elems = Rampage.html.Store.getByClass('Rampage_AdminApp');
        for(var i=0;i<elems.length;i++) {
            elems[i]._unBindMouse();
        }
        var visual = Rampage.gui.apps.adminapp.Events._visual;
        var items = visual.childNodes;
        for(i=0;i<items.length;i++) {
            visual.removeChild(items[i]);
        }

        var l_w = (Rampage.gui.apps.adminapp.Events._visual.offsetHeight / 2);
        var l_x = ((Rampage.gui.apps.adminapp.Events._visual.offsetWidth - l_w) / 2);
        var l_h = l_w;
        var l_y = ((Rampage.gui.apps.adminapp.Events._visual.offsetHeight - l_h) / 2);
        var loading = document.createElement('img');
            loading.setAttribute('src', Rampage.get('root')+'/images/loading.gif');
            loading.setAttribute('width', l_w);
            loading.setAttribute('height', l_h);
            loading.style.position = 'absolute';

            loading.style.position = 'absolute';
            loading.style.top = l_y+'px';
            loading.style.left = l_x+'px';

        Rampage.gui.apps.adminapp.Events._visual.appendChild(loading);
        var target = Rampage.getResource(Rampage.gui.apps.adminapp.Events._target.id);
        var response = Rampage.communications.Ajax.sync(target.getAction(), 'post', 'delete=1');
        response = 1;
        if(response == 1) {
            visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_green_background.png\') top left repeat';
        }
        else {
            visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_red_background.png\') top left repeat';
        }

        setTimeout(Rampage.gui.apps.adminapp.Events.restablishOrder, 500);
    },

    addRequest : function(e) {
        if(!e) e = window.event;
        document.body.onmousemove = null;
        var elems = Rampage.html.Store.getByClass('Rampage_AdminApp');
        for(var i=0;i<elems.length;i++) {
            elems[i]._unBindMouse();
        }
        var visual = Rampage.gui.apps.adminapp.Events._visual;
        var items = visual.childNodes;
        for(i=0;i<items.length;i++) {
            visual.removeChild(items[i]);
        }

        var l_w = (Rampage.gui.apps.adminapp.Events._visual.offsetHeight / 2);
        var l_x = ((Rampage.gui.apps.adminapp.Events._visual.offsetWidth - l_w) / 2);
        var l_h = l_w;
        var l_y = ((Rampage.gui.apps.adminapp.Events._visual.offsetHeight - l_h) / 2);
        var loading = document.createElement('img');
            loading.setAttribute('src', Rampage.get('root')+'/images/loading.gif');
            loading.setAttribute('width', l_w);
            loading.setAttribute('height', l_h);
            loading.style.position = 'absolute';

            loading.style.position = 'absolute';
            loading.style.top = l_y+'px';
            loading.style.left = l_x+'px';

        Rampage.gui.apps.adminapp.Events._visual.appendChild(loading);
        var target = Rampage.getResource(Rampage.gui.apps.adminapp.Events._target.id);
        var response = Rampage.communications.Ajax.sync(target.getAction(), 'post', 'add=1');
        response = 1;
        if(response == 1) {
            visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_green_background.png\') top left repeat';
        }
        else {
            visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_red_background.png\') top left repeat';
        }

        setTimeout(Rampage.gui.apps.adminapp.Events.restablishOrder, 500);
    },

    /**
     * This function is called when the user wants to edit some content. It's done when he press the edit button.
     * @param e Window.event
     */
    editRequest : function(e) {
        if(!e) e = window.event;
        //var src = e.target ? e.target : e.srcElement;
        var elems = Rampage.html.Store.getByClass('Rampage_AdminApp');
        for(var i=0;i<elems.length;i++) {
            elems[i]._unBindMouse();
        }
        var target = Rampage.getResource(Rampage.gui.apps.adminapp.Events._target.id);
        document.body.onmousemove = null;
        Rampage.util.Gui.show(target, 'Rampage_AdminApp');
    },

    /**
     * This function will add the adminapp menu panel to allow user the modification of the content
     * @param e The window.event for the action
     * @param src The source of the action
     */
    mouseOver : function(e, src) {
        //if(!e) e = window.event;
        //var src = e.target ? e.target : e.srcElement;
        if(!Rampage.gui.apps.adminapp.Events._target && src) {
            //We get the main container
            /*while(true) {
                alert(src+', '+src.id+', '+src.className);
                if(!src) return;
                if(Rampage.getResource(src.id)) break;
                src = src.offsetParent;
            }*/
            
            //We get the bounds of the element
            var x = 0;
            var y = 0;
            var width = src.offsetWidth;
            var height = src.offsetHeight;
            var current = src;
            while(current.tagName.toLowerCase() != 'body') {
                x += current.offsetLeft;
                y += current.offsetTop;
                current = current.offsetParent;
            }
            y -= Rampage.util.Gui.getHTMLCanvas().scrollTop;

            Rampage.gui.apps.adminapp.Events._target = src;
            Rampage.gui.apps.adminapp.Events._x = x;
            Rampage.gui.apps.adminapp.Events._y = y;
            Rampage.gui.apps.adminapp.Events._width = width;
            Rampage.gui.apps.adminapp.Events._height = height;

           /*alert(
            'x: '+Rampage.gui.apps.adminapp.Events._x+'\n'+
            'y: '+Rampage.gui.apps.adminapp.Events._y+'\n'+
            'width: '+Rampage.gui.apps.adminapp.Events._width+'\n'+
            'height: '+Rampage.gui.apps.adminapp.Events._height+'\n'+
            'mouse_x: '+x+'\n'+
            'mouse_y: '+y+'\n'
        );*/

            Rampage.gui.apps.adminapp.Events._visual = document.createElement('div');
            
            document.body.appendChild(Rampage.gui.apps.adminapp.Events._visual);
            
            Rampage.gui.apps.adminapp.Events._visual.style.position = 'absolute';
            Rampage.gui.apps.adminapp.Events._visual.style.top = y+'px';
            Rampage.gui.apps.adminapp.Events._visual.style.left = x+'px';
            Rampage.gui.apps.adminapp.Events._visual.style.width = width+'px';
            Rampage.gui.apps.adminapp.Events._visual.style.height = height+'px';
	    Rampage.gui.apps.adminapp.Events._visual.style.zIndex = 99;
            Rampage.gui.apps.adminapp.Events._visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_background.png\') top left repeat';
            
            var target = Rampage.getResource(Rampage.gui.apps.adminapp.Events._target.id);

            if(target.isEditable()) {
                var editButton = document.createElement('img');
                    editButton.setAttribute('src', Rampage.get('root')+'/images/edit_icon.png');
                    editButton.setAttribute('width', '30');
                    editButton.setAttribute('height', '30');

                Rampage.gui.apps.adminapp.Events._visual.appendChild(editButton);

            
                editButton.style.position = 'absolute';
                editButton.style.bottom = '2px';
                editButton.style.right = '2px';
                editButton.style.cursor = 'pointer';

                editButton.onclick = Rampage.gui.apps.adminapp.Events.editRequest;
            }

            if(target.isEraseable()) {
                var deleteButton = document.createElement('img');
                    deleteButton.setAttribute('src', Rampage.get('root')+'/images/delete_icon.png');
                    deleteButton.setAttribute('width', '30');
                    deleteButton.setAttribute('height', '30');

                Rampage.gui.apps.adminapp.Events._visual.appendChild(deleteButton);


                deleteButton.style.position = 'absolute';
                deleteButton.style.bottom = '2px';
                deleteButton.style.right = target.isEditable() ? '34px' : '2px';
                deleteButton.style.cursor = 'pointer';

                deleteButton.onclick = Rampage.gui.apps.adminapp.Events.deleteRequest;
            }

            if(target.isAllowingNewContent()) {
                var addButton = document.createElement('img');
                    addButton.setAttribute('src', Rampage.get('root')+'/images/add_icon.png');
                    addButton.setAttribute('width', '30');
                    addButton.setAttribute('height', '30');

                Rampage.gui.apps.adminapp.Events._visual.appendChild(addButton);


                addButton.style.position = 'absolute';
                addButton.style.bottom = '2px';
                addButton.style.right = target.isEditable() ? target.isEraseable() ? '66px' : '34px' : '2px';
                addButton.style.cursor = 'pointer';

                addButton.onclick = Rampage.gui.apps.adminapp.Events.addRequest;
            }

            document.body.onmousemove = Rampage.gui.apps.adminapp.Events.mouseOut;
        }
        else {
            Rampage.gui.apps.adminapp.Events._callbackEvent = {event: e, target: src};
            Rampage.gui.apps.adminapp.Events._callback = function() {
                Rampage.gui.apps.adminapp.Events.mouseOver(Rampage.gui.apps.adminapp.Events._callbackEvent.event, Rampage.gui.apps.adminapp.Events._callbackEvent.target);
            }
        }

        
    },

    /**
     * This function will remove the adminapp menu panel from the current target element
     * @param e The window.event for the action
     */
    mouseOut : function(e) {
        if(!e) e = window.event;
        var x = e.clientX;
        var y = e.clientY;
        /*alert(
            'x: '+Rampage.gui.apps.adminapp.Events._x+'\n'+
            'y: '+Rampage.gui.apps.adminapp.Events._y+'\n'+
            'width: '+Rampage.gui.apps.adminapp.Events._width+'\n'+
            'height: '+Rampage.gui.apps.adminapp.Events._height+'\n'+
            'mouse_x: '+x+'\n'+
            'mouse_y: '+y+'\n'
        );*/
        if(x < Rampage.gui.apps.adminapp.Events._x || x > Rampage.gui.apps.adminapp.Events._x + Rampage.gui.apps.adminapp.Events._width || y < Rampage.gui.apps.adminapp.Events._y || y > Rampage.gui.apps.adminapp.Events._y + Rampage.gui.apps.adminapp.Events._height) {
            document.body.removeChild(Rampage.gui.apps.adminapp.Events._visual);
            Rampage.gui.apps.adminapp.Events._target = null;
            Rampage.gui.apps.adminapp.Events._visual = null;
            document.body.onmousemove = null;
            if(Rampage.gui.apps.adminapp.Events._callback) {
                Rampage.gui.apps.adminapp.Events._callback();
                Rampage.gui.apps.adminapp.Events._callback = null;
                Rampage.gui.apps.adminapp.Events._callbackEvent = null;
            }
        }
    },

    mouseOutIgnore : function() {
        document.body.removeChild(Rampage.gui.apps.adminapp.Events._visual);
        Rampage.gui.apps.adminapp.Events._target = null;
        Rampage.gui.apps.adminapp.Events._visual = null;
        document.body.onmousemove = null;
    },

    okOption : function() {
        var visual = Rampage.gui.apps.adminapp.Events._visual;
        var items = visual.childNodes;
        for(var i=0;i<items.length;i++) {
            visual.removeChild(items[i]);
        }

        var l_w = (Rampage.gui.apps.adminapp.Events._visual.offsetHeight / 2);
        var l_x = ((Rampage.gui.apps.adminapp.Events._visual.offsetWidth - l_w) / 2);
        var l_h = l_w;
        var l_y = ((Rampage.gui.apps.adminapp.Events._visual.offsetHeight - l_h) / 2);
        var loading = document.createElement('img');
            loading.setAttribute('src', Rampage.get('root')+'/images/loading.gif');
            loading.setAttribute('width', l_w);
            loading.setAttribute('height', l_h);
            loading.style.position = 'absolute';
            
            loading.style.position = 'absolute';
            loading.style.top = l_y+'px';
            loading.style.left = l_x+'px';

        Rampage.gui.apps.adminapp.Events._visual.appendChild(loading);
        Rampage.gui.apps.adminapp.Events._isUpdating = true;
    },

    cancelOption : function(e) {
        if(!e) e = window.event;
        var src = e.target ? e.target : e.srcElement;
        var target = Rampage.getResource(Rampage.gui.apps.adminapp.Events._target.id);
        Rampage.gui.Screen.unregister(src);
        var elems = Rampage.html.Store.getByClass('Rampage_AdminApp');
        for(var i=0;i<elems.length;i++) {
            elems[i]._bindMouse();
        }
        Rampage.gui.apps.adminapp.Events.mouseOutIgnore();
        return false;
    },

    updateSubmitted : function(e) {
        var src = e.target ? e.target : e.srcElement;
        Rampage.gui.Screen.unregister(src);
    },

    updateReceived : function(name) {
        if(Rampage.gui.apps.adminapp.Events._isUpdating) {
            Rampage.gui.apps.adminapp.Events._isUpdating = false;
            var response = top.frames[name].document.getElementById('response').firstChild.nodeValue;

            var visual = Rampage.gui.apps.adminapp.Events._visual;

            if(response == 1) {
                visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_green_background.png\') top left repeat';
            }
            else {
                visual.style.background = 'url(\''+Rampage.get('root')+'/images/wrapper_red_background.png\') top left repeat';
            }

            setTimeout(Rampage.gui.apps.adminapp.Events.restablishOrder, 500);
        }
    },

    restablishOrder : function() {
        var elems = Rampage.html.Store.getByClass('Rampage_AdminApp');
        for(var i=0;i<elems.length;i++) {
            elems[i]._bindMouse();
        }
        Rampage.gui.apps.adminapp.Events.mouseOutIgnore();
        document.location.reload();
    }
};

Rampage.ready();
