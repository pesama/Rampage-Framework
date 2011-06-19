/**
 * This class is a Map from google maps API. It loads all the functions needed.
 * @author Pelayo Sanchez Margareto
 * @date Feb 24th, 2011
 * @version 1.0
 *
 * @param id The id of the map container
 * @param address The first address to dispatch
 */


Rampage.apis.google.maps.Map = function(id, address) {
        this._id = id;
        this._map = null;
        this._address = address;
        this._options = {
            zoom : 15,
            center : new google.maps.LatLng(50.25, 4.01),
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

        this._init = function() {
            this._map = new google.maps.Map(Rampage.id(this._id), this._options);
            Rampage.apis.google.Maps.init(this._map, this._address);
        }

        this._init();
}

Rampage.ready();