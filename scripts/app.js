document.addEventListener('DOMContentLoaded', ()=>{

	const locBtns = document.querySelectorAll('.loc-tab');

	if (locBtns.length != null) {
		locItems = document.querySelectorAll('.loc-window');
		locBtns.forEach(function(item, i) {
			item.addEventListener('click', (e)=>{
				if (!e.target.classList.contains('active')) {
					locBtns.forEach(function(item){
						item.classList.remove('active');
					})
					locItems.forEach(function(item){
						item.classList.remove('active');
					})
					e.target.classList.add('active');
					locItems[i].classList.add('active');
				}
			})
		})
		locBtns[0].click();
	}

	const tabBtns = document.querySelectorAll('.tab-btn');

	if (tabBtns.length != null) {
		tabBtns.forEach(function(item){
			item.addEventListener('click', (e)=>{
				if (!e.target.classList.contains('active')) {
					e.target.classList.add('active');
					let currentItem = e.target.nextElementSibling;
					currentItem.style.maxHeight = currentItem.scrollHeight + 'px';
					currentItem.classList.add('active');
				} else {
					e.target.classList.remove('active');
					let currentItem = e.target.nextElementSibling;
					currentItem.style.maxHeight = 0;
					currentItem.classList.remove('active');
				}
			})
		})
	}

	const cityBtn = document.querySelector('.city-btn');

	if (cityBtn) {
		const popupCity = document.querySelector('.city-popup');
		const closeCity = document.querySelector('.city-popup .close-popup');

		closeCity.addEventListener('click', ()=>{
			CloseCity();
			cityBtn.classList.remove('active');
		});
		cityBtn.addEventListener('click', (e)=>{
			if (!e.target.classList.contains('active')) {
				e.target.classList.add('active');
				OpenCity();
			} else {
				e.target.classList.remove('active');
				CloseCity();
			}
		})

		function OpenCity() {
			document.body.style.overflow = 'hidden';
			popupCity.classList.add("active");
		}
		function CloseCity() {
			document.body.style.overflow = 'auto';
			popupCity.classList.remove("active");
		}
	}
	
    const heroSlider = new Swiper('.hero__slider', {
        loop: true,
        speed: 500,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
       
    });

	const sliderPreview = new Swiper('.product-preview', {
		direction: 'vertical',
		slidesPerView: 'auto',
		spaceBetween: 15,
	})

	const productSlider = new Swiper('.product-slider', {
		speed: 500,
		thumbs: {
			swiper: sliderPreview
		  },
		  breakpoints: {
		  }
	})
    

    const breakerSlider = new Swiper('.breaker-slider__slider', {
        loop: false,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            prevEl: '.prev-slide',
            nextEl: '.next-slide',
        },
		breakpoints: {
			0: {
				slidesPerView: 1, 
				centeredSlide: true,
			},
			560: {
				slidesPerView: 2,
				centeredSlide: false,
			},
			560: {
				slidesPerView: 3,
				centeredSlide: false,
			},
			920: {
				slidesPerView: 4,
				centeredSlide: false,
			},
			1024: {
				slidesPerView: 5,
				centeredSlide: false,
			},
			1200: {
				slidesPerView: 6,
				centeredSlide: false,
			},
		}
    })

    const miniSlider = new Swiper('.mini-slider__slider', {
        loop: false,
        speed: 500,
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            560: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    })



    
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

})