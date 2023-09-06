// Test for POST method
// Status code checking
pm.test("Status code is correct", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 400]);
});

var jsonData = pm.response.json();
// Json schema validation
var schema = 
{
    "type":"object",
    "properties":{
        "success":"boolean"
    },
        "id":{
        "type":"integer"
    },
        "reason":{
        "type":"string"
    },
    "required":["success","id","reason"]
};

if (pm.response.code === 200){
    pm.test("Check 'success' field", function() {
        pm.expect(jsonData.success).to.eql(true)}),
    pm.test("Check 'reason' field", function() {
        pm.expect(jsonData.reason).to.eql("Product was created successful")}),
    pm.test("Check 'id' field", function() {
        pm.expect(jsonData.id).not.be.null}),
    pm.test("JSON schema validation", function(){
        pm.expect(tv4.validate(jsonData, schema)).to.be.true})}
   
if (pm.response.code === 400){
   pm.test("Check 'success' field", function() {
        pm.expect(jsonData.success).to.eql(false)}),
    pm.test("Check 'reason' field", function() {
        pm.expect(jsonData.reason).to.be.oneOf(["Product wasn't created, productStatus not valid", "Could not find category"])}),
    pm.test("JSON schema validation", function(){
        pm.expect(tv4.validate(jsonData, schema)).to.be.true})
};

if (pm.response.code === 500){
   console.log("Achtung!!! Status code is incorrect!!!!");
};

// Test for GET method in CRUD

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

var jsonData = pm.response.json();
var schema = 
{
    "required": [
        "attributes",
        "categoryId",
        "colors",
        "description",
        "imageUrl",
        "images",
        "price",
        "productId",
        "productName",
        "productStatus"
    ],
    "type":"object",
    "properties":{
        "productId":{
            "type":"integer"
        },
        "categoryId":{
            "type":"integer"
        },
        "productName":{
            "type":"string"
        },
        "price":{
         "type":"number"   
        },
        "description":{
        "type":"string",
        },
        "imageUrl":{
        "type":"string"
        },
        "attributes":{
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "attributeName":{
                       "type":"string" 
                   },
                   "attributeValue":{
                       "type":"string" 
                   }
                }
            }
        },
        "colors":{
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "code":{
                       "type":"string" 
                   },
                   "name":{
                       "type":"string"
                    },
                    "inStock":{
                        "type":"integer"
                    }
                }
            }
        },
        "images":{
            "type":"array",
            "items":{
              "type":"string"  
            }
        },
        "productStatus":{
            "type":"string"
        }
   
    }
};

pm.test("JSON schema validation", function(){
        pm.expect(tv4.validate(jsonData, schema)).to.be.true});
// Data validation
pm.test("Check 'attributeName'", function() {
         pm.expect(jsonData.attributes[0].attributeName).to.eql("ASDF")}),
    pm.test("Check 'attributeValue'", function() {
         pm.expect(jsonData.attributes[0].attributeValue).to.eql("Intel® HD Graphics 5300")}),
    pm.test("Check 'categoryID'", function() {
        pm.expect(jsonData.categoryId).to.be.a("number")}),
    pm.test("Check 'ColorCode'", function() {
        pm.expect(jsonData.colors[0].code).to.eql("C3C3C3")}),
    pm.test("Check 'Instock'", function() {
        pm.expect(jsonData.colors[0].inStock).to.eql(10)}),
    pm.test("Check 'ColorName'", function() {
        pm.expect(jsonData.colors[0].name).to.eql("GRAY")}),
    pm.test("Check 'description'", function() {
        pm.expect(jsonData.description).to.eql("Redesigned with you in mind, the HP Pavilion keeps getting better. Our best-selling notebook is now more powerful so you can watch more, play more, and store more, all in style.")}),
    pm.test("Check 'imageUrl'", function() {
        pm.expect(jsonData.imageUrl).to.eql("1100")}),
    pm.test("Check 'images'", function() {
        pm.expect(jsonData.images[0]).to.eql("DD3A5B##1101")}),
    pm.test("Check 'price'", function() {
        pm.expect(jsonData.price).to.eql(267)}),
    pm.test("Check 'productId'", function() {
        pm.expect(jsonData.productId).to.eql(pm.environment.get("productId"))}),
    pm.test("Check 'productName'", function() {
        pm.expect(jsonData.productName).to.eql("Notebook")}),
    pm.test("Check 'productStatus'", function() {
        pm.expect(jsonData.productStatus).to.eql("Active")});
