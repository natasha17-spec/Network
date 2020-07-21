export type FileValidatorType = (value:string)=> string | undefined

export const required:FileValidatorType = (value) =>{
    if(value) return  undefined;
        return 'Field is required';

};

export const maxLengthCreator= (maxLength:number):FileValidatorType =>(value)=> {
    if(value.length> maxLength) return `Max lenth is ${maxLength} symbols`;
        return undefined;

};