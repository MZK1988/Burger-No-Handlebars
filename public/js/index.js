$(document).ready(function () {

    //This grabs all of the orders in the database as soon as the page loads
    //Also even if the user presses refresh
    $.get("/api/orders", function (data) {
        //Loops through the "data"/all of the orders in the database after the "get"
        for (i = 0; i < data.length; i++) {
            var id = data[i].id
            var body = data[i].body
            
            var devour = data[i].devour

            //if the order has not been devoured, it runs the appendTable function
            if (!devour) {
                appendTable(id, body, devour);
            } else { console.log("") }
        }
    })

    //This variable is global, but I think would work just fine as local variable to teh submit on click
    var orderInput = $("#exampleFormControlTextarea1");

    $("#submitOne").on("click", function () {
        event.preventDefault();
        //This creates the newOrder variable to be submitted as "data" into the submitOrder function
        var newOrder = {
            body: orderInput.val().trim()
        }
        submitOrder(newOrder);
        
        
    });

    //interesting that if you generate dynamic buttons, then you have to use below syntax as a kind of distributed 
    $(document).on('click', '.devour', function () {
        
        var unparsedvalue = $(this).attr("data-value");

        //need to parse this integer in order to match up with an incoming data element from the get that comes later
        var value = parseInt(unparsedvalue);

        $("#rowId" + value).hide();

        

        //have to grab the body for the body of the text...do get from DOM or do get by reaching into the data model again 

        $.get("/api/orders", function (data) {

            for (i = 0; i < data.length; i++) {
                var bodyId = $("#bodyId" + data[i].id).text()

                if (data[i].body = bodyId && data[i].id === value) {
                    var updatedOrder = {
                        id: value,
                        body: bodyId,
                        devour: true
                    }
                    updateOrder(updatedOrder);
                    // removeDevoured();
                    //remove table data if devour property value = true
                    
                } else { console.log("we have an error") }
            }
            //this is an empty promise, but likely can remove from the get
        }).then(function () {
            
            
        })
    });

    //STORING FUNCTIONS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   
    
    //SUBMIT ORDER FUNCTION===============================================================================================
    function submitOrder(Order) {
        console.log(Order)
        $.post("/api/new", Order).then(function () {
            $.get("/api/orders", function (data) {
                var id = data[data.length - 1].id
                var body = data[data.length - 1].body
                var devour = "devour"

                console.log(data[i]);
                appendTable(id, body, devour);

            })

        })

    }

    //APPEND TABLE FUNCTION===============================================================================================
    function appendTable(id, body, devour) {
        $("#tableBody").append("<tr id=rowId" + id + " data-value = " + id + "><th>" + id + "</th><td id=bodyId" + id + ">" + body + "</td><td><button href=/order class = devour data-value = " + id + ">Devour!</button></td></tr>")
    }

    //UPDATE ORDER FUNCTION===============================================================================================
    //can create any variable and pass where order is being passed in the updateOrder function...
    function updateOrder(Order) {
        $.ajax({
            method: "PUT",
            url: "/api/orders",
            data: Order
        })
            .then(function () {
                console.log("order updated")
            });
    }



});


