requirejs.config({
    baseUrl: 'js',
    paths: {
        moilly: 'moilly/app',

        underscore: 'underscore',
        knockout: 'knockout-3.4.0',

        jquery: 'jquery-2.1.4',
        materialize: 'materialize',
        picker: 'picker',
        components: 'components/main',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        materialize: {
            deps: ['jquery', 'picker']
        },
        components: {
            deps: ['knockout']
        }/*,
        /*moilly:{
            deps:['components']
        }*/
    },
    bundles: {
    }
});



requirejs(['components', 'moilly']);