function Validator(e,t,r,i){"use strict";this.errors={};var s={notEmpty:"this field cannot be empty",numeric:"this field must be a number",email:"this field must be an valid e-mail address",afterDate:"this date is invalid",beforeDate:"this date is invalid",alphanumeric:"this field must contain only letters or numbers",alpha:"this field must contain only letters",confirmed:"this field is not confirmed",min:"this field is lower than allowed",max:"this field is higher than allowed"};this._form=e,this._elements=[],this._messages=this._merge(s,t),this.onError=r,this.onSuccess=i,this.debug=!0}Validator.prototype.validate=function(){"use strict";this._setupRules();var e=0,t=0,r=this._elements,i=null,s=!0,a=r.length,n=!0;for(e=0;a>e;e+=1){i=r[e],i.errors={},i.isValid=!0;for(t in i.rules)i.rules.hasOwnProperty(t)&&"function"==typeof this["rule_"+t]&&(s=this["rule_"+t](i.element,i.rules[t]),this.debug&&s?console.log("SUCCESS field "+e+" rule "+t+" with value "+i.element.value):this.debug&&!s&&console.log("ERROR field "+e+" rule "+t+" with value "+i.element.value),s||(i.errors[t]=this._messages[t],i.isValid=!1,n=!1));i.isValid||"function"!=typeof this.onError?i.isValid&&"function"==typeof this.onSuccess&&this.onSuccess.call(i.element):this.onError.call(i.element,i.errors)}return n},Validator.prototype._setupRules=function(){"use strict";var e=this._form.querySelectorAll('input:not([type="submit"])'),t=0,r=e.length,i={};for(this._elements=[],t=0;r>t;t+=1)i={element:e[t],rules:this._extractRules(e[t])},this._elements.push(i)},Validator.prototype._merge=function(e,t){"use strict";var r={},i=0;for(i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);for(i in t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r},Validator.prototype._extractRules=function(e){"use strict";var t="",r={},i={},s=0,a="",n="";switch(e.type){case"email":i.email=!0;break;case"date":i.date=!0;break;case"datetime":i.datetime=!0;break;case"number":i.numeric=!0}if(e.hasAttribute("required")&&(i.notEmpty=!0),e.hasAttribute("data-validation"))for(t=e.getAttribute("data-validation").split("|"),s=0;s<t.length;s+=1)t[s]=t[s].split(":"),a=t[s][0],n=void 0!==t[s][1]?t[s][1].split(","):!0,r[a]=n;return this._merge(i,r)},Validator.prototype.rule_length=function(e,t){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_length) | args[0] MUST be a number";return e.value.length===parseInt(t,10)},Validator.prototype.rule_notEmpty=function(e){"use strict";return e.value.length?!0:!1},Validator.prototype.rule_numeric=function(e){"use strict";return!isNaN(e.value)},Validator.prototype.rule_email=function(e){"use strict";var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e.value)},Validator.prototype.rule_alphanumeric=function(e){"use strict";var t=/^[a-z0-9]+$/i;return t.test(e.value)},Validator.prototype.rule_alpha=function(e){"use strict";var t=/^[a-z]+$/i;return t.test(e.value)},Validator.prototype.rule_min=function(e,t){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_min) | min MUST be a number";return this.rule_numeric(e)?e.value>=t:!1},Validator.prototype.rule_max=function(e,t){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_max) | max MUST be a number";return this.rule_numeric(e)?e.value<=t:!1};