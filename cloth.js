window.cloth = function() {
    
    // Bundle data structure for Cloth objects
    var createBundle = function() {
        var bundle = [];
		var size = 0;
        
		return {
			addCloth : function(clothObject) {
				if(toolkit.checkType(clothObject, "cloth")) {
					bundle[size] = clothObject;
					size++;
				}
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
		var id = toolkit.generateId();
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
      
	  toolkit.map = function(anObject, iterator) {
		if(Array.isArray(anObject)) {
			var copy = anObject.slice();
			for(var i=0, l=copy.length; i < l; i++) {
				copy[i] = iterator.call(null, copy[i], i, copy);
			}
			
			return copy;
			
		} else if ((typeof anobject === "object")
			&& (collection.hasOwnProperty === Object.prototype.hasOwnProperty)) {
			var copy = {};
			for(var i in anObject) {
				copy[i] = anObject[i];
				copy[i] = interator.call(null, copy[i], i, copy);
			}
			
			return copy;
		}
	  }
	  
	  // shuffle the elements in an array
		toolkit.shuffle = function(collection) {
		
			if(Array.isArray(collection)) {
				var listCopy = collection.slice(),
					arr = [],
					len = listCopy.length;
				
				while (len > 1) {
					var rand = ~~(Math.random() * len-1),
						pop = listCopy.pop();
					
					arr[arr.length] = listCopy[rand];
					
					if(rand < len) {
						listCopy[rand] = pop;
					}
				}
				
				arr[arr.length] = listCopy[0];
				
				return arr;
			} else if ((typeof collection === "object")
				&& (collection.hasOwnProperty === Object.prototype.hasOwnProperty)) {

				var newObj = {},
					values = [],
					newValues = [];
				
				for(var key in collection)
					values[values.length] = collection[key]
				
				var l = values.length;
				
				while(l--) {
					var rand = ~~(Math.random() * l);
					
					if(rand !== l) {
						var tmp = values[values.length-1];
						values[values.length-1] = values[rand]
						values[rand] = tmp;
					}
					
					newValues[newValues.length] = values.pop();
				}
				
				for(key in collection)
					newObj[key] = newValues.pop();
				
				return newObj;
				}
		}
	  
      // get collection size
      toolkit.size = function(collection) {
          var count = 0;
          if(Array.isArray(collection) 
			|| ((typeof anobject === "object")
				&& (collection.hasOwnProperty === Object.prototype.hasOwnProperty))) {
				
              for(var i in collection) {
                  count++;
              }
          }
          return count;
      }
      
      //check if keys/indicies on single/multidimentional collection is defined
      // takes a collection and an array of keys/indicies
      toolkit.validIndex = function(collection, args) {
        var i=0, l=args.length, valid = true, depth = collection;
        
        if(checkType(collection, "collection")) {
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
          
            if(checkType(anArray, "array")) {
                var firstHalf = anArray.slice(0,index);
                var secondHalf = anArray.slice(index);
                
                return [firstHalf,secondHalf];
            } 
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
			return toolkit.lookup[str](anObject);
		}
		
		// generate a string id
		toolkit.generateId = function() {
			var num = 0;
			
			return function() {
				num++;
				return "cloth" + num;
			}
		}()
		
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
				return Array.isArray(anObject);
			},
			bundle : function(anObject) {
				return anObject.hasOwnProperty("addCloth");
			},
			boolean : function(anObject) {
				return typeof anObject === "boolean";
			},
			cloth : function(anObject) {
				return anObject.hasOwnProperty("getName");
			},
			collection : function(anObject) {
				return Array.isArray(anObject) 
					|| ((typeof anObject === "object") 
						&& (anObject.hasOwnProperty === Object.prototype.hasOwnProperty));
			},
			"function" : function(anObject) {
				return typeof anObject === "function";
			},
			integer : function(anObject) {
				return (typeof anObject === "number")
					&& (anObject === Math.floor(anObject));
			},
			number : function(anObject) {
				return typeof anObject === "number";
			},
			// object literal
			object : function(anObject) {	
				return (typeof anObject === "object") 
						&& (anObject.hasOwnProperty === Object.prototype.hasOwnProperty);  // excludes null
			},
			string : function(anObject) {
				return typeof anObject === "string";
			},
			undefined : function(anObject) {
				return typeof anObject === "undefined";
			}
		}
        
    return toolkit;

}

window.onload = cloth;
