requirejs.config({
    baseUrl: 'js',
    //waitSeconds: 0,
    paths: {
        moilly: './moilly/app',

        text: '../vendor/js/text',
        json: '../vendor/js/json2',
        underscore: '../vendor/js/underscore',
        knockout: '../vendor/js/knockout-3.4.0.debug',
        jquery: '../vendor/js/jquery-2.1.4',
        
        components: 'components',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        moilly: {
            deps: ['components/main']
        }
    },
    bundles: {
    }
});

requirejs(['moilly']);