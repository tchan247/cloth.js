window.cloth = function() {
    
    // Bundle data structure for Cloth objects
    var createBundle = function() {
        var bundle = [];
        
		return {
			addCloth : function(clothObject) {
				bundle[bundle.length] = clothObject;
				return this;
			},
			getCloth : function(n) {
				return bundle[n];
			},
			getBundle : function() {
				return bundle;
			},
			removeCloth : function() {
				
			},
			clearBundle : function() {
				bundle = [];
				return this;
			},
			// adjust position of the whole bundle
			setPosition : function(top, left) {
				var i = bundle.length;
				while(i--) {
					var dim = bundle[i].getDimensions();
					bundle[i].setDimensions([top,left,dim[2],dim[3]]);
				}
				return this;
			}
		}  
		
    }
	
	// closure-defined Cloth class
	var createCloth = function(type, top, left, width, height) {
		document.createElement(type);
        var name;
		var id = generateId().getNum();
		var element = document.getElementById();
		
		return {
			getName : function() {
				return name;
			},
			getDimensions : function() {
				return [top, left, width, height];
			},
			setDimensions : function(dim) {
				if(dim.length === 4 && dim.every(function(x){return typeof x === "number"})) {
					top = dim[0];
					left = dim[1];
					width = dim[2];
					height = dim[3];
				}
			}
		};
	}
    
    /*
        Helper functions -------------------------------------------------------
    */
    var toolkit = {};
    
    //collection functions -----------------------------------------------------
    
    
      // determine if object is an object literal
      toolkit.isObject = function(anObject) {
        
        var type = typeof anObject === "object";
        
        var hasProp = anObject.hasOwnProperty === Object.prototype.hasOwnProperty;
        
        return type && hasProp;
      }
      
      // determine if object is an array
      toolkit.isArray = function(anObject) {
          return Array.isArray(anObject);
      }
      
      // determine if a collection
      toolkit.isCollection = function(anObject) {
          return isArray(anObject) || isObject(anObject);
      }
      
      // get collection size
      toolkit.size = function(collection) {
          var count = 0;
          if(isCollection(collection)) { 
              for(var i in collection) {
                  count++;
              }
          }
          return count;
      }
      
      //check if keys/indicies on single/multidimentional collection is not undefined
      // takes a collection and an array of keys/indicies
      toolkit.validIndex = function(collection, args) {
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
      toolkit.cut = function(anArray, index) {
          
            if(isArray(anArray)) {
                var firstHalf = anArray.slice(0,index);
                var secondHalf = anArray.slice(index);
                
                return [firstHalf,secondHalf];
            } 
      }
	  
		toolkit.shuffle = function() {
			
		}
      
        // combines two arrays by inserting the second array at 
        // the index in the first array
        toolkit.sew = function(firstArray, secondArray, index) {
            var head = firstArray.slice(0,index).concat();
            var tail = firstArray.slice(index);
            return head.concat(secondArray).concat(tail);
        }
        
        // merges at least two arrays together, also known as "zip"
        toolkit.weave = function() {
            var args = Array.prototype.slice.call(arguments);
            var weaved = [];
			
			if(!isMatching(args,["length"])) return;
            
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
        
		
        toolkit.unweave = function(anArray) {
			var unweaved = [];
			
            for(var i=0, l=anArray.length; i<l; i++) {

            }
			
			return unweaved;
        }
		
	// utility functions -----------------------------------------------------
	
	toolkit.checkType = function(anObject, str) {
		var lookup = toolkit.lookup;
		
		return lookup[str](anObject);
	}
	
	// create an id object
	toolkit.generateId = function() {
		var num = 0;
		
		return {
				increment: function() {
					num++;
					return this;
				},
				decrement: function() {
					num--;
					return this;
				},
				getNum: function() {
					num++;
					return "cloth" + num;
				}
			}
	}
	
	// all collections in the collections array have same property value (need to re-implement)
	toolkit.isMatching = function(collections, properties) {
		for(var key in properties) {
			for(var i=1, l=collections.length; i<l; i++) {
				if(x.properties[key] !== collections[0].property[key])
					return false;
			}
		}
		
		return true;
	}
	
	toolkit.randomEle = function(list) {
		return  list[~~(Math.random() * list.length-1)];
	}
	
	toolkit.randomNum = function(n, round) {
		return round? Math.floor(Math.randon * n) : Math.random * n;
	}
	
	// lookup table ----------------------------------------------------------
	
	// lookup table useful for checking object types and maybe more
	toolkit.lookup = {
		array : function(anObject) {
		
		},
		cloth : function (anObject) {
		
		},
		collection : function(anObject) {
		
		},
		object : function(anObject) {
		
		}
	
	}
        
    return toolkit;

}

window.onload = cloth;

