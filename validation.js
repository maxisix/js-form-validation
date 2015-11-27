'use strict';


var Form = (function () {

    var config = {
        button: $('.js-submit'),
        form: $('.js-form')
    };



    var init = function () {
        var button = config.button,
            form = config.form;

        _submit(button, form);
    };



    var _submit = function (button, form) {
        button.on('click', function (e) {
            var self = $(this);

            e.preventDefault();

            _validate(self, form);
        });
    };



    var _validate = function (self, form) {
        var valid = 0,
            form = self.closest('.js-form'),
            validate = form.find('.js-validate'),
            validatingLength = validate.length;


        validate.each(function () {

            var self = $(this),
                validateType = self.attr('data-type'),
                value = self.val();


            switch (validateType) {

                case 'text':
                    if (value === '') {
                        self.addClass('isnt-valid');
                    } else {
                        self.removeClass('isnt-valid');
                        valid++;
                    }

                    break;


                case 'email':
                    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

                    if (!value.match(re) || value === '') {
                        self.addClass('isnt-valid');
                    } else {
                        self.removeClass('isnt-valid');
                        valid++;
                    }

                    break;


                case 'zip':
                    var re = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

                    if (!value.match(re) || value === '') {
                        self.addClass('isnt-valid');
                    } else {
                        self.removeClass('isnt-valid');
                        valid++;
                    }

                    break;


                case 'checkbox':
                    if (!self.is(':checked')) {
                        self.addClass('isnt-valid');
                    } else {
                        self.removeClass('isnt-valid');
                        valid++;
                    }

                    break;


                default:
                    if (value === '') {
                        self.addClass('isnt-valid');
                    } else {
                        self.removeClass('isnt-valid');
                        valid++;
                    }
            }

        });


        if (valid === validatingLength) {
            _send(form);
        }

    };



    var _send = function(form) {

        var input = form.find('input:checked, input[type=text], input[type=email]');

        var postData = new Array;

        input.each( function() {

            var self = $(this),
                val = self.val(),
                name = self.attr('name');

            postData[name] = val;

        } );

    };



    return init();

})();
