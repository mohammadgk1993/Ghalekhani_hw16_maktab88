const headers = ["firstName", "lastName", "gender","birth","userId","city","company"]
const personalheader = ["firstName", "lastName", "gender","birth","phoneNumber","userId","city","company","position"]

$(() => {
    $.get("/employee/all", (data) => {
        console.log(data);

        tableCrator(headers, data);
    });

    $("#createNewEmployee").on("submit", (e) => {
        e.preventDefault();

        const newEmployee = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            gender: $("#gender").val(),
            birth: $("#birth").val(),
            phoneNumber: $("#phoneNumber").val(),
            userId: $("#userId").val(),
            city: $("#city").val(),
            company: $("#company").val(),
            position: $("#position").val()
        };

        console.log(newEmployee)

        $.post("/employee/", newEmployee, (data) => {
            console.log(data);
            $("table tbody").append("<tr></tr>")

            for (const key in data) {
                if (!headers.includes(key)) continue;

                if (key == "userId") continue

                if (key == 'birth') {
                    $("table tbody tr:last").append(`<td>${(new Date()).getFullYear() - Number((data[key]).split('-')[0])}</td>`)
                } else {
                    $("table tbody tr:last").append(`<td>${data[key]}</td>`) 
                }
            } 
        })

        // .fail(function(error) {
        //     // Error callback
        //     $("")
        //     console.log(error.responseText);
        // });
    });

    $("#deleteEmployee").on("submit", (e) => {
        e.preventDefault();

        let deleteEmployee = {
            userId: $("#delete-userId").val(),
        }  

        fetch("/employee/", {
            method: "DELETE",
            body: JSON.stringify(deleteEmployee),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
                throw new Error("Failed to delete user");
            }
        })
        .then(data => {
            console.log("User deleted successfully:", data);
            $(`#${$("#delete-userId").val()}`).remove()
        })
    })

    $("#updateEmployee").on("submit", (e) => {
        e.preventDefault();

        const updateEmployee = {
            firstName: $("#update-firstName").val(),
            lastName: $("#update-lastName").val(),
            gender: $("#update-gender").val(),
            birth: $("#update-birth").val(),
            phoneNumber: $("#update-phoneNumber").val(),
            city: $("#update-city").val(),
            company: $("#update-company").val(),
            position: $("#update-position").val()
        };

        const employeeId = {userId: $("#update-userId").val()}

        const updateQuery = [employeeId,updateEmployee]

        console.log(updateQuery)

        fetch("/employee/", {
            method: "PATCH",
            body: JSON.stringify(updateQuery),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
                throw new Error("Failed to delete user");
            }
        })
        .then(data => {
            console.log("User updated successfully:", data);
        })
    });

    $("#one").click(() => {
        $.get("/employee/1", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })

    $("#two").click(() => {
        $.get("/employee/2", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })

    $("#three").click(() => {
        $.get("/employee/3", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })

    $("#four").click(() => {
        $.get("/employee/4", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })

    $("#five").click(() => {
        $.get("/employee/5", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })

    $("#six").click(() => {
        $.get("/employee/6", (data) => {
            console.log(data);
    
            tableCrator(headers, data);
        });
    })
});


function tableCrator(headers, data) {
    $("table thead").remove()
    $("table tbody").remove()

    $("table").append("<thead></thead>")
    $("table").append("<tbody></tbody>")

    $("table thead").append("<tr></tr>")
    for (const key in data[0]) {
        if (key == 'userId') {
            $("table tbody tr:last").click(() => console.log(data[i][key]))
            continue
        }
        if (!headers.includes(key)) continue;
        $("table thead tr").append(`<th>${key}</th>`)
    };


    for (let i = 0; i < data.length; i++) {
        $("table tbody").append("<tr></tr>")

        for (const key in data[i]) {
            if (!headers.includes(key)) continue;
            if (key == 'birth') {
                $("table tbody tr:last").append(`<td>${(new Date()).getFullYear() - Number((data[i][key]).split('-')[0])}</td>`)
            } else if (key == 'userId') {
                $("table tbody tr:last").attr("id", `${data[i][key]}`)


                $("table tbody tr:last").click(() => {
                    console.log(data[i][key])
                })


                continue
            }
            else {
                $("table tbody tr:last").append(`<td>${data[i][key]}</td>`)
            }
        }       
    }
}

function employeeTable(userId) {
    $.ajax({
        type: "GET",
        url: "table",
        data: JSON.stringify({"userId":userId}),
        dataType: "json",
        async:'false',
        success: function (response) {
            console.log(response)
        }
    });
}