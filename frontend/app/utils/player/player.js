export default function Player(n, t) {
	this.baseUrl = new URL(t.baseUrl || 'https://kinobox.tv/')
	this.container = n instanceof Object ? n : document.querySelector(n)
	this.params = t
	this.params.view = t.view || {}
	this.params.view.defaultMenu = t.view.defaultMenu || 'menuList'
	this.params.view.mobileMenu = t.view.mobileMenu || 'menuButton'
	this.params.view.format = t.view.format || '{N} {S} :: {T} ({Q})'
	this.params.view.limit = t.view.limit || null
	this.params.hide = t.hide || []
	this.params.order = t.order || []
	this.params.params = t.params || {}
	this.players = []
	this.state = { isMenuOpen: !1 }
}

if (process.browser) {
	if (typeof window !== 'undefined') {
		document.addEventListener('DOMContentLoaded', function () {
			Player.isMobile = 'ontouchstart' in document.documentElement || window.screen.width < 500
		})
	}
}

Player.prototype.log = function (n, t) {
	if (t) for (var i in t) n = n.replace('{' + i + '}', t[i])
	console.info('[Player] ' + n)
}
Player.prototype.fetch = function (n, t) {
	var i = new XMLHttpRequest()
	i.onload = function () {
		if (i.status === 200) t(i.response)
		else i.onerror(null)
	}
	i.onerror = function () {
		console.error('Error ' + i.status + ': ' + i.statusText + '\n' + i.response)
		t(i.response)
	}
	i.open('GET', n)
	i.send()
}
Player.prototype.init = function () {
	var n = this,
		t,
		i
	this.log('Initializing')
	t = document.createElement('link')
	t.rel = 'stylesheet'
	i = this.baseUrl
	i.pathname = 'kinobox.min.css'
	t.href = i.toString()
	document.head.appendChild(t)
	;(typeof CSS != 'undefined' && CSS.supports('aspect-ratio', '1/1')) ||
		((this.container.style.height = this.container.offsetWidth / 1.777777 + 'px'),
		(this.container.style.maxHeight = this.container.offsetHeight + 'px'))
	this.buildMain()
	this.log('Searching')
	this.fetch(this.getSearchUrl(), function (t) {
		try {
			var i = JSON.parse(t)
			var videocdnIndex = 1
			i.forEach((player, index) => {
				if (player.source === 'Videocdn') {
					videocdnIndex = index + 1
				}
			})
			if (!i) {
				n.showMessage('Error loading data.')
				return
			}
			if (i.message) {
				n.showMessage(i.message)
				return
			}
			if (i.length === 0) {
				n.showMessage('Видео не найдено.')
				return
			}
			n.players = i
			n.buildMenu()
			n.selectPlayer(videocdnIndex)
		} catch (r) {
			console.error(r)
			n.showMessage('Error loading data.')
		}
	})
}
Player.prototype.getSearchUrl = function () {
	var n = new URLSearchParams(),
		t
	return (
		this.params.token && n.set('token', this.params.token),
		this.params.search.kinopoisk && n.set('kinopoisk', this.params.search.kinopoisk),
		this.params.search.imdb && n.set('imdb', this.params.search.imdb),
		this.params.search.title && n.set('title', this.params.search.title),
		this.params.search.query && n.set('query', this.params.search.query),
		(t = this.baseUrl),
		(t.pathname = 'api/players/main'),
		(t.search = n.toString()),
		t.toString()
	)
}
Player.prototype.buildMain = function () {
	this.container.innerHTML = ''
	this.wrapper = document.createElement('div')
	this.wrapper.className = 'kinobox__wrapper'
	this.container.appendChild(this.wrapper)
	this.message = document.createElement('div')
	this.message.className = 'kinobox__message kinobox__hidden'
	this.wrapper.appendChild(this.message)
	this.iframeWrapper = document.createElement('div')
	this.iframeWrapper.className = 'kinobox__iframeWrapper'
	this.wrapper.appendChild(this.iframeWrapper)
	this.nav = document.createElement('nav')
	this.nav.className = 'kinobox__nav'
	this.wrapper.appendChild(this.nav)
}
Player.prototype.buildMenu = function () {
	var n = this,
		t
	this.ul = document.createElement('ul')
	this.nav.appendChild(this.ul)
	this.buttonMenu = document.createElement('button')
	this.nav.appendChild(this.buttonMenu)
	Player.isMobile
		? this.nav.classList.add(this.params.view.mobileMenu)
		: this.nav.classList.add(this.params.view.defaultMenu)
	this.nav.classList.contains('menuList') && this.touch()
	this.params.view.open && this.showMenu(!0)
	this.ul.addEventListener('mouseenter', function () {
		n.nav.classList.contains('menuList') && n.showMenu(!0)
	})
	this.ul.addEventListener('mouseleave', function () {
		n.nav.classList.contains('menuList') && n.showMenu(!1)
	})
	this.buttonMenu.addEventListener('click', function () {
		n.showMenu(!n.state.isMenuOpen)
	})
	t = this.players
	this.params.hide.length > 0 &&
		(t = this.players.filter(function (t) {
			return n.params.hide.includes(t.source.toLowerCase()) === !1
		}))
	this.params.order.length > 0 &&
		(t = t.sort(function (t, i) {
			return n.params.order.indexOf(i.source.toLowerCase()) === -1
				? -99
				: n.params.order.indexOf(t.source.toLowerCase()) -
						n.params.order.indexOf(i.source.toLowerCase())
		}))
	t.forEach(function (t, i) {
		var u = (i + 1).toString(),
			r = document.createElement('li')
		r.dataset.number = u
		r.dataset.url = n.getIframeUrl(t.iframeUrl, t.source, n.params.params)
		r.title = '{N}. {T} ({Q})'
			.replace('{N}', u)
			.replace('{T}', t.translation || '-')
			.replace('{Q}', t.quality || '-')
		r.innerHTML = n.params.view.format
			.replace('{N}', u)
			.replace('{S}', t.source)
			.replace('{T}', t.translation || '-')
			.replace('{Q}', t.quality || '-')
		n.ul.appendChild(r)
		r.addEventListener('click', function () {
			n.log('Switch to player: {number}, {source}', {
				number: r.dataset.number,
				source: t.source,
			})
			;[].forEach.call(n.ul.querySelectorAll('li'), function (n) {
				n.classList.remove('active')
			})
			r.classList.add('active')
			n.showIframe(r.dataset.url)
		})
	})
	this.hotkeys()
}
Player.prototype.getIframeUrl = function (n, t, i) {
	var u, r
	if (
		((n = new URL(n)),
		(t = t.toLowerCase()),
		(u = new URLSearchParams(n.search)),
		i.hasOwnProperty('all'))
	)
		for (r in i.all) u.set(r, i.all[r])
	if (i.hasOwnProperty(t)) for (r in i[t]) u.set(r, i[t][r])
	return (n.search = u), n.toString()
}
Player.prototype.touch = function () {
	function s(t) {
		i = { x: t.changedTouches[0].clientX, y: t.changedTouches[0].clientY }
		u = { x: i.x, y: i.y }
		n = 0
		r = !1
	}
	function h(o) {
		if ((o.preventDefault(), o.stopImmediatePropagation(), !r))
			if (
				((u = { x: o.changedTouches[0].clientX, y: o.changedTouches[0].clientY }),
				(n = u.x - i.x),
				(n = Math.abs(n)),
				n > 0 && n < 70)
			)
				(t.style.marginRight = (f ? -1 : 1) * n + 'px'), (r = !1)
			else
				return (
					f ? e.showMenu(!1) : e.showMenu(!0),
					(t.style.marginRight = '0px'),
					(n = 0),
					(r = !0),
					(f = !f),
					null
				)
	}
	function o() {
		t.style.marginRight = '0px'
		i = null
		u = null
		n = 0
		r = !0
	}
	var e = this,
		t = this.container.querySelector('ul')
	t.addEventListener('touchstart', s)
	t.addEventListener('touchmove', h)
	t.addEventListener('touchend', o)
	t.addEventListener('touchcancel', o)
	var i = null,
		u = null,
		n = 0,
		r = !0,
		f = !1
}
Player.prototype.hotkeys = function () {
	var n = this
	document.addEventListener('keypress', function (t) {
		var r = t.target.parentNode.firstElementChild.tagName,
			i,
			u
		r !== 'INPUT' &&
			r !== 'TEXTAREA' &&
			((i = parseInt(t.key)),
			i
				? n.selectPlayer(i)
				: t.key === 'x'
				? n.showMenu(!0)
				: t.key === 'z'
				? n.showMenu(!1)
				: !1 && ((u = document.querySelector('iframe')), u.contentWindow.focus()))
	})
}
Player.prototype.showMessage = function (n) {
	n
		? ((this.message.textContent = n), this.message.classList.remove('kinobox__hidden'))
		: ((this.message.textContent = ''), this.message.classList.add('kinobox__hidden'))
}
Player.prototype.showMenu = function (n) {
	this.state.isMenuOpen = n
	n ? this.ul.classList.add('active') : this.ul.classList.remove('active')
}
Player.prototype.showIframe = function (n) {
	var i = this,
		t,
		r
	this.log('Loading iframe: {url}', { url: n })
	t = document.createElement('iframe')
	t.className = 'kinobox__iframe'
	t.allowFullscreen = !0
	t.frameBorder = '0'
	t.src = n
	i.iframeWrapper.innerHTML = ''
	i.iframeWrapper.appendChild(t)
	r = Date.now()
	t.addEventListener('load', function () {
		i.log('Iframe loaded in {time} ms: {url}', { time: Date.now() - r, url: t.src })
	})
}
Player.prototype.selectPlayer = function (n) {
	if (this.ul) {
		var i = '[data-number="{id}"]'.replace('{id}', n),
			t = this.ul.querySelector(i)
		t && t.click()
	}
}
