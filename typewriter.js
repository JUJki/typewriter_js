
const texts = 
["{AMBIVALENT}, adjectif",
"{Féminin} : ambivalente",
"{Sens} : Qui présente de l’ambivalence, ambigu. Qui peut signifier deux choses différentes, offrir deux interprétations possibles. Quelque chose d’ambivalent peut servir à deux usages distincts.",
"{Exemple} : Une relation ambivalente, un sentiment ambivalent, un attachement ambivalent.",
"{Synonymes} : ambigu, équivoque, complexe",
"{Contraires} : catégorique, monovalent, claire",
"{Étymologie} : de l’allemand ambivalent, lui-même dérivé du latin AMBI, désignant autour des deux cotés, et VALENS signifiant fort, énergique.",
"{Traduction en anglais} : ambivalent"];

let textIndex = 0; 
let letterIndex = 0; 
const speedPrint = 100;
let highLight = false

function listIndexClass() {
  return texts.map(function(text){
    const textArray = text.split('');
    const highlightStart = textArray.map(function(letter, index){
      if(letter === '{') {
              return index
            };
            return null;
    }).filter(function(item) {return item !== null})

    const highlightEnd = textArray.map(function(letter, index){
      if(letter === '}') {
                return index
            };
            return null;
    }).filter(function(item) {return item !== null})
    return {
      text: text,
      highlightStart: highlightStart,
      highlightEnd: highlightEnd
    }
  })
}

function type() {
  const listText = listIndexClass()
  if (textIndex === listText.length) {
    textIndex = 0;
  }
 
  const currentText = listText[textIndex].text;
  
  if(letterIndex === 0) {
    document.querySelector('#bloc_text_print_machine').innerHTML += '<div class="inner_text_print_machine"></div>'
  }
  
  const index = letterIndex
  const letter = currentText.slice(letterIndex, ++letterIndex);

  if(listText[textIndex].highlightStart.includes(index)) {
    highLight = true
  } else if(listText[textIndex].highlightEnd.includes(index)) {
    highLight = false
  } else {
    if(highLight === true) {
      document.querySelector('#bloc_text_print_machine').lastElementChild.innerHTML += `<span style="color:red">${letter}</span>`;
    } else {
      document.querySelector('#bloc_text_print_machine').lastElementChild.innerHTML += `<span>${letter}</span>`;
    }
  }
   
  if (letterIndex === currentText.length) {
      textIndex++;
      letterIndex = 0;
      document.querySelector('#bloc_text_print_machine').innerHTML += '</br'
  }

  if(textIndex === listText.length) {
    return 
  }
    
  setTimeout(type, speedPrint);
};


jQuery(document).ready(function(){
  document.querySelector('.text_print_machine').innerHTML += '<div id="bloc_text_print_machine"></div>'
  type()
});

