const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header')
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*-----------------------------------------------------------*/


const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
    }

 modalBtns.forEach((mb,i)=>{
     mb.addEventListener('click', ()=>{
         modal(i)
     })
  })
// modalBtns[0].addEventListener('click',()=>{
//     modalViews[0].classList.add('active-modal');
// })

 modalClose.forEach((mc) => {
    mc.addEventListener('click', () =>{
        modalViews.forEach((mv) =>{
            mv.classList.remove('active-modal')
        })
    })
 })

/*------------------------------------------------------------*/

 let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});


const linkwork = document.querySelectorAll('.work__item')

function activework(){
    linkwork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkwork.forEach(l=> l.addEventListener('click', activework))

/*-------------------------------------------------------------*/




const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id')
			//   sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
		}else{
			document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
		}
	})
}
window.addEventListener('scroll', scrollActive)

/*----------------------------------------------------------*/


const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})




const sr = ScrollReveal({
     origin: 'top',
     distance: '60px',
     duration: 1500,
     delay: 400,
    //  reset: true,
 })

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay: 700})
sr.reveal(`.home__social, .home__scroll`, {delay: 900, origin: 'bottom'} )


//--------------------------form validation-------------------------------//

const username = document.querySelector('#Name')
const email = document.querySelector('#Email')
const project = document.querySelector('#Project')

const form = document.querySelector('#contact_form')

form.addEventListener('submit',validate)

const isRequired = value => value === '' ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validate(e){
    e.preventDefault()
    console.log(email)
    if(!isRequired(username.value)||!isRequired(email.value)||!isRequired(project.value)){
        alert("Please Enter Complete Details!")
    }

    else if(!isEmailValid(email.value)){
        alert("Please Enter a Valid Email!")
    }
    else{
        const formdata = new FormData()
        formdata.append("Name",username.value)
        formdata.append("Email",email.value)
        formdata.append("Project",project.value)
        fetch('https://script.google.com/macros/s/AKfycbxz455rr9uLFYZt4Rb5kG_L6H9JBAA-Ni_kjJBBNAmO24FiAezQvn6-roNJFBYTev_K/exec', {
  method: 'POST',
  body: formdata
})
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
    alert('Data Sent Successfully! Thankyou for contacting :)')
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
    }
    username.value=''
    email.value=''
    project.value=''
}