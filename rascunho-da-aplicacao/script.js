const listaPet = document.getElementById("lista-pet");

let pets=[{nome:"mia",idade:12},{nome:"newt",idade:"3"},{nome:"talbot",idade:"4" }];

function bubbleSort(vetorObjetos) {
  let temp;
  for(let i = 0; i < vetorObjetos.length; i++) {                   
    for(let j = 0; j < vetorObjetos.length - 1 - i; j++) {         
      if(vetorObjetos[j].idade > vetorObjetos[j + 1].idade) {                           // 3
        temp = vetorObjetos[j];                                    
        vetorObjetos[j] = vetorObjetos[j + 1];                              
        vetorObjetos[j + 1] = temp;                               
      }
    }
  }
  return vetorObjetos;                                             
}


// Exibir na página HTML
let petsOrdenado = bubbleSort(pets);

for(pet of petsOrdenado){ // para index = 0, pet <- pets[index], até index = comprimento(pets)
    listaPet.innerHTML += `
        <tr>
        <td>${String(pet.nome)}</td>
        <td>${String(pet.idade)}</td>
        </tr>`;
}
// for(let index=0;index< pets.length;index++){
//     let pet = pets[index];
// } 