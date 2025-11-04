 let editModalContainer = document.getElementById("modal-container")
      let closeEditModal = document.getElementById("cancel")
      let editElementsCollection= document.getElementsByClassName("editable")

      let deleteModalContainer = document.getElementById("delete-modal-container")
      let closeDeleteModal = document.getElementById("cancel-delete")
      let deleteItemName = document.getElementById("delete-item")
      let deleteIdInpt = document.getElementById("delete-id")
      let deleteBttn = document.getElementById("delete-recipe")

      let DataInpt = document.getElementById("update-data");
      let idInpt = document.getElementById("update-id");
      let colInpt = document.getElementById("update-column");
      let tableInpt = document.getElementById("update-table")

      let editElements = Array.from(editElementsCollection)


     


      function close(modal) {
            modal.classList.add("hidden")
      }

      function show(modal) {
            modal.classList.remove("hidden")
      }

      function fillInput(source) {
            
            console.log(source.dataset.id, source.dataset.column, source.dataset.value, source.dataset.table)
            console.log(DataInpt,idInpt, colInpt,tableInpt)


            DataInpt.value = source.dataset.value
            console.log(DataInpt.value)

            colInpt.value = source.dataset.column
            console.log(source.dataset.column)

            console.log("id is",source.dataset.id)
            idInpt.value = source.dataset.id

            tableInpt.value = source.dataset.table

            
            
      }

      closeEditModal.addEventListener("click", ()=>{
            close(editModalContainer)
      })

      editElements.forEach(element =>{
            element .addEventListener("click", function(event){
                  fillInput(this)
                  event.stopPropagation()
                  show(editModalContainer)
            })

            
      })
     
      deleteBttn.addEventListener("click", ()=>{
            show(deleteModalContainer);
            deleteIdInpt.value=deleteBttn.dataset.id;
            deleteItemName.innerHTML=deleteBttn.dataset.name;
      })
      
      closeDeleteModal.addEventListener("click", () =>{
            close(deleteModalContainer)
      })
