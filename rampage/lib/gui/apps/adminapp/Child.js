/**
 * This is the child element for Rampage_AdminApp app. It must contain all the editing options for the application item.
 * @author Pelayo Sanchez Margareto
 * @date Mar 07th, 2011
 * @version 1.0
 *
 * @param name The name of the element
 * @param type The type of the element
 * @param value The current value of the element
 * @param title String the title for the element
 */

Rampage.gui.apps.adminapp.Child = function(name, type, value, title) {
    this._name = name;
    this._title = title;
    this._type = type;
    this._value = value;

    this.getName = function() {
        return this._name;
    }

    this.setName = function(name) {
        this._name = name;
    }

    this.getTitle = function() {
        return this._title;
    }

    this.setTitle = function(title) {
        this._title = title;
    }

    this.getType = function() {
        return this._type;
    }

    this.setType = function(type) {
        this._type = type;
    }

    this.getValue = function() {
        return this._value;
    }

    this.setValue = function(value) {
        this._value = value;
    }
}

Rampage.ready();