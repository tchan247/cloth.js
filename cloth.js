(function() {
    
  // Bundle data structure for Cloth objects
  window.Bundle = function() {
    var pile = {};
    
    this.addCloth = function() {
        
    }
    
    this.getCloth = function() {
        
    }
    
    this.getBundle = function() {
      return pile;
    }
    
    this.removeCloth = function() {
        
    }
    
    this.clearBundle = function() {
      pile = {};
    }
      
  }
    
  // Cloth class
  window.Cloth = function(type, top, left, width, height) {
    document.createElement(type);
  }
  
  /*
      Helper functions -------------------------------------------------------
  */
  var util = {};
  
  //collection functions -----------------------------------------------------
  
  
    // determine if object is an object literal
    util.util.ject = function(anObject) {
      
      var type = typeof anObject === "object";
      
      var hasProp = anObject.hasOwnProperty === Object.prototype.hasOwnProperty;
      
      return type && hasProp;
    }
    
    // determine if object is an array
    util.isArray = function(anObject) {
      return Array.isArray(anObject);
    }
    
    // determine if a collection
    util.isCollection = function(anObject) {
      return isArray(anObject) || isObject(anObject);
    }
    
    // get collection size
    util.size = function(collection) {
      var count = 0;
      if(isCollection(collection)) { 
        for(var i in collection) {
          count++;
        }
      }
      return count;
    }
    
    // 
    util.isMatching = function(collections, properties) {
        
    }
  
    //check if keys/indicies on single/multidimentional collection is not undefined
    // takes a collection and an array of keys/indicies
    util.validIndex = function(collection, args) {
      var i=0, l=args.length, valid = true, depth = collection;
      
      if(isCollection(collection)) {
        while(valid && i < l) { 
          if(depth[args[i]] !== undefined) {
            depth = depth[args[i]];
            i++;
            console.log(depth)
          } else {
            valid = false;
          }
        }
      } else {
        return false;
      }
      return valid;
    }
    
    // Array functions -------------------------------------------------------
    
    // splits an array at the desired index and returns an array of the two halves
    // if the argument array is size 1, the second half will be empty array after split
    // returns an array of two empty arrays if array argument is empty
    util.cut = function(anArray, index) {
        
      if(isArray(anArray)) {
        var firstHalf = anArray.slice(0,index);
        var secondHalf = anArray.slice(index);
        
        return [firstHalf,secondHalf];
      } 
    }
    
    // combines two arrays by inserting the second array at 
    // the index in the first array
    util.sew = function(firstArray, secondArray, index) {
      var head = firstArray.slice(0,index).concat();
      var tail = firstArray.slice(index);
      return head.concat(secondArray).concat(tail);
    }
    
    // merges at least two arrays together, also known as "zip"
    util.weave = function() {
      var args = Array.prototype.slice.call(arguments);
      var weaved = [];
      
      console.log(args)
      
      for(var init=0, l=args[0].length; init < l; init++)
        weaved[init] = [args[0][init]];
      
      for(var i=1, a=args.length; i<a; i++) {
        for(var j=0; j<l; j++) {
          console.log(args[i][j])
          weaved[j] = weaved[j].concat(args[i][j]);
        }
      }
      
      return weaved;
    }
    
    util.unweave = function(anArray) {
        for(var i=0, l=anArray.length; i<l; i++) {
            
        }
    }
      
  return util;

})()

