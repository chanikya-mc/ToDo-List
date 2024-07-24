let glbalData = [];
      let action = "";
      let submit = document.getElementById("submit");
      let text = document.getElementById("text");
      submit.addEventListener("click", async () => {
        if (!text.value) {
          alert("required **");
        } else {
          if (!action) {
            try {
              let msg = text.value;
              let metaObject = {
                method: "POST",
                body: JSON.stringify(msg),
              };
              let response = await fetch("http://localhost:8000", metaObject);
              let result = await response.json();
              text.value = "";
              print(result);
            } catch (err) {
              alert("somthing wrong");
              return;
            }
          } else {
            try {
              let option = {
                method: "PUT",
                body: JSON.stringify({ ...action, text: text.value }),
              };
              let response = await fetch("http://localhost:8000", option);
              let data = await response.json();
              print(data);
              submit.innerText = "ADD";
              text.value = "";
              action = "";
            } catch (err) {
              console.log(err);
              alert(err.message);
              submit.innerText = "ADD";
              text.value = "";
              action = "";
            }
          }
        }
      });
      //this is handler for edit
      function editHandler(id) {
        let findData = glbalData.find((item) => {
          return item.id == id;
        });
        text.value = findData.text;
        submit.innerText = "Update";
        action = findData;
      }
      //this is handler for printing the card
      function print(args) {
        glbalData = args;
        let body = document.getElementById("body");
        let str = "";
        args.map((item) => {
        //   str += `    <div class="col-md-3 m-2">
        //         <div class="card">
        //             <div class="card-body bg-dark text-white">
        //                 <p>Task: ${item.text}</p>
        //             </div>
        //             <div class="card-footer">
        //                 <button id="edit" onclick="editHandler(${item.id})" class="btn btn-primary">edit</button>
        //                 <button id="delete" class="btn btn-danger" onclick="deleteHandler(${item.id})">delete</button>
        //             </div>
        //         </div>
        //     </div>  `;

            str+=`<ul class="list-group">
                      <li class="list-group-item bg-secondary d-flex justify-content-between align-items-center ">${item.text}
                          <div>
                              <button onclick="editHandler(${item.id})" class="btn btn-success me-3" id="edit"><i class="bi bi-check2-circle"></i> Edit</button>
                              <button onclick="deleteHandler(${item.id})" class="btn btn-danger"  id="delete"><i class="bi bi-trash3"></i> Delete</button>
                          </div>
                      </li>
                  </ul>`;
        });
        body.innerHTML = str;
      }



      //this is for the delete handler
      async function deleteHandler(id) {
        let object = {
          method: "DELETE",
          body: JSON.stringify(id),
        };
        let response = await fetch("http://localhost:8000", object);
        let result = await response.json();
        if (result) {
          print(result);
          alert("data deleted successful");
        } else {
          alert("somthing wrong while deleting");
          return;
        }
      }