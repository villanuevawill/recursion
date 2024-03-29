// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // your code goes here
  var stringJSON = [];
  function stringFill(objorlist,indexorkey,tracker) {
  	if (Array.isArray(objorlist)) {
  		stringJSON.push('[');
  		_.each(objorlist,function(value,index,objorlist){stringFill(value,index,objorlist);})
  		stringJSON.push(']');
    }else if (typeof(objorlist)==='string'){
  		stringJSON.push('\"');
  		stringJSON.push(objorlist)
  		stringJSON.push('\"');
    }else if (typeof(objorlist)==='number'){
    	stringJSON.push(objorlist);
  	}else if (objorlist===null) {
  		stringJSON.push('null');
  	}else if (typeof(objorlist)==='boolean'){
		objorlist ? stringJSON.push('true') : stringJSON.push('false');
  	}else if(typeof(objorlist)==='object'){
  		var objLength = _.keys(objorlist).length;
  		var i=0;
  		stringJSON.push('{');
  		_.each(objorlist,function(value,key){
  			if (typeof(value)==='function' || typeof(value)==='undefined'){
  			}else{
              stringJSON.push('\"');
  			  stringJSON.push(key);
  			  stringJSON.push('\":');
  			  stringFill(value);
  			  if (i<objLength-1) {
  			    stringJSON.push(',');
  			   }
  			}
  			i++
  		});
  		stringJSON.push('}');
  		}
  	if(indexorkey!==undefined && indexorkey<tracker.length-1){
  			stringJSON.push(',');
  	}
  };
  stringFill(obj);
  return stringJSON.join('');
};
