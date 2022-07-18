Node Project

**Prerequisite:**
Node JS
Mongo DB

**DB Prerequisite:**
1. Create Database as 'ACL'
2. Create collections : 
  a. roles
  b. privileges
3. roles collection entries : 
      {
    "roles" : [ 
        {
            "name" : "Admin",
            "id" : 1,
            "privilege" : [ 
                1, 
                2, 
                3, 
                4
            ],
            "apiPrivilege" : [ 
                "GET", 
                "POST", 
                "PUT", 
                "DELETE"
            ]
        }, 
        {
            "name" : "Seller",
            "id" : 2,
            "privilege" : [ 
                1, 
                2, 
                4
            ],
            "apiPrivilege" : [ 
                "GET", 
                "POST", 
                "PUT"
            ]
        }, 
        {
            "name" : "Supporter",
            "id" : 3,
            "privilege" : [ 
                3, 
                4
            ],
            "apiPrivilege" : [ 
                "GET", 
                "DELETE"
            ]
        }, 
        {
            "name" : "Customer",
            "id" : 4,
            "privilege" : [ 
                4
            ],
            "apiPrivilege" : [ 
                "GET"
            ]
        }
    ]
}

4. privileges collection entries : 
      {
    "Create" : 1,
    "Update" : 2,
    "Delete" : 3,
    "Fetch" : 4
}


**Start Steps:**

1. Run 'npm install'
2. Run 'node index.js'

**API Endpoints for localhost:**
Sign Up: http://localhost:4000/user/add (POST)
Login: http://localhost:4000/user/login (POST)
Get Product : http://localhost:4000/product (GET)
Add Product : http://localhost:4000/product/add (POST)
Update Product : http://localhost:4000/product/<<Product_Mongo_id>> (PUT)
Delete Product : http://localhost:4000/product/<<Product_Mongo_id>> (DELETE)
