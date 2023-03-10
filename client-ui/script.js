// Front - end code

const BACKEND_URL = "http://127.0.0.1:3000";

function loadList() {
  $.ajax(
    BACKEND_URL + "/base-person", // request url
    {
      type: 'GET',
      data: {
          firstname: '',
          lastname: ''
      },
      success: function (data, status, xhr) {
        // console.log(data.list);
        for (let person of data.list) {
          // console.log(person);
          let rowHtml = `<tr>
                <td><a href="form.html?id=${person.id}">${person.id}</a></td>
                <td>${person.firstname}</td>
                <td>${person.lastname}</td>
                <td><button onclick="deletePerson(${person.id}, '${person.first_name}')">Delete</button></td>
            </tr>`;
          $("#table1 > tbody").append(rowHtml);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Error: ' + textStatus + ' ' + errorThrown);
      }
    }
  );
}

function goto(url) {
  window.location = url;
}

function save() {
  // alert("clicked save()");
  let id = $("input[name=id]").val();
  let first_name = $("input[name=first_name]").val();
  let last_name = $("input[name=last_name]").val();
  
  
  let action = +id > 0 ? "PUT" : "POST";
  
  let url = +id > 0 ? id : "";

 
  var postData =
  {
    id: id,
    firstname: first_name,
    lastname: last_name
  }

  $.ajax(
    {
      type: action,
      url : BACKEND_URL + '/base-person/' + url,
      data: postData,
      success: function (data, status, xhr) {
        // console.log(data);
        if (data.status == 1) {
          goto("index.html");
        }
      },
    }
  );
 // $.post(BACKEND_URL + "/", $("#myForm").serialize());

}

function readyForm() {
  const urlParams = new URLSearchParams(window.location.search); // <= to get the param `id`
  let id = urlParams.get("id");

  // view
  if (+id > 0) {
    $.ajax(
      BACKEND_URL + "/base-person/" + id, // request url
      {
        type: 'GET',
        data: {id: id},
        success: function (data, status, xhr) {
          console.log(data);
          let person = data.list;
          if (person) {
            $("input[name=id]").val(person.id);
            $("input[name=first_name]").val(person.firstname);
            $("input[name=last_name]").val(person.lastname);
          }
        },
      }
    );
  }
}

function deletePerson(id, firstName) {
  // console.log("deleting id: " + id, firstName);
  var confirmation = confirm(
    "Are you sure you want to delete " + firstName + "?"
  );

  // view
  if (confirmation) {
    $.ajax(
      BACKEND_URL + "/base-person/" + id, // request url
      {
        type: 'DELETE',
        data: {id: id},
        success: function (data, status, xhr) {
          // console.log("deleted!");
          if (data.status == 1) {
            $("#table1 > tbody").html("");
            loadList();
          }

          // let person = data.list[0];
          // if (person) {
          //   $("input[name=id]").val(person.id);
          //   $("input[name=first_name]").val(person.first_name);
          //   $("input[name=last_name]").val(person.last_name);
          // }
        },
      }
    );
  }
}

function exportExcel() {
  window.open(BACKEND_URL + "?action=download-excel");
}
