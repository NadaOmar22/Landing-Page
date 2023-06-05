// Start Helper Functions

function isSectionInViewPort(section) {
	const boundaries = section.getBoundingClientRect();
	return (boundaries.top >= -50 && boundaries.top < 500);
}

function addActiveClass(section, index) {
	section.classList.add('your-active-class');

	let htmlUl = document.getElementById('navbar__list');
	htmlUl.children[index].style.background = 'hsl(10, 0%, 0%)';
	htmlUl.children[index].children[0].style.color = 'white';
}

function removeActiveClass(section, index) {
	section.classList.remove('your-active-class');

	let htmlUl = document.getElementById('navbar__list');
	htmlUl.children[index].style.background = 'white';
	htmlUl.children[index].children[0].style.color = 'black';
}

// Begin Main Functions

// build the nav
function buildNavBar() {
	let htmlSections = document.querySelectorAll('section');
	let htmlUl = document.getElementById('navbar__list');

	for (let i = 0; i < htmlSections.length; i++) {
		newListItem = document.createElement('li');

		// get id of the section to be used as link 
		linkOfSection = htmlSections[i].getAttribute('id');

		// get data-nav arrtibute value to be used as name of the section
		nameOfSection = htmlSections[i].getAttribute('data-nav');

		newListItem.innerHTML = `<a href = "#${linkOfSection}" class = "menu__link">${nameOfSection}</a>`;

		newListItem.addEventListener("click", scrolling(newListItem));

		htmlUl.appendChild(newListItem);
	}
}

// Add class 'active' to section when near top of viewport
function activateTheSection() {
	let htmlSections = document.querySelectorAll('section');

	for (let i = 0; i < htmlSections.length; i++) {
		// if section in view port add to it active class
		if (isSectionInViewPort(htmlSections[i])) {
			addActiveClass(htmlSections[i], i);
		}
		else {
			removeActiveClass(htmlSections[i], i);
		}
	}
}

// Make the srolling in smoothly way
function scrolling(element) {
	element.addEventListener('click', (e) => {

		// Prevent function : prevent the auto-scrolling so it will be easy to implement smooth scrolling.
		e.preventDefault();

		// to get the element to scroll to it
		const id = element.childNodes[0].getAttribute('href').slice(1);

		document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
	});
}

// Build menu 
buildNavBar();

// Set sections as active
window.addEventListener('scroll', activateTheSection);
