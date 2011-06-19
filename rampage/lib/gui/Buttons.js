/**
 * This object contains all the generic Buttons the application will use.
 *
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 *
 */

Rampage.gui.Buttons = {

    /**
     * This function will create a button with the given text and icon
     * @param t String The text of the button
     * @param i String the href to the image icon
     * @return Element The HTMLElement of the button
     */
    _createButton : function(t, i) {
        var button = document.createElement('div');
            button.style.padding = '4px 5px 8px 30px';
            button.style.fontSize = '10px';
            button.style.color = '#222';
            button.style.fontWeight = 'bold';
            button.style.background = 'url(\''+Rampage.get('root')+'/images/button_background.png\') top left repeat-x';
            button.style.cursor = 'pointer';

        var buttonLeft = document.createElement('div');
            buttonLeft.style.position = 'absolute';
            buttonLeft.style.top = '0px';
            buttonLeft.style.left = '-5px';
            buttonLeft.style.width = '5px';
            buttonLeft.style.height = '22px';
            buttonLeft.style.background = 'url(\''+Rampage.get('root')+'/images/button_border_rounders.png\') top left no-repeat';
            buttonLeft.style.cursor = 'pointer';

        var buttonRight = document.createElement('div');
            buttonRight.style.position = 'absolute';
            buttonRight.style.top = '0px';
            buttonRight.style.right = '-5px';
            buttonRight.style.width = '5px';
            buttonRight.style.height = '22px';
            buttonRight.style.background = 'url(\''+Rampage.get('root')+'/images/button_border_rounders.png\') top right no-repeat';
            buttonRight.style.cursor = 'pointer';

        var icon = document.createElement('img');
            icon.setAttribute('src', i);
            icon.style.position = 'absolute';
            icon.style.top = '1px';
            icon.style.left = '1px';
            icon.style.width = '20px';
            icon.style.height = '20px';

        button.appendChild(buttonLeft);
        button.appendChild(buttonRight);
        button.appendChild(icon);
        button.appendChild(document.createTextNode(t));

        return button;
    },

    /**
     * This function will create a default Cancel Button
     * @return Element The HTMLElement of the button
     */
    CancelButton : function() {
        var text = 'Cancelar'; //Cambiar esto cuando internacionalice
        var icon = Rampage.get('root') + '/images/button_cancel_option.png';
        return this._createButton(text, icon);
    },

    /**
     * This function will create a default OK Button
     * @return Element The HTMLElement of the button
     */
    OKButton : function() {
        var text = 'Aceptar'; //Cambiar esto cuando internacionalice
        var icon = Rampage.get('root') + '/images/button_ok_option.png';
        return this._createButton(text, icon);
    },
};

Rampage.ready();