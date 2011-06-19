/**
 * This object is the one who validates the forms before send them
 * @author Pelayo Sanchez Margareto
 * @date Feb 10th, 2011
 * @version 1.0
 */

Rampage.forms.Validator = {
	_name : new RegExp('[a-z]+(\s[a-z]+(-[a-z]+)?)?'),
	_email : new RegExp('/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/'),
	_url : new RegExp('^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$'),
	_date : new RegExp('^\d{1,2}\/\d{1,2}\/\d{2,4}$'),
	_hour : new RegExp('^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$'),
	_creditCard : new RegExp('^((67\d{2})|(4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\ d{2}-?\s?\d{6}-?\s?\d{5}$'),
	_bankAccount : new RegExp('^\d{4}(-|\s)?\d{4}(-|\s)?\d{2}(-|\s)?\d{10}'),
	_phone : new RegExp('^[0-9]{2,3}-? ?[0-9]{6,7}$'),
	_cif : new RegExp('^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)? [0-9A-Z]|\d{8}(-|\.)?[A-Z])$'),

        /**
         * This function receives a String to process, and a Regular expression to match both.
         * @param value The String to process
         * @param what_to_analyze The string of the validation, i.e. 'email'.
         * @return boolean true if String matches the pattern. Otherwise it returns false.
         */
	_getValidation : function(value, what_to_analyze) {
		return value.match(this["_"+what_to_analyze]);
	},
	
	/**
	 * This function verifies if the value passed is or not empty
	 * @param value The String to analyze
	 * @return boolean True if not empty. Otherwise false.
	 */
	_validateNonEmpty : function(value) {
		return (value != null) && (value != '');
	},

        /**
         * This function reveives an Event and it processes the obtention of data and call to the code.
         * @param rEvent Rampage.events.Validation
         * @return _getValidation() If expression matches 1, otherwise 0
         */
	validate : function(rEvent) {
            
	}
}

Rampage.ready();