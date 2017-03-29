var ValueHolder = require("value-holder");

class ConfigHolder extends ValueHolder{
  constructor(config){
    super(config);
    this._valueHolders = [];
  }

  getValueHolder(path){
    var pieces = path.split(".");

    var underVal = this._getValueFromPieces(pieces);

    var valHolder = new ValueHolder(underVal);

    this._valueHolders.push({pieces:pieces, valueHolder:valHolder});

    return valHolder;
  }

  _getValueFromPieces(pieces){
    var underVal = this.getVal();

    for(var i in pieces){
      if(underVal){
        underVal = underVal[pieces[i]];
      }
    }

    return underVal;
  }

  getConfigHolder(path){
    var pieces = path.split(".");

    var underVal = this._getValueFromPieces(pieces);

    var valHolder = new ConfigHolder(underVal);

    this._valueHolders.push({pieces:pieces, valueHolder:valHolder});

    return valHolder;
  }

  changeValue(config){
    return super.changeValue(config)
      .then(() => {

        for(var i in this._valueHolders){
          let {pieces, valueHolder} = this._valueHolders[i];
          let val = this._getValueFromPieces(pieces);
          valueHolder.changeValue(val);
        }
      });
  }
}

module.exports = ConfigHolder;
