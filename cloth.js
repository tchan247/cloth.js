window.cloth = function() {

  //check if keys/indicies on single/multidimentional collection is not undefined
  // takes a collection and an array of keys/indicis
  var validIndex = function(collection, args) {
    var i=0, l=args.length, valid = true, depth = collection;
    
    if(Array.isArray(collection)) {
        while(valid && i < l) { 
          if(depth[args[i]] !== undefined) {
            depth = depth[args[i]];
            i++;
            console.log(current)
          } else {
            valid = false;
          }
        }
    } else if (collection.hasOwnProperty === Object.prototype.hasOwnProperty) {
    
    
    }
    return valid;
  }
  




}

//cloth();
