class MoneySystem {
   constructor() {this.cache = {}}
   
   addAmount(id, int) {
      if (isNaN(int)) return undefined;
      if (!this.cache[id]) {this.cache[id] = int} else
      {this.cache[id] = this.cache[id] + int;}
   };
     
   removeAmount(id, int) {
      if (isNaN(int)) return undefined;
      if (!this.cache[id]) {this.cache[id] = int} else
      {this.cache[id] = this.cache[id] - int;}
   };
   
   getAmount(id) {
      new Promise(function(resolve, reject) {
         if (this.cache[id]) {
            resolve(this.cache[id])
         } else {
            reject("ID is not found")
         }
      });
   }
                  
   reset() {
      this.cache = {}
   }
};

return this.MoneySystem;
