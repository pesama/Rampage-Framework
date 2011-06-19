/**
 * This function will create a Frame into the screen. With the default Rampage style
 *
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 *
 * @param serialUID The serialUID for the frame (is the id of the element)
 * @param parent The element that call the Frame
 */

Rampage.gui.panels.Frame = function(serialUID, parent) {
    this._serialUID = serialUID;
    this._super = parent;
    this._htmlElement = null;
    this._htmlContent = null;
    this._closeButton = null;
    this._title = this._super.getTitle();

    this._closeButtonCallback = null;

    /**
     * This function will display the frame into the screen.
     */
    this._init = function() {
        var ScreenSize = Rampage.util.Gui.getScreenSize();
        var FrameSize = this._super.getInitBounds();

        this._htmlElement = document.createElement('div');
        this._htmlElement.setAttribute('id', this._serialUID);
        this._htmlElement.style.position = 'absolute';
        this._htmlElement.style.top = (ScreenSize.height - FrameSize.height)/2+'px';
        this._htmlElement.style.left = (ScreenSize.width - FrameSize.width)/2+'px';
        this._htmlElement.style.width = FrameSize.width+'px';
        this._htmlElement.style.height = FrameSize.height+'px';
		
        //We create the top border
        var top = document.createElement('div');
            top.style.position = 'absolute';
            top.style.top = '0px';
            top.style.left = '10px';
            top.style.width = FrameSize.width-20+'px';
            top.style.height = '20px';
            top.style.background = 'url(\''+Rampage.get('root')+'/images/frame_top_background.png\') top left repeat-x';

        var title = document.createElement('div');
            title.style.position = 'absolute';
            title.style.top = '3px';
            title.style.left = '10px';
            title.style.fontSize = '10px';
            title.style.fontWeight = 'bold';

        title.appendChild(document.createTextNode(this._title));

        var topLeft = document.createElement('div');
            topLeft.style.position = 'absolute';
            topLeft.style.top = '0px';
            topLeft.style.left = '-10px';
            topLeft.style.width = '10px';
            topLeft.style.height = '20px';
            topLeft.style.background = 'url(\''+Rampage.get('root')+'/images/frame_top_border_rounders.png\') top left no-repeat';

        var topRight = document.createElement('div');
            topRight.style.position = 'absolute';
            topRight.style.top = '0px';
            topRight.style.right = '-10px';
            topRight.style.width = '10px';
            topRight.style.height = '20px';
            topRight.style.background = 'url(\''+Rampage.get('root')+'/images/frame_top_border_rounders.png\') top right no-repeat';

        var logo = document.createElement('img');
            logo.setAttribute('src', Rampage.get('root')+'/images/rampage_logo.png');
            logo.setAttribute('width', 12);
            logo.setAttribute('height', 12);
            logo.style.position = 'absolute';
            logo.style.top = '4px';
            logo.style.left = '-6px';

        this._closeButton = document.createElement('img');
        this._closeButton.setAttribute('src', Rampage.get('root')+'/images/frame_close_button.png');
        this._closeButton.setAttribute('width', 12);
        this._closeButton.setAttribute('height', 12);
        this._closeButton.style.position = 'absolute';
        this._closeButton.style.top = '4px';
        this._closeButton.style.right = '-2px';
        this._closeButton.style.cursor = 'pointer';

        this._htmlContent = document.createElement('div');
        this._htmlContent.style.position = 'absolute';
        this._htmlContent.style.top = '10px';
        this._htmlContent.style.left = '0px';
        this._htmlContent.style.width = (FrameSize.width-4)+'px';
        this._htmlContent.style.height = FrameSize.height-10+'px';
        this._htmlContent.style.background = '#ddd';// url(\''+Rampage.get('root')+'/images/wrapper_background.png\') top left repeat';//'#999';
        this._htmlContent.style.border = '2px solid orange';
        this._htmlContent.style.borderTop = 'none';
        if(FrameSize.height > ScreenSize.height) this._htmlContent.style.overflow = 'auto';

        top.appendChild(title);
        top.appendChild(topLeft);
        top.appendChild(topRight);
        top.appendChild(logo);
        top.appendChild(this._closeButton);

        this._htmlElement.appendChild(this._htmlContent);
        this._htmlElement.appendChild(top);

        Rampage.gui.Screen.show(this._htmlElement);

        this._super.appendData(this._htmlContent);
    }

    /**
     * This function will asociate the close button with given element.
     * If user press the close button, the event will be dispatched.
     */
    this.setCloseButtonCallback = function(callback) {
        this._closeButton.onclick = callback;
    }

    this._init();
}

Rampage.ready();