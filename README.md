# Shopify Online Marketplace (SOM)

This API is built using Node.js and uses MongoDB as a database to store the products on the marketplace. 

The API is currently live and be reached on:
**https://evening-atoll-83369.herokuapp.com/**

### Features

  - Add a product to the online marketplace
  - Fetch all or a specific product
  - Purchase products
  
### Tech

SOM uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Mongoose] - elegant mongodb object modeling for node.js

Shopify Online Marketplace is also an open source with a [public repository][dill] on GitHub.

### End-points

##### Add Product
Adds a product to the marketplace
*  **URL**
/product
* **Method**
POST
* **URL Params**
None
* **Data Params**
**Required:**
title=[String]
price=[Number]
inventory_count=[Number]

##### Fetch All
Fetches all the products from the marketplace
If availableCount is given as **true** then it only fetches products with available inventory
*  **URL**
/products
* **Method**
POST
* **URL Params**
None
* **Data Params**
**Optional:**
availableOnly=[boolean]

##### Fetch One
Fetches a specific product from the marketplace depending on its title
*  **URL**
/products/:title
* **Method**
GET
* **URL Params**
**Required:**
title=[String]
* **Data Params**
None

##### Purchase Product
Purchases a product if there is available inventory and if enough money to cover the price of the product
*  **URL**
/products
* **Method**
PATCH
* **URL Params**
None
* **Data Params**
**Required:**
title=[String]
money=[Number]



[//]: # 
   [node.js]: <http://nodejs.org>
   [Mongoose]: <https://mongoosejs.com>
   [express]: <http://expressjs.com>
 
