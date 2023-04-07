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
    
                $("table tbody tr:last").append(`<td>${data[key]}</td>`)
            } 
        })
        // .fail(function(error) {
        //     // Error callback
        //     $("")
        //     console.log(error.responseText);
        // });
    });
});


function tableCrator(headers, data) {
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
                $("table tbody tr:last").click(() => {
                    console.log(data[i][key])
                    document.location = 'table'
                    employeeTable(data[i][key])
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