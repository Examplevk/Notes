import { fromJS, List } from 'immutable';
import assign     from 'object-assign';

Object.assign = Object.assign || assign;

export default function immutifyState(obj) {
  let objMut = Object.assign({}, obj);
    console.log(obj)


    objMut.todos =  new List(objMut.todos);


  return objMut;
}
