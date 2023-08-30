const LOCAL_STORAGE_KEY = 'ui-theme';
const refs = {
	aside: document.querySelectorAll('aside'),
	socialList: document.querySelector('.social__list'),
	mainStyles: document.querySelector('link[data-anchor="main-styles"]'),
	darkModeBtn: document.querySelector('.main-nav__link--dark-mode'),
	navButtons: [...document.querySelectorAll('.main-nav__link')],
	mainSections: document.querySelectorAll('main > section'),
	eduNworkBlocks: document.querySelectorAll('.edu-n-work__wrapper'),
};
refs.navButtons.shift();

console.log(refs.mainStyles);

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
	localStorage.setItem(LOCAL_STORAGE_KEY, 'light');
} else {
	if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'dark') {
		activateDarkMode();
	} else {
		refs.mainStyles.nextElementSibling?.remove();
	}
}

window.addEventListener(
	'scroll',
	_.throttle(
		() => {
			showActiveSection();
		},
		300,
		{ leading: false }
	)
);

refs.darkModeBtn.addEventListener('click', activateDarkMode);
refs.socialList.addEventListener('click', removeFocus);

function showActiveSection() {
	const currentBtnIdx = refs.navButtons.findIndex(button =>
		button.classList.contains('main-nav__link--current')
	);

	const breakPoint = window.screen.height / 3;

	const { top: currentSectionTopPos } =
		refs.mainSections[currentBtnIdx].getBoundingClientRect();

	const { bottom: currentSectionBottomPos } =
		refs.mainSections[currentBtnIdx].getBoundingClientRect();

	if (currentSectionBottomPos < breakPoint) {
		refs.navButtons[currentBtnIdx].classList.remove('main-nav__link--current');
		refs.navButtons[currentBtnIdx + 1].classList.add('main-nav__link--current');
	} else if (currentSectionTopPos > breakPoint && currentBtnIdx !== 0) {
		refs.navButtons[currentBtnIdx].classList.remove('main-nav__link--current');
		refs.navButtons[currentBtnIdx - 1].classList.add('main-nav__link--current');
	}
}

function activateDarkMode(e) {
	e?.preventDefault();

	if (refs.darkModeBtn.classList.contains('main-nav__link--current')) {
		refs.mainStyles.nextElementSibling.remove();
		localStorage.setItem(LOCAL_STORAGE_KEY, 'light');
	} else {
		const darkModeStyle = document.createElement('link');
		darkModeStyle.rel = 'stylesheet';
		darkModeStyle.href = './assets/css/dark-mode.css';
		refs.mainStyles.after(darkModeStyle);
		localStorage.setItem(LOCAL_STORAGE_KEY, 'dark');
	}

	refs.darkModeBtn.classList.toggle('main-nav__link--current');
	if (e) removeFocus(e);
}

function removeFocus(e) {
	e.target.blur();
	e.target.parentNode.blur();
}

function handleStorage() {
	localStorage.getItem('ui-theme');
}
