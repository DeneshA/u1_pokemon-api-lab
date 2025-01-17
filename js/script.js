
let button = document.querySelector("#searchButton")
let inputBar =document.querySelector('#inputBar')
let inputBar2 =document.querySelector('#inputBar2')
let button2 = document.querySelector("#searchButton2")
let dynamicPokeListDd = document.querySelector('#dynamicPokeList')

populateDropdown()

dynamicPokeListDd.addEventListener('change', ()=>{
    inputBar.value =  dynamicPokeListDd.value
    inputBar2.value =  dynamicPokeListDd.value
})


button.addEventListener('click', async () => {

    let pokemonName = document.querySelector("#pokemonName")
    let pokeSprites=document.querySelector('#poke-sprites')
    let pokemonImage1 = document.querySelector("#pokemonImage1")
    let pokemonImage2 = document.querySelector("#pokemonImage2")
    let pokemonImage3 = document.querySelector("#pokemonImage3")
    let pokemonImage4 = document.querySelector("#pokemonImage4")
    let ability = document.querySelector("#abilities")
    let pokemonTypes = document.querySelector('types') 
    let abilityNames= document.querySelector('.row1')
    let baseExperience= document.querySelector('.row2')
    let pokeMoves= document.querySelector('.row3')
    let pokeTypes= document.querySelector('.row2')


    
    let textInput = document.querySelector("#inputBar").value
    
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${textInput}`)
    //console.log(response.data)
  
    let pName =response.data.name

    // let pAbilities = response.data.abilities[0].ability.name
    let pAbilities = response.data.abilities


    let PokeAbility = []
    for(const element of pAbilities) {
            //console.log(element.ability.name)
            PokeAbility.push(element.ability.name)
    }



/////// Display Zone

    pokemonName.innerHTML =`<h4> Name  :: ${pName}</h4>`
    //pokeSprites.innerHTML =`<p> <span class="text"> Sprites <span> </p>`
    pokemonImage1.innerHTML=`<img src=${response.data.sprites.back_default}>`
    pokemonImage2.innerHTML =`<img src=${response.data.sprites.back_shiny}>`
    pokemonImage3.innerHTML =`<img src=${response.data.sprites.front_default}>`
    pokemonImage4.innerHTML =`<img src=${response.data.sprites.front_shiny}>`
    abilityNames.innerHTML = ` <p> Abilities :: ${PokeAbility.toString()}</p>`
    baseExperience.innerHTML = `<p> Game Indices :: ${response.data.game_indices[5].version.name}</p>
                                <p> Game Moves :: ${response.data.moves[0].move.name}</p>
                                <p> ${response.data.moves[2].move.name}</p>
                                <p> ${response.data.moves[5].move.name}</p>`



    console.log(response.data)
    // let listofIndices = [response.data.game_indices]
    // console.log(listofIndices.length)
    // for(let i=0;i<listofIndices[0].length;i++){
    
    // }
    // let movesList=[response.data.moves]
    // console.log(response.data.moves[0].move.name)
    // console.log(movesList.length)


}
)



button2.addEventListener('click', searchSpecies)

async function searchSpecies () {
// // Get the reference to the div with id "main"
// let mainDiv = document.getElementById('.main');

// // Create a new <p> element
// let paragraph = document.createElement('p');

let textInput = document.querySelector("#inputBar2").value
let response_2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${textInput}`)
//let response_2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/aegislash`)
// console.log(" Part 2  "+ JSON.stringify(response_2))
// console.log(`Part 2 ${response_2.data}`)
//console.log("Part 2 ", response_2.data)
// console.log(" Part 2  "+ response_2.data.base_happiness)

let poke_species =document.querySelector('.row4')
let poke_species2 =document.querySelector('row5')
poke_species.innerHTML =   `<p> Base Happiness :: ${response_2.data.base_happiness}</p>
                            <p> Capture Rate :: ${response_2.data.capture_rate}</p>
                            <p> Color :: ${response_2.data.color.name}</p>
                            <p> Favourit Entries :: ${response_2.data.flavor_text_entries[getRandomNum(25)].flavor_text}</p> `



}
        
function getRandomNum(maxNUm) {
    return Math.floor(Math.random() * maxNUm);
  }

  async function populateDropdown(){

    let dropdownList = document.querySelector('#dynamicPokeList')

    let response_3 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    //console.log("Part 3",response_3)
    //console.log("Part 3",response_3.data.results[2].name)
    let pokemonList =[response_3.data.results]
    //console.log(pokemonList)
    dropdownList.innerHTML=''

   for(let i =0;i<pokemonList[0].length;i++){

    let optionEle = document.createElement('option')
    optionEle.value = `${response_3.data.results[i].name}`
    optionEle.text = `${response_3.data.results[i].name}`
    dropdownList.appendChild(optionEle)

   }
    
  }