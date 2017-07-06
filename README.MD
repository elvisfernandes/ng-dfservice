# ng-dfservice

## Use this service in Angular (4 and above) to consume DreamFactory APIs.

This module provides an Angular service to access DreamFactory Services Platform (tm).

Please note this is still in beta and not ready for production.

Contributions are welcome! Just fork this repository, make changes and send a pull request.

For more information about DreamFactory (tm) visit [their website](http://dreamfactory.com).

# Features
- Uses Angular dependency injection to provide api URL and API key, so you can keep your DSP data in a convenient place (environments/environment.ts, for example). You can even keep development, testing and production API URL and key in your codebase without worrying to change it depending on your environment.
- Provides a helper class to create DreamFactory resources URL (you shouldn't worry with URL specification in the middle of your code).
- Manages user login / logout, storing AWT session token in browser's local storage. You don't need a separate package to deal with that.
- Emits events for login / logout / unauthorized login.
- Provides methods for all REST operations on your DreamFactory instance.
- Provides DataStore objects to simplify access to data to/from the server.
- Set query options to retrieve data from the server.

# How to use

## 0 - Create a project with angular-cli

    $ ng new yourproject
    $ cd yourproject

## 1 - Install ng-dfservice from npm

Make sure you have typings installed, either globally or locally

    $ npm install typings

OR

    $ npm install -g typings

Now you can install ng-dfservice

    $ npm install ng-dfservice --save

## 2 - Configure your DSP environment

You must provide your DSP instance's URL and app key in environment.ts and/or environment.prod.ts. This is a sample of a environment.ts file:

    export const environment = {
        production: false,
        
        dfservice_config: {
            // Your df_api_url must end with '/api/v2/'
            df_api_url: 'http://youdspinstance.example.com/api/v2/',
            df_api_token: 'YOUR-API-TOKEN-HERE'
        }
    };

## 3 - Extend abstract class DFModel and implement proper methods to create your models

Adapt the model to reflect your schema.

    import { DFModel } from 'ng-dfservice';

    export class YourModel extends DFModel {
    
        // Set your object's properties
        id:number;
        name:string = '';
        
        // Specify how to build your model from a JSON representation
        fromJSON( jsonmodel:any ):void {
            this.id = jsonmodel.id;
            this.name = jsonmodel.name;
        }
    
        // Define how you model should be represented in JSON
        toJSON():any {
            let jsonmodel = {
                id: this.id,
                name: this.name
            };
            return jsonmodel;
        }
    
        // Create a factory for your model. Maybe you only need to create a new instance of it
        factory():YourModel {
            return new YourModel();
        }
    }

## 4 - Extend abstract class DFDataStore to create your data store objects
You can initialize the parameters of your data store in the constructor if you need something different than the default options

    import { Inject } from '@angular/core';
    import { DFDataStore, DFService, DFResource } from 'ng-dfservice';
    import { YourModel } from '../where/your/model/is/located';

    export class YourDataStore extends DFDataStore {

        dfresource:DFResource = new DFResource('yourservice', DFService.RESOURCE_TABLE, 'yourtable');
        modelclass:any = YourModel;
        
        constructor( @Inject(DFService) private dfs: DFService ) { 
            super(dfs);
            
            // Optional parameters
            this.dfresource.params.include_count = true;
            this.dfresource.params.limit = 20;
        }
    }

## 5 - Provide all your DataStores alongside with URL and API keys in your module
    import { DFService } from 'ng-dfservice';
    import { YourDataStore } from 'where-you-placed-it';

    (...)

    providers: [
        // Include all your DataStores here
        { provide: YourDataStore, useClass: YourDataStore, deps: [DFService] },
        { provide: DFService.DFSERVICE_CONFIG, useValue: environment.dfservice_config },
        // (... whatever else you need to provide...)
    ]

## 4 - Enjoy! :)
Just inject you data store / DFService in your component and use CRUD methods or `login` and `logout` methods.

    import { YourDataStore } from 'where-you-place-it';
    import { YourModel } from '../where/your/model/is/located';
    import { DFService, DFResource } from 'ng-dfservice';

    (...)
    constructor( private yourstore:YourDataStore ) { }
    (...)
    // Use your datastore
    let newmodel = new YourModel();
    newmodel.name = 'New model name';
    
    // Create
    this.yourstore.create( newmodel );
    
    // Retrieve (supposing 3 is the ID of the model you want to retrieve)
    // This model will be added to the `items` list of yourstore
    this.yourstore.retrieve( 3 );
    
    // Update
    newmodel.name = 'Changed name :)';
    this.yourstore.update( newmodel );
    
    // Delete
    this.yourstore.delete( newmodel );

# Boilerplate project
There is a simple boilerplate project with recommendations on how to use this library at [this GitHub repository](https://github.com/elvisfernandes/ng-dfservice-boilerplate)

## License
MIT © [Elvis Fernandes](http://elvis.eti.br)