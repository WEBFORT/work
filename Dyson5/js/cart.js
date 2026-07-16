export default class Cart {}

(function () {
	"use strict";

	const g = (id) => document.getElementById(id),
		s = {
			cart: (() => {
				try {
					const r = sessionStorage.getItem("site-cart");
					return Array.isArray(JSON.parse(r)) ? JSON.parse(r) : [];
				} catch (e) {
					return [];
				}
			})(),
			el: {
				btn: g("cart-btn"),
				modal: g("cart-modal"),
				count: g("cart-count"),
				items: g("cart-items"),
				total: g("cart-total"),
				empty: g("cart-empty"),
				cm: g("cart-confirm-modal"),
				cy: g("cart-confirm-yes"),
				cn: g("cart-confirm-no"),
			},
		},
		save = () => sessionStorage.setItem("site-cart", JSON.stringify(s.cart)),
		esc = (t) =>
			typeof t !== "string"
				? ""
				: t.replace(
						/[&<>"]/g,
						(m) =>
							({
								"&": "&amp;",
								"<": "&lt;",
								">": "&gt;",
								'"': "&quot;",
							})[m]
					),
		render = () => {
			const total = s.cart.reduce((a, i) => a + i.price * i.qty, 0),
				count = s.cart.reduce((a, i) => a + i.qty, 0);

			if (s.el.count) {
				s.el.count.textContent = count;
				s.el.count.classList.toggle("show", count > 0);
			}

			if (s.el.total) {
				s.el.total.textContent = total.toLocaleString("ru-RU") + " ₽";
			}

			if (!s.cart.length) {
				if (s.el.empty) s.el.empty.style.display = "block";
				if (s.el.items) s.el.items.innerHTML = "";
				return;
			}

			if (s.el.empty) s.el.empty.style.display = "none";

			if (s.el.items) {
				s.el.items.innerHTML =
					s.cart
						.map(
							(i, idx) => `
            <li><span>${esc(i.name)}</span><div>
              <button type="button" data-a="m" data-i="${idx}" style="padding:0 4px;cursor:pointer;">−</button>
              ${i.qty}
              <button type="button" data-a="p" data-i="${idx}" style="padding:0 4px;cursor:pointer;">+</button>
            </div><b>${(i.price * i.qty).toLocaleString("ru-RU")} ₽</b>
            <button type="button" data-a="r" data-i="${idx}" style="margin-left:12px;padding:0 6px;cursor:pointer;color:#d00;">Удалить</button>
            </li>`
						)
						.join("") +
					`
            <li style="margin-top:16px;text-align:center;">
              <button type="button" id="cart-clear-all" style="padding:8px 16px;background:#d00;color:#fff;border:none;cursor:pointer;border-radius:4px;">Очистить всю корзину</button>
            </li>`;
			}
		},
		add = (id, name, price, qty = 1) => {
			// Если товар уже есть — увеличиваем на переданное количество
			const e = s.cart.find((i) => i.id === id);
			if (e) {
				e.qty += qty;
			} else {
				s.cart.push({ id, name, price, qty });
			}
			save();
			render();
		},
		remove = (idx) => {
			if (isNaN(idx) || idx < 0 || idx >= s.cart.length) return;
			s.cart.splice(idx, 1);
			save();
			render();
		},
		qty = (btn) => {
			const a = btn.dataset.a,
				i = parseInt(btn.dataset.i, 10);
			if (isNaN(i) || i < 0 || i >= s.cart.length) return;
			const it = s.cart[i];
			it.qty = Math.max(1, it.qty + (a === "p" ? 1 : -1));
			if (a === "m" && it.qty === 0) s.cart.splice(i, 1);
			save();
			render();
		},
		clearAll = () => {
			s.cart = [];
			save();
			render();
			hideCm();
		},
		showCm = () => {
			if (s.el.cm) s.el.cm.style.display = "flex";
		},
		hideCm = () => {
			if (s.el.cm) s.el.cm.style.display = "none";
		},
		toggleScroll = (l) => {
			document.body.style.overflow = l ? "hidden" : "";
			document.body.classList.toggle("modal-open", l);
		};

	// Обработчики модального окна и подтверждения
	if (s.el.cy) s.el.cy.addEventListener("click", clearAll);
	if (s.el.cn) s.el.cn.addEventListener("click", hideCm);
	if (s.el.cm)
		s.el.cm.addEventListener("click", (e) => {
			if (e.target === s.el.cm) hideCm();
		});

	if (s.el.btn && s.el.modal) {
		s.el.btn.addEventListener("click", () => {
			s.el.modal.classList.add("active");
			toggleScroll(true);
		});
		const closeBtn = s.el.modal.querySelector(".modal-close");
		if (closeBtn)
			closeBtn.addEventListener("click", () => {
				s.el.modal.classList.remove("active");
				toggleScroll(false);
			});
		s.el.modal.addEventListener("click", (e) => {
			if (e.target === s.el.modal) {
				s.el.modal.classList.remove("active");
				toggleScroll(false);
			}
		});

		if (s.el.items)
			s.el.items.addEventListener("click", (e) => {
				const b = e.target.closest("button[data-a]");
				if (b) {
					b.dataset.a === "r" ? remove(parseInt(b.dataset.i, 10)) : qty(b);
					return;
				}
				if (e.target.closest("#cart-clear-all")) showCm();
			});

		render();
	}

	// --- НОВАЯ ЛОГИКА: кнопки +/- количества в карточке ---
	document.querySelectorAll(".special-offers__number-button").forEach((btn) => {
		btn.addEventListener("click", () => {
			const action = btn.dataset.action; // "inc" или "dec"
			const display = btn
				.closest(".special-offers__number")
				.querySelector("#quantity-Display");

			if (!display) return;

			let val = parseInt(display.textContent, 10) || 1;

			if (action === "inc") {
				val+1;
			} else if (action === "dec") {
				val = Math.max(1, val - 1);
			}

			display.textContent = val;
		});
	});

	// --- ОБНОВЛЁННАЯ ЛОГИКА: «В корзину» с учётом количества ---
	document.querySelectorAll(".special-offers__cart").forEach((btn) =>
		btn.addEventListener("click", (e) => {
			const target = e.currentTarget;
			const id = target.dataset.id;
			const name = target.dataset.name;
			const price = Number(target.dataset.price);

			// Ищем блок количества в этой карточке
			const display = target
				.closest(".special-offers__product")
				.querySelector("#quantity-Display");

			let qty = 1;
			if (display) {
				qty = Math.max(1, parseInt(display.textContent, 10) || 1);
			}

			if (id && name && !isNaN(price)) {
				add(id, name, price, qty);
			}
		})
	);

	window.SiteCart = { addToCart: add };
})();

