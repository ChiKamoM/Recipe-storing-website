 const ingredientsInpt = document.getElementById("orginial-ingredients-inpt")
      const cloneIngrdsBttn = document.getElementById("new-ingredient")
      const ingredientsContainer = document.getElementById("ingredients-container")


      const instructionInpt = document.getElementById("instruction-input");
      const cloneInstructionsBttn = document.getElementById("add-instruction");
      const instructionsContainer = document.getElementById("instructions-container")




      function clone(element,container,button) {
            console.log(element,container,button)
            const clonedItem = element.cloneNode(true);
            console.log(clonedItem)
            clonedItem.setAttribute('id',"")
            container.insertBefore(clonedItem,button)
      }
      

      cloneIngrdsBttn.addEventListener("click",() =>{
            clone(ingredientsInpt,ingredientsContainer,cloneIngrdsBttn)
      })

      cloneInstructionsBttn.addEventListener("click", ()=>{
            clone(instructionInpt,instructionsContainer,cloneInstructionsBttn)
      })
