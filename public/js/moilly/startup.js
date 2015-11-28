requirejs.config({
    baseUrl: 'js',
    //waitSeconds: 0,
    paths: {
        moilly: './moilly/app',
        storage: './moilly/storage',
        constants: './moilly/constants',

        text: '../vendor/js/text',
        json: '../vendor/js/json2',
        underscore: '../vendor/js/underscore',
        knockout: '../vendor/js/knockout-3.4.0.debug',
        jquery: '../vendor/js/jquery-2.1.4',
        'jquery.cookie': '../vendor/js/jquery.cookie',
        purl: '../vendor/js/purl',
        amplify: '../vendor/js/amplify',


        components: 'components',
    },
    shim: {
        underscore: {
            exports: '_'
        },

        amplify: {
            deps: ['jquery']
        },
        jquery: {
            exports: '$'
        },
        moilly: {
            deps: ['components/main']
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
    },
    bundles: {
    }
});

requirejs(['moilly']);