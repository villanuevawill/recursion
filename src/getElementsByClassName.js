// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var matches = [];

  var checkNodes = function(node){
// check if current element has class name , and save
  var hasClassName = function(node){
    return _.contains(node.classList, className);
  }

  if (hasClassName(node, className)){
    matches.push(node);
  }

// has childNodes?
  if (node.childNodes){
// iterate over each node and repeat.
    _.each(node.childNodes, checkNodes);
  }

}
  checkNodes(document.body);

  return matches;

}
