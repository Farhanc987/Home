//Accordian dropdown
const dropdown = document.getElementsByClassName('QandA');

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener('click', function(){
        this.classList.toggle('drop')
    })
}

