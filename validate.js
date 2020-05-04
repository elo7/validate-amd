/**
 * Validate.
 *
 * Lib to help form validation
 *
 */

define('validate', ['doc'], function($) {
	'use strict';

	var messageWithArgs = function(messageToFormat) {
		for (var i = 1; i < arguments.length; i++) {
			var index = (i - 1);
			messageToFormat = messageToFormat.replace('{' + index + '}', arguments[i]);
		}

		return messageToFormat;
	};

	var defaultValidationMessages = {
		'required': 'This field is required',
		'min': 'Please enter a value greater than or equal to {0}',
		'max': 'Please enter a value less than or equal to {0}',
		'maxlength': 'Please enter a value with max length less than or equal to {0}',
		'pattern': 'Please enter a valid value',
		'email': 'Please enter a valid email address',
		'url': 'Please enter a valid url',
	};

	var emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	var Validate = function(config) {
		var validationMessages = (config && config.messages) || defaultValidationMessages;

		var getEmailValidate = function($field) {
			var fieldValue = $field.val();

			if (fieldValue && $field.attr('type') === 'email' && !emailPattern.test(fieldValue)) {
				return validationMessages.email;
			}
		};

		var getUrlValidate = function($field) {
			var fieldValue = $field.val();

			if (fieldValue && $field.attr('type') === 'url' && !$field.first().validity.valid) {
				return validationMessages.url;
			}
		};

		var getPatternValidate = function($field) {
			var fieldValue = $field.val(),
				pattern = new RegExp('^' + $field.attr('pattern') + '$');

			if (fieldValue && $field.attr('pattern') !== null && !pattern.test(fieldValue)) {
				return validationMessages.pattern;
			}
		};

		var getMaxOrMinMessage = function($field, condition) {
			var fieldValue = $field.val(),
				type = $field.attr('max') ? 'max' : 'min',
				typeValue = $field.attr(type);

			if (fieldValue && typeValue !== null) {
				var numericTypeValue = parseInt(typeValue, 10),
					numericFieldValue = parseInt(fieldValue, 10);

				if (isNaN(numericFieldValue) || condition(numericFieldValue, numericTypeValue)) {
					return messageWithArgs(validationMessages[type], typeValue);
				}
			}
		};

		var getMinValidate = function($field) {
			if (!$field.attr('min')) {
				return false;
			}

			return getMaxOrMinMessage($field, function(numericFieldValue, numericTypeValue) {
				return numericFieldValue < numericTypeValue;
			});
		};

		var getMaxValidate = function($field) {
			if (!$field.attr('max')) {
				return false;
			}

			return getMaxOrMinMessage($field, function(numericFieldValue, numericTypeValue) {
				return numericFieldValue > numericTypeValue;
			});
		};

		var getMaxLengthValidate = function($field) {
			var length = $field.attr('maxlength'),
				fieldValue = $field.val();

			if (fieldValue && $field.attr('maxlength') !== null && fieldValue.length > length) {
				return messageWithArgs(validationMessages.maxlength, length);
			}
		};

		var getRequiredValidate = function($field) {
			if (!$field.val() && $field.attr('required') !== null) {
				return validationMessages.required;
			}
		};

		var validateField = function($field) {
			var result = { field: $field },
				validationMessage = getEmailValidate($field) || getUrlValidate($field) || getPatternValidate($field) || getMinValidate($field) || getMaxValidate($field) || getMaxLengthValidate($field) || getRequiredValidate($field);

			if (validationMessage) {
				result.message = validationMessage;
			}

			return result;
		};

		var validateForm = function($form) {
			var validationErrors = [],
				result;

			$form.find('input, textarea, select').each(function(el) {
				result = validateField($(el));
				if (result.message) {
					validationErrors.push(result);
				}
			});

			return validationErrors;
		};

		var toDoc = function(selectorOrElements) {
			if (typeof selectorOrElements === 'object' && 'els' in selectorOrElements) {
				// doc-amd object
				return selectorOrElements;
			}
			return $(selectorOrElements);
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected forms
		 *
		 * Usage example:
		 * 	validate.validateForm(<FORM_ELEMENT>);
		 */
		this.validateForm = function(selectorOrElements) {
			var $form = toDoc(selectorOrElements);
			var errors = validateForm($form);

			if (errors.length !== 0) {
				return errors;
			}
		};

		/**
		 * @param selectorOrElements CSS selector, DOM node, array with DOM nodes, HTMLCollection, NodeList or doc-amd object with selected form fields
		 *
		 * Usage example:
		 * 	validate.validateField(<FIELD_ELEMENT>);
		 */
		this.validateField = function(selectorOrElements) {
			var $field = toDoc(selectorOrElements);
			return validateField($field);
		};
	};

	return Validate;
});
