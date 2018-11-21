class moneySystem {
   cache = {};
   
   constructor() {}
   
   addAmount(id, int) {
      if (!cache[id]) {cache[id] = int} else
      {cache[id] = cache[id] + int;
   }
     
   removeAmount(id, int) {
      if (!cache[id]) {cache[id] = int} else
      {cache[id] = cache[id] - int;
   }
   
   getAmount(id) {
      new Promise(function(resolve, reject) {
         if (cache[id]) {
            resolve(cache[id])
         } else {
            reject("ID is not found")
         }
      }
   }
}
