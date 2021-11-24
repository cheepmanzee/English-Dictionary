const $word = document.getElementById('word'),
      $translation = document.getElementById('translation'),
      $table = document.getElementById('table'),
      $inputs = document.querySelectorAll('.input'),
      $add = document.getElementById('add');

let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const fillTable = index => {
   $table.innerHTML += `
   <tr>
      <td>${words[index].word}</td>
      <td>${words[index].translation}</td>
      <td class="delete">X</td>
   </tr>
   `
}

words.forEach(function(el,i) {
   fillTable(i);
});

$add.addEventListener('click',() => {
   if (
      $word.value.length < 1 ||
      $translation.value.length < 1 ||
      !isNaN($word.value) ||
      !isNaN($translation.value)
      ) {
         for (let x of $inputs) {
            x.style.borderColor = 'red';
         }
   } else {
      for (let x of $inputs) {
         x.style.borderColor = 'transparent';
      }
      words.push(new createWord($word.value, $translation.value));
      localStorage.setItem('words', JSON.stringify(words));
      fillTable(words.length - 1);
      $word.value = null;
      $translation.value = null;
   }
})

function createWord(word,translation) {
   this.word = word;
   this.translation = translation;
}

const deleteWord = e => {
   const rowIndex = e.target.parentNode.rowIndex;
   e.target.parentNode.parentNode.remove();
   words.splice(rowIndex,1);
   localStorage.removeItem('words');
   localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {
   if (words.length > 0) {
      const $delete = document.querySelectorAll('.delete');
      for (let btn of $delete) {
         btn.addEventListener('click',e => {
            deleteWord(e);
         })
      }
   }
}

addEventDelete()
