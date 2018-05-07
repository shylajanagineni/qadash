curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{
 "IndexID": 123,
 "ItemQuantity":{
   "379505" : {
      "Lockable": true,
       "QuantityOnHand": 100
   }
 }
}' "http://qc-mw05.ff.p10:15360/Inventory/Item"