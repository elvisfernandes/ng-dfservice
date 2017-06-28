import { Inject } from '@angular/core';
import { DFService } from './df.service';
import { DFResource } from './dfresource.class';
import { Observable } from 'rxjs/observable';
import { DFModel } from './dfmodel.class';
import { BehaviorSubject } from 'rxjs/Rx';
import { List } from 'immutable';

export abstract class DFDataStore {

    abstract dfresource:DFResource;
    abstract modelclass:any;

    private _subject:BehaviorSubject<List<DFModel>> = new BehaviorSubject(List([]));
    
    public items:Observable<List<DFModel>> = this._subject.asObservable();

    constructor( private dfservice:DFService ) {}

    loadInitialData() {
        this.retrieve();
    }

    /**
     * Creates a new model in DF server and updates the local DataStore
     */
    create( model:DFModel ) {
        if( !model.id ) {
            this.dfservice.post( this.dfresource, model )
                .subscribe( (next) => {
                    if( next.json().resource.length == 1 ) {
                        let id:number = next.json().resource[0].id;

                        // Gets information from the server regarding the newly created model
                        this.retrieve(id);
                    }
                });
        }
    }

    /**
     * Retrieves records for this DataStore from server based on query params
     * defined in this.dfresourceparams 
     */
    retrieve( id?:number ) {
        if( this.dfresource ) {
            if( !id ) {
                this.dfservice.get( this.dfresource )
                    .subscribe( next => {
                        for( let res of next.json().resource ) {
                            let model:DFModel = new this.modelclass();
                            model.fromJSON(res);

                            this.addToDataStore(model);
                        }
                    });
            }
            else {
                // Stores default param config, just in case...
                let temp_ids = this.dfresource.params.ids;

                this.dfresource.params.ids = '' + id;
                this.dfservice.get( this.dfresource )
                    .subscribe( (next) => {
                        let res = next.json().resource;
                        if( res && res.length == 1 ) {
                            let model:DFModel = new this.modelclass();
                            model.fromJSON( res[0] );

                            this.addToDataStore(model);
                        }
                    });

                // Reverting params ids back to original
                this.dfresource.params.ids = temp_ids;
            }
        }
    }

    /**
     * Clears the stored objects and query the server again, considering the defined
     * params in this.dfresource.params
     */
    reload() {
        this.clearDataStore();

        this.retrieve();
    }

    private clearDataStore() {
        // Call next() and lets eveyone know what is going on here... shall we?
        this._subject.next( List([]) );
    }

    getById( id:number ):DFModel {
        let index = this._subject.getValue().findIndex( (model:DFModel) => { return model.id === id} )
        return this._subject.getValue().get(index);
    }

    update( model:DFModel ) {
        if( model.id ) {
            this.dfservice.patch( this.dfresource, model )
                .subscribe( (next) => {
                    console.log(next);
                    if( next.json().resource[0].id === model.id ) {
                        let id:number = next.json().resource[0].id;
                        let items = this._subject.getValue();
                        let index = items.findIndex( (model:DFModel) => { return model.id === id} );
                        
                        this._subject.next( items.set(index, model) );
                    }
                });
        }
    }

    delete( model:DFModel ) {
        if( model.id ) {
            this.dfservice.delete( this.dfresource, model )
                .subscribe( (next) => {
                    if( next.json().resource.length == 1 ) {
                        let id:number = next.json().resource[0].id;

                        let items = this._subject.getValue();
                        let index = items.findIndex( (model:DFModel) => { return model.id === id} );
                        
                        this._subject.next( items.delete(index) );
                    }
                });
        }
    }

    private addToDataStore( model:DFModel ) {
        this._subject.next( this._subject.getValue().push(model) );
    }
}