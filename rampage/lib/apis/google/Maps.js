/**
 * This class is the one who manages the Google Maps API requests.
 * @author Pelayo Sanchez Margareto
 * @date Feb 22nd, 2011
 * @version 1.0
 *
 * @uses http://maps.google.com/maps/api/js?sensor=false
 * @uses Rampage.apis.google.maps.Map
 */

Rampage.apis.google.Maps = {
    _sensor : false, //sensor flag
    _geocoder : null, //geocoder element
    _targetMap : null, //target HTMLObject

    /**
     * This function enables the Google geocoder
     */
    _initGeocoder : function() {
        this._geocoder = new google.maps.Geocoder();
    },

    /**
     * This function initiates the geocoding process with a given id and address
     * @param map the map element
     * @param address The address to geocode with
     */
    init : function(map, address) {
        this._targetMap = map;
        this.requestAddress(address);
    },

    /**
     * This function find an address and centers it into the map
     */
    requestAddress : function(address) {
        if(!this._geocoder) this._initGeocoder();
        this._geocoder.geocode( {'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                Rampage.apis.google.Maps._targetMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    'map' : Rampage.apis.google.Maps._targetMap,
                    'position' : results[0].geometry.location
                });
           } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },

    /**
     * This function sets the _sensor flag
     * @param sensor The new sensor flag value
     */
    setSensor : function(sensor) {
        this._sensor = sensor;
    }
}

Rampage.ready();