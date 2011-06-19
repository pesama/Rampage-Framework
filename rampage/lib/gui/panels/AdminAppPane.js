/**
 * This class creates a graphical Window environment for an Admin App. It meens a Frame with Ok and Cancel Button, and some items given by the Gui util linker.
 * The object that generates this items is the AdminApp class.
 *
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 *
 * @see Rampage.apps.AdminApp
 *
 * @uses Rampage.gui.panels.Frame
 * @uses Rampage.gui.Buttons
 *
 * @param data The data to put into the Admin pane.
 */

Rampage.gui.panels.AdminAppPane = function(data) {
    this._serialUID = Rampage.gui.Screen.register(this);
    this._data = data;
    this._mainPane = null;
    this._okButton = null;
    this._cancelButton = null;
    this._submittingData = '';

    /**
     * This function will create the Frame for displaying data, and put all the data into it
     */
    this._init = function() {
        this._mainPane = new Rampage.gui.panels.Frame(this._serialUID, this);
        this._mainPane.setCloseButtonCallback(Rampage.gui.apps.adminapp.Events.cancelOption);
    }

    /**
     * This function will insert all the data into the given container.
     */
    this.appendData = function(container) {
        var x = 10;
        var y = 20;
        var FrameSize = this.getInitBounds();
        var column = 0;
        var iterator = this._data.getChildren().createIterator();


        var form = document.createElement('form');
            form.setAttribute('name', this._serialUID+'_submitting_form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', this._data.getAction());
            form.setAttribute('target', this._serialUID+'_submitting_iframe');


        var iframe = document.createElement('iframe');
            iframe.setAttribute('name', this._serialUID+'_submitting_iframe');
            iframe.setAttribute('width', '0');
            iframe.setAttribute('height', '0');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('onload', 'Rampage.gui.apps.adminapp.Events.updateReceived(this.name)');

        container.appendChild(form);
        Rampage.util.Gui.getHTMLCanvas().appendChild(iframe);

        while(iterator.areMore()) {
            var item = iterator.getCurrent();
            var label = document.createElement('div');
                label.style.position = 'absolute';
                label.style.left = x+'px';
                label.style.top = (y+2)+'px';
                label.style.width = '90px';
                label.style.fontSize = '11px';
                label.style.textAlign = 'right';

            label.appendChild(document.createTextNode(item.getTitle()));

            var input = document.createElement(item.getType() == 'textarea' ? 'textarea' : 'input');
				if(item.getType() == 'file') {
					form.setAttribute('enctype', 'multipart/form-data');
				}
                if(item.getType() != 'textarea') {
                    input.setAttribute('type', item.getType());
                    input.setAttribute('value', item.getValue());
                }
                else {
                    input.appendChild(document.createTextNode(item.getValue()));
                }
                input.setAttribute('name', item.getName());
                input.style.position = 'absolute';
                input.style.left = (x+100)+'px';
                input.style.top = y+'px';
                input.style.width = '250px';
                input.style.height = (item.getType() == 'textarea' ? 140 : 20)+'px';

            form.appendChild(label);
            form.appendChild(input);
            

            y += item.getType() == 'textarea' ? 150 : 30;
            //Change column
            iterator.next();
        }

        this._okButton = Rampage.gui.Buttons.OKButton();
        this._cancelButton = Rampage.gui.Buttons.CancelButton();

        this._cancelButton.style.position = 'absolute';
        this._cancelButton.style.bottom = '5px';
        this._cancelButton.style.right = '10px';

        container.appendChild(this._cancelButton);

        this._okButton.style.position = 'absolute';
        this._okButton.style.bottom = '5px';
        this._okButton.style.right = (this._cancelButton.offsetWidth + 25)+'px';

        container.appendChild(this._okButton);


        //We allocate the events
        var serialUID = this._serialUID;
        this._okButton.onclick = function(e) {
            if(!e) e = window.event;
            Rampage.gui.apps.adminapp.Events.okOption();
            form.submit();
            Rampage.gui.apps.adminapp.Events.updateSubmitted(e);
        }
        this._cancelButton.onclick = Rampage.gui.apps.adminapp.Events.cancelOption; //Cancel button event
    }

    /**
     * This method will calculate the bounds of the frame based on the data given to append inside.
     * If data is so much and don't fix into the screen, frame will be subdivided in 2 columns.
     * It will generate as columns as needed, and when the width of the frame exceedes the width of the screen, scroll is activated.
     * @return Object The object with width, height & columns
     */
    this.getInitBounds = function() {
        var w = 400; //Minimum width
        var h = 60; //Minimum height
        var ScreenSize = Rampage.util.Gui.getScreenSize();
        var dataLength = 0;
        var columns = 1;
        var iterator = this._data.getChildren().createIterator();
        while(iterator.areMore()) {
            switch(iterator.getCurrent().getType().toLowerCase()) {
            case 'textarea':
                dataLength += 150;
                break;
            default:
                dataLength += 30;
                break;
            }
            iterator.next();
        }

        while(h + dataLength > ScreenSize.height) {
            columns++;
            if(w*columns > ScreenSize.width) {
                columns--;
                break;
            }
            dataLength -= ScreenSize.height;
        }
        return {
            width : w*columns,
            height : h + (dataLength / columns),
            columns : columns
        };
    }

    /**
     * This function returns the title of the panel
     * @return String the title of the frame
     */
    this.getTitle = function() {
        return this._data.getTitle();
    }

    this._init();
}

Rampage.ready();
