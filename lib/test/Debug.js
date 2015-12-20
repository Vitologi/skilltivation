/**
 * Vitologi systems
 *
 * @author Alexander Morozov
 * @email info@vitologi.com
 * @date 06.12.2015
 */
(function (env) {

    function DebugAssertion(status, message, parent) {
        this.status     = !!status;
        this.message    = message? message.toString():"Common assertion";
        this.parent     = parent;
    }

    DebugAssertion.prototype.toJSON = function () {
        return {status: this.status, message: this.message, parent:this.parent.title};
    };

    function DebugError(error, message, parent) {
        this.error      = error;
        this.message    = message?message.toString():"Common error";
        this.parent     = parent;
    }

    DebugError.prototype.toJSON = function () {
        return {error: this.error, message: this.message, parent:this.parent.title};
    };

    function Debug(parameters) {
        this.title = parameters.title || "Debug mode";
        this.tag = parameters.tag || Debug.ALL;
        this.aComponent = [];
        this.aAssertion = [];
        this.aError = [];
        this.aHandler = [];
    }

    Object.defineProperties(Debug, {
        "ALL":{"value":4294967295},
        "ASSERTION":{"value":1},
        "ERROR":{"value":2},
        "EXCEPTION":{"value":4},
        "RED":{"value":8},
        "YELLOW":{"value":16},
        "GREEN":{"value":32}
    });

    Debug.prototype = {
        constructor:Debug,

        title: null,
        tag:null,
        aComponent: null,
        aAssertion: null,
        aError: null,
        aHandler:null,

        isAssertion:function(obj){
            return obj instanceof DebugAssertion;
        },

        isError:function(obj){
            return obj instanceof DebugError;
        },

        add: function (debug) {
            this.aComponent.push(debug);
        },

        remove: function (debug) {
            var index = this.aComponent.indexOf(debug);

            if (~index) {
                this.aComponent = this.aComponent.splice(index, 1);
            }
        },

        map:function(callback){
            callback.call(this, this);

            for(var i= 0, len=this.aComponent.length; i<len;i++){
                this.aComponent[i].map(callback);
            }
        },

        getAssertions: function () {
            var all = [];

            this.map(function(){
                all = all.concat(this.aAssertion);
            });

            return all;
        },

        getErrors: function () {
            var all = [];

            this.map(function(){
                all = all.concat(this.aError);
            });

            return all;
        },

        group: function (title, callback) {

            var debug = new Debug({
                "title":title,
                "tag":this.tag
            });

            debug.aHandler = this.aHandler;

            this.add(debug);
            callback.call(debug);

            return this;
        },

        assert: function (result, message, tag) {
            message = message || "Common assertion";
            tag     = tag || 0;

            if(
                this.tag
                & (Debug.ASSERTION | tag)
            ){
                var assertion = new DebugAssertion(result, message, this);
                this.executeHandlers(assertion);
                this.aAssertion.push(assertion);
            }
        },

        error: function (error, message, tag) {
            message = message || "Common error";
            tag     = tag || 0;

            if(
                this.tag
                & (Debug.ERROR | tag)
            ) {
                var debugError = new DebugError(error, message, this);
                this.executeHandlers(debugError);
                this.aError.push(debugError);
            }
        },

        exception: function (environment, message, tag) {
            message = message || "Common error";
            tag     = tag || 0;

            try{

                environment();

            }catch(e){
                var exception = new DebugError(e, message, this);
                this.executeHandlers(exception);
                this.aError.push(exception);

                if(
                    this.tag
                    & (Debug.EXCEPTION | tag)
                ) {
                    throw exception;
                }
            }
        },

        "setHandler": function (callback) {
            this.aHandler.push(callback);
        },

        "removeHandler": function (callback) {
            var index = this.aHandler.indexOf(callback);
            if (~index)return;
            this.aHandler.splice(index, 1);
        },

        "executeHandlers": function (event) {
            for (var i = 0, len = this.aHandler.length; i < len; i++) {
                this.aHandler[i].call(this, event);
            }
        }
    };

    env.Debug = Debug;

})(this);
