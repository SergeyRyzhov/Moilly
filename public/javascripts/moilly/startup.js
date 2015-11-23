requirejs.config({
    baseUrl: 'js',
    //waitSeconds: 0,
    paths: {
        moilly: 'moilly/app',

        text: 'text',
        json: 'json2',
        
        underscore: 'underscore',
        knockout: 'knockout-3.4.0.debug',

        //jquery: 'jquery-2.1.4',
        materialize: 'materialize',
        picker: 'picker',
        components:'components',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        picker:{
           // deps: ['jquery']
        },
        materialize: {
            deps: [ 'picker']//'jquery',
        },
        moilly:{
            deps: ['components/main']
        }
    },
    bundles: {
    }
});



requirejs(['moilly']);