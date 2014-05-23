// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

    var findElementIndexes = function(string, startingIndex, type){
    var indexer = [];
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
        var closing = [string.indexOf('}',indexStart), string.indexOf(']',indexStart)];
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
        var open = openingFinder(string, indexTrack+1);
          var close = endingFinder(string, indexTrack+1);
          if (a===0){
            indexer.push(indexTrack);
          } else if (open<close){
          a++;
          return findEndofElement(string, a, open)
        }else if (open>close) {
          a--;
          return findEndofElement(string, a, close)
        }
      };//close findEndofElement

      var recursiveIndexer = function(string, startingIndex, type) {
        if (type === "object"){
        var colonLocation = string.indexOf(':', startingIndex);
        var commaLocation = string.indexOf(',', colonLocation+1);
        }else{
        var commaLocation = string.indexOf(',', startingIndex);
        }
        if (_.last(indexer) === string.length-1){
          return indexer;
        }else if (commaLocation === -1){
          indexer.push(string.length-1);
          return indexer;
        }else if (commaLocation < openingFinder(string, startingIndex)) {
          indexer.push(commaLocation-1);
          return recursiveIndexer(string, commaLocation+1,type);
        }else if (type === 'object'){
            findEndofElement(string, 1, openingFinder(string, startingIndex));
            return recursiveIndexer(string, _.last(indexer)+2,type);
        }else{
            findEndofElement(string, 1, startingIndex);
            return recursiveIndexer(string, _.last(indexer)+2,type);
        }
      };
      return recursiveIndexer(string, startingIndex,type);
    };

  var parse = function(string){
    if (string[0] === ' '){
      string = string.slice(1);
    }
    if (string[string.length-1] === ' '){
      string = string.slice(0,string.length-1);
    }

    if (string[0]==='['){
      var newString = string.slice(1, string.length-1);
      var elementIndexes = findElementIndexes(newString,0);
      if (elementIndexes[0]===-1){
        return [];
      }
      return _.map(elementIndexes, function(value, index){
        if (index === 0) {
        var evaluate = newString.slice(0,elementIndexes[index]+1);
        return parse(evaluate);
        }else {
        var evaluate = newString.slice(elementIndexes[index-1]+2,elementIndexes[index]+1);
        return parse(evaluate);
        }
      });
    }else if(string[0] === '{'){
      var newString = string.slice(1,string.length-1);
      var elementIndexes = findElementIndexes(newString,0,'object')
      if (elementIndexes[0]===-1){
        return {};
      }
      var outputObject = new Object();
      _.each(elementIndexes, function(value, index){
        if (index === 0) {
          var colonLocation = newString.indexOf(':');
          if (newString[0]==='"' || newString[0]==="'"){
            var keyString = newString.slice(1,colonLocation-1);
          }else{
            var keyString = newString.slice(0,colonLocation);
          }  
          var evaluate = newString.slice(colonLocation+1,elementIndexes[index]+1);
          outputObject[keyString]=parse(evaluate);
        }else{
          var colonLocation = newString.indexOf(':',elementIndexes[index-1])
          var keyString = newString.slice(elementIndexes[index-1]+2,colonLocation);
          if (keyString[0] === ' '){
            keyString = keyString.slice(1);
          }
          if (keyString[0] === "'" || keyString[0] === '"'){
            keyString = keyString.slice(1,keyString.length-1);
          }
          var evaluate = newString.slice(colonLocation +1, elementIndexes[index]+1);
          outputObject[keyString]=parse(evaluate);
        }
      });
      return outputObject; 
    }else if (!isNaN(parseFloat(string))){
      return parseFloat(string);
    }else if(string === 'true'){
      return true;
    }else if(string === 'false'){
      return false;
    }else if(string === 'null'){
      return null;
    }else if(string[0] === '"' || string[0] === "'"){
      if (string.length === 2){
        return "";
      }else 
        return string.slice(1,string.length-1)
    }

  };
  return parse(json);
};

/* I might use these functions later, but I seriously doubt it!
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

*/

