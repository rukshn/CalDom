_pfreak.tasks.push({

    short_name: "react.new_state",
    display_order: 85,
    category: "dom",
    description: "",
    assert_delay: 0,

    setTaskData: function(config){
        return config;
    },
    
    candidateSetup: function(config){
        _pfreak.clearBody();
        
        var div = document.createElement("div");

        div.innerHTML = 
            '<div class="container">'
            + '</div>';

        document.body.appendChild( div );

        config.caldomInstance = _( ".container" ).react(
            {
                greeting: "Hello World"
            },

            {
                render: function(state){
                    return _("+div")
                        .addClass("container")
                        .append(
                            _( "+h1", [ state.greeting ] )
                        )
                }
            }
        );

        return config;
    },
    
    candidates: {
        "caldom": function(config){
            return config.caldomInstance.react({
                greeting: "New Text"
            });
        }
    },

    assert: function(config, test_return){
        
        if( !(test_return instanceof _.Component) ) throw "Returned is not an instance of CalDOM";

        var items = document.querySelectorAll(".container");

        if( items[0].children[0].tagName != "H1" ) throw false;
        if( items[0].children[0].textContent != "New Text" ) throw false;
    },

        reset: function(){
        _pfreak.clearBody();
    }
})