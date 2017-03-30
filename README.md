# config-holder

ConfigHolder is a class that wraps a javascript object, and has methods to derive ValueHolder objects from contents.  These ValueHolder will update when the config holder is changed.

##Exports
Exports ConfigHolder class

##Usage

###Async
```
var ConfigHolder = require("config-holder");

(async function(){
  var  myConfig = {
    "hello": "world"
  }

  var config = new ConfigHolder(myConfig);

  var helloVal = config.getValueHolder("hello");

  var [status, val] = await helloVal.getValue();
  console.log(val) //should write "world" to the console

  //Lets change the config
  await config.changeValue({"hello": "universe"});

  var [status, val] = await helloVal.getValue();
  console.log(val) //should write "universe" to the console

})()


```

###Non Async
```
var ConfigHolder = require("config-holder");

var  myConfig = {
  "hello": "world"
}

var config = new ConfigHolder(myConfig);

var helloVal = config.getValueHolder("hello");

helloVal.getValue()
  .then((returnVal) => {
      var [status, val] = returnVal;
      config.log(val) //should write "world" to the console
      //Lets Change the value
      return config.changeValue({"hello": "universe"});
    })
    .then(() => {
        return helloVal.getValue();
      })
    .then((returnVal) => {
      var [status, val] = returnVal;
      config.log(val) //should write "universe" to the console
    })

```
