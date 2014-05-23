// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var findLastCase = function(string, target){
  	var indexCheck = 0;
  	var index;
    while(indexCheck >= 0){
    	index = indexCheck;
    	indexCheck = string.indexOf(target,index+1);
    }
    return index;
  };

  var findNextCase = function(string, target){
    return string.indexOf(target,1);
  }

  var findNumberOfElements = function(stringedArray){
  	var stringSize = stringedArray.length;
  	var numberOfElements = 1;

    var deleteInnerElementsandIndex = function(string, startingIndex){
    	var indexer = [];
    	var startingIndex = 0;
    	var commaLocation = newArray.indexOf(',');
    	// Opening Finder Function -- finds next opening element of array
    	var openingFinder = function (string, indexStart) {
    	  var opening = [string.indexOf('{', indexStart), string.indexOf('[',indexStart)];
    	  if ( opening[0] === opening[1] ){
    	    return opening = 999;
    	  }else{ 
    		opening = _.filter(opening, function(value){
    		  return (value !== -1);
    	    });
    	  }
    	  return Math.min.apply(this,opening);
    	}; // close Opening Finder

    	var endingFinder = function (string, indexStart) {
    	  var closing = [array.indexOf('}',indexStart), array.indexOf(']',indexStart)];
    	  if (closing[0] === closing[1]){
    	  	return closing = 999;
    	  }else{
    	  closing = _.filter(closing, function(value){
    		  return (value !== -1);
    	    });
    	  }
    	  return closing = Math.min.apply(this,closing);
    	}; // close endingFinder

    	// Finds end of element.
    	var findEndofElement = function (string, a, indexTrack) {
    		var open = openingFinder(array, indexTrack+1);
    	    var close = endingFinder(array, indexTrack+1);
    	    console.log(close);
    	    if (a===0){
    	    	indexer.push(indexTrack);
    	    } else if (open<close){
    			a++;
    			return findEndofElement(array, a, open)
    		}else if (open>close) {
    			a--;
    			return findEndofElement(array, a, close)
    		}
    	};//close findEndofElement
    	if (commaLocation === -1)

    	if (_.last(indexer) === array.length);

    	if (commaLocation === -1 && i)
    	if (commaLocation < openingFinder()) {
    	  indexer.push(commaLocation);
        } else {
          findEndOfElement
        }

    }
    for (var i = 0; i < stringSize; i++){
    	if (stringedArray[i] === ','){
    		numberOfElements++;
    	}
    }
    return numberOfElements - findNumberOfElements()
  }


  var finalOutput;
  var parse = function(string){
  	if (string[0]==='[')
  		arrayLength = findNumberOfElements(string);
  		var newArray = new Array(arrayLength);
  		_.map(newArray, function(value){
          return parse()
  		}

  }
};
