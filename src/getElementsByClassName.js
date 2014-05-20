// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var allElements=document.body;
  var elements=[];
  if (_.contains(allElements.classList,className)) {
    elements.push(allElements);
  }
  var findElements=function(elementlist){
  	_.each(elementlist,function(value){
  	  if (_.contains(value.classList,className)){
  			elements.push(value);
  			if(value.childNodes!==undefined){
  				findElements(value.childNodes);
  			}
      }else if (value.childNodes!==undefined){
  			findElements(value.childNodes);
  		}
  	});	
  };
  findElements(allElements.childNodes);
  return elements;
};
