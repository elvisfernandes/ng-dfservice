/**
 * This class represents a resource in DreamFactory. Actually it is
 * only a helper class to abstract URL formation.
 * 
 * Every DreamFactory resource is addressed following this schema:
 * 
 * http[s]://df_instance_url/api/v2/SERVICE_NAME/RESOURCE_TYPE/RESOURCE_NAME/RESOURCE_ID
 */
export class DFResource {
    /**
     * DreamFactory service name, as in API URL.
     * http://yourinstance/api/v2/SERVICE_NAME
     */
    private _serviceName:string = null;
    // We won't have a setter for _serviceName, because this is a
    // mandatory property in the constructor.
    get serviceName():string {
        return this._serviceName;
    }

    /**
     * DreamFactory resource type, as in API URL.
     * http://yourinstance/api/v2/servicename/RESOURCE_TYPE.
     * The resource type specifies if it is a table, stored procedure, etc.
     * The resource types are listed as static properties in DFService class. 
     */
    private _resourceType:string = null;
    get resourceType():string {
        return this._resourceType;
    }
    set resourceType( value:string ) {
        // This can be changed only if not previously set up via constructor
        if( !this._resourceType )
            this._resourceType = value;
    }

    /**
     * DreamFactory resource name, as in API URL.
     * http://yourinstance/api/v2/servicename/resourcetype/RESOURCE_NAME. 
     */
    private _resourceName:string = null;
    get resourceName():string {
        return this._resourceName;
    }
    set resourceName( value:string ) {
        // This can be changed only if not previously set up via constructor
        if( !this._resourceName )
            this._resourceName = value;
    }

    /**
     * DreamFactory resource ID, as in API URL.
     * http://yourinstance/api/v2/servicename/resourcetype/RESOURCE_ID.
     */
    private _resourceID:number = null;
    get resourceID():number {
        return this._resourceID;
    }
    set resourceID( value:number ) {
        // This can be changed only if not previously set up via constructor
        if( !this._resourceID )
            this._resourceID = value;
    }

    /**
     *  Request body, used in non-GET requests
     */ 
    private _body:any;
    set body( body:any ) {
        this._body = body;
    }
    get body() {
        return this._body;
    }

    constructor(serviceName:string, resourceType?:string, resourceName?:string, resourceID?:number) {
        if( serviceName )    this._serviceName = serviceName;
        if( resourceType )   this.resourceType = resourceType;
        if( resourceName )   this.resourceName = resourceName;
        if( resourceID )     this.resourceID = resourceID;
    }
    
    /**
     * Generates the resource path based on this DFResource properties,
     * to be appended to the URL of the API endpoint. 
     */
    getResourcePath() {
        let path = "";
        
        if( this._serviceName )      path += this._serviceName + '/';
        if( this._resourceType )     path += this._resourceType + '/';
        if( this._resourceName )     path += this._resourceName + '/';
        if( this._resourceID )       path += this._resourceID;

        return path;
    }

    // Default query params
    params = {
        fields: '',
        related: '',
        filter: '',
        limit: 10,
        offset: 0,
        order: '',
        group: '',
        include_count: false,
        include_schema: false,
        ids: ''
    };

    getQueryString() {
        let qstring = '';

        if( this.params.fields !== '' ) qstring += 'fields=' + encodeURIComponent(this.params.fields) + '&';
        if( this.params.related !== '' ) qstring += 'related=' + encodeURIComponent(this.params.related) + '&';
        if( this.params.filter !== '' ) qstring += 'filter=' + encodeURIComponent(this.params.filter) + '&';
        if( this.params.limit !== 0 ) qstring += 'limit=' + this.params.limit + '&';
        if( this.params.offset !== 0 ) qstring += 'offset=' + this.params.offset + '&';
        if( this.params.order !== '' ) qstring += 'order=' + encodeURIComponent(this.params.order) + '&';
        if( this.params.group !== '' ) qstring += 'group=' + encodeURIComponent(this.params.group) + '&';
        if( this.params.include_count ) qstring += 'include_count=true' + '&';
        if( this.params.include_schema ) qstring += 'include_schema=true' + '&';
        if( this.params.ids !== '' ) qstring += 'ids=' + encodeURIComponent(this.params.ids) + '&';

        return qstring;
    }
}