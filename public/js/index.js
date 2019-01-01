$(document).ready(function () {
    $.get("/api/orders", function (data) {
        for (i = 0; i < data.length; i++) {
            var id = data[i].id
            var body = data[i].body
            
            var devour = data[i].devour

            if (!devour) {
                appendTable(id, body, devour);
            } else { console.log("") }
        }
    })

    var orderInput = $("#exampleFormControlTextarea1");

    $("#submitOne").on("click", function () {
        event.preventDefault();
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

        }).then(function () {

        })

    });

    //STORING FUNCTIONS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
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


    function appendTable(id, body, devour) {
        $("#tableBody").append("<tr id=rowId" + id + " data-value = " + id + "><th>" + id + "</th><td id=bodyId" + id + ">" + body + "</td><td><button class = devour data-value = " + id + ">Devour!</button></td></tr>")
    }

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


