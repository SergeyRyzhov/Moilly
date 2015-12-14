requirejs.config({
    baseUrl: '/js',
    //waitSeconds: 0,
    paths: {
        moilly: './app',
        storage: './tools/storage',
        utils: './tools/utils',
        constants: './constants',
        localization: './tools/localization',
        navigator: './tools/navigator',
        bindings: './tools/bindings',

        text: '../vendor/js/text',
        json: '../vendor/js/json2',
        underscore: '../vendor/js/underscore',
        knockout: '../vendor/js/knockout-3.4.0.debug',
        jquery: '../vendor/js/jquery-2.1.4',
        'jquery.cookie': '../vendor/js/jquery.cookie',
        purl: '../vendor/js/purl',
        amplify: '../vendor/js/amplify',
        sammy: '../vendor/js/sammy',
        moment: '../vendor/js/moment-with-locales',
        angular: '../vendor/js/angular',
        responsejs: '../vendor/js/response',

        components: './components',
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
            deps: ['components/main', 'navigator', 'bindings']
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        sammy: {
            deps: ['jquery']
        },
        responsejs: {
            deps: ['jquery']
        }
    },
    bundles: {
    }
});

requirejs(['moilly']);