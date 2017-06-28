export abstract class DFModel {
    abstract fromJSON( jsonmodel:any ):void;
    abstract toJSON( ):any;
    abstract factory( ):DFModel;
    abstract id:number;
}