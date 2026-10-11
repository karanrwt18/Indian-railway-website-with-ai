/* =========================================
   RAILSETU - Main JavaScript
   Smart Fallback: Har route pe train milegi
   ========================================= */

/* ============ TRAINS DATA ============ */
const trains = [
    /* ============ ORIGINAL TRAINS ============ */
    { id: "12951", name: "Mumbai Rajdhani", from: "New Delhi", to: "Mumbai Central", dep: "16:55", arr: "08:35", duration: "15h 40m", fare: 2050, classes: ["1A", "2A", "3A"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12002", name: "Bhopal Shatabdi", from: "New Delhi", to: "Bhopal", dep: "06:00", arr: "14:00", duration: "8h 00m", fare: 1250, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12301", name: "Howrah Rajdhani", from: "New Delhi", to: "Howrah", dep: "17:00", arr: "09:55", duration: "16h 55m", fare: 2150, classes: ["1A", "2A", "3A"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12430", name: "New Delhi Lucknow AC SF", from: "New Delhi", to: "Lucknow", dep: "20:50", arr: "06:45", duration: "9h 55m", fare: 1450, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12926", name: "Paschim Express", from: "Amritsar", to: "Mumbai Central", dep: "07:40", arr: "16:35", duration: "32h 55m", fare: 980, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12626", name: "Kerala Express", from: "New Delhi", to: "Thiruvananthapuram", dep: "11:25", arr: "05:00", duration: "41h 35m", fare: 1780, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12802", name: "Purushottam Express", from: "New Delhi", to: "Puri", dep: "22:35", arr: "05:55", duration: "31h 20m", fare: 1120, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12903", name: "Golden Temple Mail", from: "Mumbai Central", to: "Amritsar", dep: "18:45", arr: "23:35", duration: "28h 50m", fare: 1050, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },

    /* ============ UTTARAKHAND TRAINS ============ */
    { id: "12017", name: "Dehradun Shatabdi Express", from: "New Delhi", to: "Dehradun", dep: "06:45", arr: "12:35", duration: "5h 50m", fare: 1050, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12055", name: "Dehradun Jan Shatabdi", from: "New Delhi", to: "Dehradun", dep: "15:20", arr: "21:10", duration: "5h 50m", fare: 720, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14041", name: "Mussoorie Express", from: "New Delhi", to: "Dehradun", dep: "22:25", arr: "08:30", duration: "10h 05m", fare: 680, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12401", name: "Nanda Devi Express", from: "New Delhi", to: "Dehradun", dep: "23:50", arr: "05:40", duration: "5h 50m", fare: 890, classes: ["1A", "2A", "3A"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14119", name: "Dehradun Express", from: "Old Delhi", to: "Dehradun", dep: "21:15", arr: "07:45", duration: "10h 30m", fare: 640, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14609", name: "Hemkunt Express", from: "Rishikesh", to: "Katra", dep: "15:25", arr: "06:40", duration: "15h 15m", fare: 980, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "15013", name: "Ranikhet Express", from: "Jaisalmer", to: "Kathgodam", dep: "17:00", arr: "05:55", duration: "12h 55m", fare: 850, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },

    /* ============ HIMACHAL PRADESH TRAINS ============ */
    { id: "12057", name: "Kalka Shatabdi Express (Morning)", from: "New Delhi", to: "Kalka", dep: "07:40", arr: "11:50", duration: "4h 10m", fare: 920, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12011", name: "Kalka Shatabdi Express (Evening)", from: "New Delhi", to: "Kalka", dep: "17:35", arr: "21:30", duration: "3h 55m", fare: 920, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14095", name: "Himalayan Queen", from: "Old Delhi", to: "Kalka", dep: "05:15", arr: "11:45", duration: "6h 30m", fare: 580, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14553", name: "Himachal Express", from: "Old Delhi", to: "Una Himachal", dep: "21:25", arr: "11:00", duration: "13h 35m", fare: 790, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12005", name: "Kalka Jan Shatabdi", from: "New Delhi", to: "Kalka", dep: "14:15", arr: "18:30", duration: "4h 15m", fare: 520, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "52451", name: "Kalka Shimla Toy Train", from: "Kalka", to: "Shimla", dep: "05:30", arr: "10:15", duration: "4h 45m", fare: 350, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "52455", name: "Shivalik Deluxe Express", from: "Kalka", to: "Shimla", dep: "05:45", arr: "11:05", duration: "5h 20m", fare: 450, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "04510", name: "Shimla Express", from: "Kalka", to: "Shimla", dep: "06:30", arr: "12:45", duration: "6h 15m", fare: 380, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },

    /* ============ EXTRA ROUTES (Har route ke liye) ============ */
    { id: "12001", name: "Agra Intercity Express", from: "New Delhi", to: "Agra Cantt", dep: "06:00", arr: "08:30", duration: "2h 30m", fare: 450, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12050", name: "Jaipur Double Decker", from: "New Delhi", to: "Jaipur", dep: "06:05", arr: "10:30", duration: "4h 25m", fare: 620, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12958", name: "Ahmedabad Rajdhani", from: "New Delhi", to: "Ahmedabad", dep: "19:55", arr: "08:30", duration: "12h 35m", fare: 1650, classes: ["1A", "2A", "3A"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12622", name: "Tamil Nadu Express", from: "New Delhi", to: "Chennai", dep: "22:30", arr: "07:40", duration: "33h 10m", fare: 1720, classes: ["1A", "2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12628", name: "Karnataka Express", from: "New Delhi", to: "Bengaluru", dep: "20:15", arr: "05:30", duration: "33h 15m", fare: 1680, classes: ["1A", "2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12304", name: "Poorva Express", from: "New Delhi", to: "Kolkata", dep: "16:15", arr: "14:55", duration: "22h 40m", fare: 1550, classes: ["1A", "2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12296", name: "Sanghamitra Express", from: "New Delhi", to: "Patna", dep: "20:40", arr: "10:15", duration: "13h 35m", fare: 1120, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12560", name: "Shiv Ganga Express", from: "New Delhi", to: "Varanasi", dep: "18:20", arr: "06:10", duration: "11h 50m", fare: 980, classes: ["1A", "2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12045", name: "Chandigarh Shatabdi", from: "New Delhi", to: "Chandigarh", dep: "07:40", arr: "11:05", duration: "3h 25m", fare: 780, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12027", name: "Pune Shatabdi", from: "New Delhi", to: "Pune", dep: "06:15", arr: "14:00", duration: "7h 45m", fare: 1100, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12724", name: "Telangana Express", from: "New Delhi", to: "Hyderabad", dep: "16:00", arr: "08:30", duration: "16h 30m", fare: 1450, classes: ["1A", "2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12780", name: "Goa Express", from: "New Delhi", to: "Goa", dep: "15:00", arr: "06:00", duration: "39h 00m", fare: 1850, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },

    /* ============ EXTRA UTTARAKHAND ============ */
    { id: "12019", name: "Haridwar Shatabdi", from: "New Delhi", to: "Haridwar", dep: "06:45", arr: "11:30", duration: "4h 45m", fare: 950, classes: ["EC", "CC"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "14043", name: "Haridwar Express", from: "New Delhi", to: "Haridwar", dep: "22:00", arr: "05:30", duration: "7h 30m", fare: 620, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "12031", name: "Rishikesh Jan Shatabdi", from: "New Delhi", to: "Rishikesh", dep: "15:20", arr: "21:00", duration: "5h 40m", fare: 720, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "15014", name: "Kathgodam Express", from: "New Delhi", to: "Kathgodam", dep: "22:30", arr: "06:00", duration: "7h 30m", fare: 720, classes: ["2A", "3A", "SL"], days: "Mon Tue Wed Thu Fri Sat Sun" },

    /* ============ EXTRA HIMACHAL ============ */
    { id: "12028", name: "Una Jan Shatabdi", from: "New Delhi", to: "Una Himachal", dep: "14:15", arr: "21:30", duration: "7h 15m", fare: 680, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" },
    { id: "04511", name: "Kalka Express", from: "Old Delhi", to: "Kalka", dep: "23:00", arr: "05:30", duration: "6h 30m", fare: 420, classes: ["CC", "2S"], days: "Mon Tue Wed Thu Fri Sat Sun" }
];

/* ============ STATIONS (Sirf valid) ============ */
const stations = [
    "New Delhi",
    "Old Delhi",
    "Mumbai Central",
    "Bhopal",
    "Howrah",
    "Lucknow",
    "Amritsar",
    "Thiruvananthapuram",
    "Puri",
    "Jaisalmer",
    "Rishikesh",
    "Dehradun",
    "Kathgodam",
    "Katra",
    "Kalka",
    "Shimla",
    "Una Himachal",
    "Haridwar",
    "Agra Cantt",
    "Jaipur",
    "Ahmedabad",
    "Chennai",
    "Bengaluru",
    "Kolkata",
    "Patna",
    "Varanasi",
    "Chandigarh",
    "Pune",
    "Hyderabad",
    "Goa"
];

/* ============ HELPER FUNCTIONS ============ */
const get = (k) => {
    try {
        return JSON.parse(localStorage.getItem(k)) || null;
    } catch {
        return null;
    }
};

const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const norm = (s) => (s || "").trim().toLowerCase();

function toast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
}

/* ============ NAVIGATION ============ */
function setupNav() {
    const m = document.querySelector(".menu");
    const n = document.querySelector(".navlinks");
    if (m) m.onclick = () => n.classList.toggle("open");
}

/* ============ STATION FILL ============ */
function fillStations() {
    document.querySelectorAll(".station").forEach(s => {
        s.innerHTML = '<option value="">Select station</option>' +
            stations.map(x => `<option>${x}</option>`).join("");
    });
}

/* ============ TRAIN SEARCH ============ */
function trainSearch(e) {
    e?.preventDefault();
    const from = document.getElementById("from")?.value;
    const to = document.getElementById("to")?.value;
    const date = document.getElementById("date")?.value;
    const cls = document.getElementById("class")?.value || "ALL";

    if (!from || !to) {
        toast("Please select From and To stations");
        return;
    }
    if (from === to) {
        toast("From and To cannot be same");
        return;
    }
    set("search", { from, to, date, cls });
    location.href = "trains.html";
}

/* ============ RENDER TRAIN LIST (Smart Fallback) ============ */
function renderTrains() {
    const box = document.getElementById("trainResults");
    if (!box) return;

    const q = get("search") || {};
    document.getElementById("resultText").textContent =
        `${q.from || "All India"} → ${q.to || "All India"} ${q.date ? "• " + q.date : ""}`;

    let list = [];
    let isExact = false;

    // 1️⃣ Exact match
    list = trains.filter(t =>
        (!q.from || norm(t.from) === norm(q.from)) &&
        (!q.to || norm(t.to) === norm(q.to))
    );
    if (list.length) isExact = true;

    // 2️⃣ Reverse direction match
    if (!list.length && q.from && q.to) {
        list = trains.filter(t =>
            norm(t.from) === norm(q.to) &&
            norm(t.to) === norm(q.from)
        );
    }

    // 3️⃣ From match only (agar To match na ho)
    if (!list.length && q.from) {
        list = trains.filter(t => norm(t.from) === norm(q.from));
    }

    // 4️⃣ To match only (agar From match na ho)
    if (!list.length && q.to) {
        list = trains.filter(t => norm(t.to) === norm(q.to));
    }

    // 5️⃣ Kuch bhi match na ho toh random 6 trains dikha do
    if (!list.length) {
        list = trains.slice(0, 6);
        box.innerHTML = `
            <div class="alert" style="margin-bottom:15px">
                <b>⚠️ Direct train nahi mili is route pe.</b><br>
                <small>Neeche kuch <b>alternative trains</b> di gayi hain jo aapke liye helpful ho sakti hain.</small>
            </div>
        `;
    } else {
        box.innerHTML = "";
    }

    // 6️⃣ Trains render karo
    box.innerHTML += list.map(t => `
        <div class="panel train-card">
            <div class="train-name">
                <strong>${t.name}</strong>
                <span class="muted">${t.id} • Daily</span>
            </div>
            <div>
                <div class="time">${t.dep}</div>
                <span class="muted">${t.from}</span>
            </div>
            <div>
                <div class="time">${t.arr}</div>
                <span class="muted">${t.to}</span>
            </div>
            <div>
                <span class="status">${isExact ? "AVAILABLE" : "ALTERNATE"}</span>
                <div class="fare">₹${t.fare}</div>
            </div>
            <button class="btn btn-blue" onclick="selectTrain('${t.id}')">Select</button>
        </div>
    `).join("");
}

/* Quick Search Helper */
function quickSearch(from, to) {
    set("search", {
        from,
        to,
        date: new Date().toISOString().slice(0, 10),
        cls: "ALL"
    });
    location.reload();
}

/* ============ SELECT TRAIN ============ */
function selectTrain(id) {
    const t = trains.find(x => x.id === id);
    if (!t) {
        toast("Train not found");
        return;
    }
    set("selectedTrain", t);
    location.href = "train-details.html";
}

/* ============ TRAIN DETAILS ============ */
function renderDetails() {
    const t = get("selectedTrain");
    const el = document.getElementById("trainDetail");
    if (!el || !t) return;

    el.innerHTML = `
        <div class="panel">
            <div class="section-head">
                <div>
                    <h2>${t.name}</h2>
                    <p class="muted">Train No. ${t.id} • ${t.days}</p>
                </div>
                <span class="status">ON TIME</span>
            </div>
            <div class="ticket-route">
                <div><div class="big">${t.dep}</div><b>${t.from}</b></div>
                <div>→<br><small>${t.duration}</small></div>
                <div><div class="big">${t.arr}</div><b>${t.to}</b></div>
            </div>
            <hr style="margin:25px 0;border:0;border-top:1px solid var(--border)">
            <div class="features">
                ${t.classes.map(c => `
                    <div class="feature">
                        <b>${c}</b>
                        <span>₹${Math.round(t.fare * (c === "1A" ? 1.7 : c === "2A" ? 1.25 : 0.9))} • Available</span>
                    </div>
                `).join("")}
            </div>
            <button class="btn btn-primary" style="margin-top:22px" onclick="startBooking()">
                Continue to Passenger Details →
            </button>
        </div>
    `;
}

function startBooking() {
    location.href = "passengers.html";
}

/* ============ PASSENGERS ============ */
function addPassenger() {
    const wrap = document.getElementById("passengers");
    if (!wrap) return;
    const n = wrap.children.length + 1;
    const div = document.createElement("div");
    div.className = "passenger";
    div.innerHTML = `
        <div class="form-group"><label>Passenger ${n} Name</label><input class="input pname" placeholder="Full name"></div>
        <div class="form-group"><label>Age</label><input class="input page" type="number" min="1" max="120"></div>
        <div class="form-group"><label>Gender</label><select class="input pgender"><option>Male</option><option>Female</option><option>Other</option></select></div>
        <div class="form-group"><label>Berth</label><select class="input pberth"><option>Any</option><option>Lower</option><option>Middle</option><option>Upper</option><option>Side Lower</option><option>Side Upper</option></select></div>
        <button class="btn btn-outline" onclick="this.parentElement.remove()">Remove</button>
    `;
    wrap.appendChild(div);
}

function savePassengers() {
    const ps = [...document.querySelectorAll(".passenger")].map(x => ({
        name: x.querySelector(".pname").value,
        age: x.querySelector(".page").value,
        gender: x.querySelector(".pgender").value,
        berth: x.querySelector(".pberth").value
    }));
    if (!ps.length || ps.some(x => !x.name || !x.age)) {
        toast("Please enter passenger details");
        return;
    }
    set("passengers", ps);
    location.href = "seat-selection.html";
}

/* ============ SEAT SELECTION ============ */
function renderSeats() {
    const c = document.getElementById("coach");
    if (!c) return;
    let booked = [2, 5, 9, 14, 18, 22, 27, 31, 37, 41];
    c.innerHTML = Array.from({ length: 40 }, (_, i) => {
        let no = i + 1;
        return `<button class="seat ${booked.includes(no) ? "booked" : ""}" ${booked.includes(no) ? "disabled" : ""} onclick="pickSeat(this,${no})">${no}</button>`;
    }).join("");
}

function pickSeat(el, no) {
    document.querySelectorAll(".seat.selected").forEach(x => x.classList.remove("selected"));
    el.classList.add("selected");
    set("seat", no);
}

function confirmSeats() {
    if (!get("seat")) {
        toast("Please select a seat");
        return;
    }
    location.href = "payment.html";
}

/* ============ PAYMENT ============ */
function renderPayment() {
    const t = get("selectedTrain");
    const ps = get("passengers") || [];
    const seat = get("seat");
    const e = document.getElementById("paymentSummary");
    if (e && t) {
        e.innerHTML = `
            <b>${t.name} (${t.id})</b>
            <p>${t.from} → ${t.to}</p>
            <p>${ps.length} passenger(s) • Seat ${seat}</p>
            <h2 style="margin-top:10px">₹${t.fare * ps.length}</h2>
        `;
    }
}

function payNow() {
    const t = get("selectedTrain");
    const ps = get("passengers") || [];
    const seat = get("seat");
    const payment = document.querySelector('input[name="pay"]:checked')?.value;

    if (!t) { toast("Please select a train first"); return; }
    if (!payment) { toast("Select a payment method"); return; }

    const pnr = "RA" + Math.floor(1000000000 + Math.random() * 8999999999);
    const booking = {
        pnr,
        train: t,
        passengers: ps,
        seat,
        date: (get("search") || {}).date || new Date().toISOString().slice(0, 10),
        amount: t.fare * ps.length,
        payment,
        status: "CONFIRMED"
    };

    const h = get("bookings") || [];
    h.unshift(booking);
    set("bookings", h);
    set("currentBooking", booking);
    location.href = "ticket.html";
}

/* ============ TICKET ============ */
function renderTicket() {
    const b = get("currentBooking");
    const e = document.getElementById("ticket");
    if (!e || !b) return;

    e.innerHTML = `
        <div class="ticket-top">
            <div><b>RAILSETU</b><div class="pnr">${b.pnr}</div><small>Booking Confirmed</small></div>
            <div><b>${b.train.id}</b><br>${b.train.name}</div>
        </div>
        <div class="ticket-body">
            <div class="ticket-route">
                <div><div class="big">${b.train.dep}</div><b>${b.train.from}</b></div>
                <div>🚆<br><small>${b.train.duration}</small></div>
                <div><div class="big">${b.train.arr}</div><b>${b.train.to}</b></div>
            </div>
            <div class="ticket-details">
                <div class="detail"><small>Journey Date</small><b>${b.date}</b></div>
                <div class="detail"><small>Coach / Seat</small><b>S1 / ${b.seat}</b></div>
                <div class="detail"><small>Amount</small><b>₹${b.amount}</b></div>
            </div>
            <h3 style="margin:25px 0 10px">Passengers</h3>
            <table class="table">
                <tr><th>Name</th><th>Age</th><th>Gender</th><th>Status</th></tr>
                ${b.passengers.map(p => `<tr><td>${p.name}</td><td>${p.age}</td><td>${p.gender}</td><td>CNF / ${b.seat}</td></tr>`).join("")}
            </table>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:25px">
                <div><b>Travel with confidence.</b><p class="muted">Carry a valid photo ID during your journey.</p></div>
                <div class="qr"></div>
            </div>
        </div>
    `;
}

/* ============ BOOKING HISTORY ============ */
function renderHistory() {
    const b = get("bookings") || [];
    const e = document.getElementById("history");
    if (!e) return;

    e.innerHTML = b.length ? b.map((x, i) => `
        <div class="panel" style="margin-bottom:12px">
            <div class="section-head">
                <div><b>${x.train.name}</b><p class="muted">${x.pnr} • ${x.date}</p></div>
                <span class="status">${x.status}</span>
            </div>
            <p>${x.train.from} → ${x.train.to} • ${x.passengers.length} passenger(s)</p>
            <button class="btn btn-light" onclick='viewBooking(${i})'>View Ticket</button>
            <button class="btn btn-outline" onclick='cancelBooking(${i})'>Cancel</button>
        </div>
    `).join("") : '<div class="panel empty">No bookings yet.</div>';
}

function viewBooking(i) {
    const b = (get("bookings") || [])[i];
    if (!b) return;
    set("currentBooking", b);
    location.href = "ticket.html";
}

function cancelBooking(i) {
    let b = get("bookings") || [];
    if (confirm("Cancel this booking?")) {
        b[i].status = "CANCELLED";
        set("bookings", b);
        renderHistory();
        toast("Booking cancelled. Refund initiated.");
    }
}
/* ============ PNR LOOKUP (FULL ENHANCED) ============ */
function renderPNR() {
    const e = document.getElementById("pnrResult");
    const f = document.getElementById("pnrForm");
    if (!e || !f) return;

    e.innerHTML = "";

    f.onsubmit = (ev) => {
        ev.preventDefault();
        const p = document.getElementById("pnrInput").value.trim().toUpperCase();

        if (!p) {
            toast("Please enter PNR number");
            return;
        }

        const b = (get("bookings") || []).find(x => x.pnr.toUpperCase() === p);

        if (!b) {
            e.innerHTML = `
                <div class="alert" style="animation:fadeInUp 0.4s ease">
                    <b>❌ PNR Not Found</b><br>
                    <small>PNR <b>${p}</b> is not available in this demo system.</small>
                </div>
            `;
            return;
        }

        /* === Status colors === */
        const statusColor = b.status === "CONFIRMED" ? "#087c4e"
                          : b.status === "CANCELLED" ? "#e5484d"
                          : "#8a5700";

        const statusBg = b.status === "CONFIRMED" ? "#e9fff5"
                       : b.status === "CANCELLED" ? "#ffe9ea"
                       : "#fff7e8";

        const statusEmoji = b.status === "CONFIRMED" ? "✅"
                          : b.status === "CANCELLED" ? "❌"
                          : "⏳";

        /* === Chart status === */
        const chartStatus = b.status === "CONFIRMED" ? "CHART PREPARED" : "CHART NOT PREPARED";

        /* === Booking date === */
        const bookingDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            .toISOString().slice(0, 10);

        /* === Class & Coach === */
        const travelClass = (b.train.classes && b.train.classes[0]) || "3A";
        const coach = travelClass === "1A" || travelClass === "2A" || travelClass === "3A" ? "A1"
                    : travelClass === "CC" || travelClass === "EC" ? "C1"
                    : "S1";

        /* === GST === */
        const gst = Math.round(b.amount * 0.05);
        const total = b.amount + gst;

        /* === Coach Position === */
        const coachOrder = ["LOCO", "GEN", "S1", "S2", "S3", "B1", "B2", "A1", "A2", "H1", "SLR"];
        const currentCoachIndex = coachOrder.indexOf(coach) !== -1 ? coachOrder.indexOf(coach) : 4;

        /* === Journey Timeline (fake) === */
        const timeline = [
            { station: b.train.from, time: b.train.dep, status: "Departed", color: "#087c4e" },
            { station: "Mathura Jn", time: "18:30", status: "Departed", color: "#087c4e" },
            { station: "Agra Cantt", time: "19:45", status: "Departed", color: "#087c4e" },
            { station: "Gwalior", time: "21:10", status: "Arrived", color: "#ff7a18" },
            { station: "Jhansi", time: "22:25", status: "Upcoming", color: "#667085" },
            { station: "Bhopal", time: "02:15", status: "Upcoming", color: "#667085" },
            { station: b.train.to, time: b.train.arr, status: "Upcoming", color: "#667085" }
        ];

        e.innerHTML = `
            <div class="panel pnr-card" style="padding:0;overflow:hidden">

                <!-- ===== HEADER ===== -->
                <div class="pnr-header">
                    <div>
                        <div class="pnr-label">PNR NUMBER</div>
                        <div class="pnr-number">${b.pnr}</div>
                    </div>
                    <div style="text-align:right">
                        <span class="pnr-status-badge" style="background:${statusBg};color:${statusColor}">
                            ${statusEmoji} ${b.status}
                        </span>
                        <div class="pnr-chart">📋 ${chartStatus}</div>
                    </div>
                </div>

                <!-- ===== TRAIN INFO ===== -->
                <div class="pnr-section">
                    <div style="display:flex;align-items:center;gap:15px;flex-wrap:wrap">
                        <div style="font-size:42px">🚆</div>
                        <div style="flex:1">
                            <div class="pnr-train-name">${b.train.name}</div>
                            <div class="muted">Train No. ${b.train.id} • Runs: ${b.train.days}</div>
                        </div>
                        <div style="text-align:right">
                            <div class="muted">Travel Class</div>
                            <div style="font-size:22px;font-weight:900;color:var(--orange)">${travelClass}</div>
                        </div>
                    </div>
                </div>

                <!-- ===== ROUTE ===== -->
                <div class="pnr-section">
                    <div class="ticket-route" style="text-align:center">
                        <div>
                            <div class="big">${b.train.dep}</div>
                            <b>${b.train.from}</b>
                        </div>
                        <div>
                            <div style="font-size:24px">→</div>
                            <small>${b.train.duration}</small>
                        </div>
                        <div>
                            <div class="big">${b.train.arr}</div>
                            <b>${b.train.to}</b>
                        </div>
                    </div>
                </div>

                <!-- ===== DETAILS GRID ===== -->
                <div class="pnr-section">
                    <div class="ticket-details">
                        <div class="detail"><small>Journey Date</small><b>${b.date}</b></div>
                        <div class="detail"><small>Booking Date</small><b>${bookingDate}</b></div>
                        <div class="detail"><small>Coach / Seat</small><b>${coach} / ${b.seat}</b></div>
                        <div class="detail"><small>Berth Type</small><b>Lower</b></div>
                        <div class="detail"><small>Quota</small><b>GENERAL (GN)</b></div>
                        <div class="detail"><small>Payment Mode</small><b>${b.payment || "UPI"}</b></div>
                    </div>
                </div>

                <!-- ===== COACH POSITION ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">🚋 Coach Position</h3>
                    <div class="coach-position">
                        ${coachOrder.map((c, i) => `
                            <div class="coach-box ${i === currentCoachIndex ? "active" : ""}">
                                ${c}
                            </div>
                        `).join("")}
                    </div>
                    <p class="muted" style="text-align:center;margin-top:10px">
                        Aapka coach: <b style="color:var(--orange)">${coach}</b> (highlighted)
                    </p>
                </div>

                <!-- ===== LIVE RUNNING STATUS ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">📍 Live Running Status</h3>
                    <div class="alert success" style="margin-top:10px">
                        <b>✅ Train is running ON TIME</b><br>
                        <small>Last updated: Just now • Next station: <b>Gwalior</b> (arriving in 15 mins)</small>
                    </div>
                </div>

                <!-- ===== JOURNEY TIMELINE ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">📅 Journey Timeline</h3>
                    <div class="timeline">
                        ${timeline.map((t, i) => `
                            <div class="timeline-item">
                                <div class="timeline-dot" style="background:${t.color}"></div>
                                ${i < timeline.length - 1 ? '<div class="timeline-line"></div>' : ''}
                                <div class="timeline-content">
                                    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:5px">
                                        <b>${t.station}</b>
                                        <span class="muted">${t.time}</span>
                                    </div>
                                    <div style="font-size:12px;color:${t.color};font-weight:800;margin-top:3px">
                                        ${t.status}
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- ===== PASSENGERS ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">👥 Passenger Details</h3>
                    <table class="table" style="margin-top:10px">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Berth</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${b.passengers.map((p, i) => `
                                <tr>
                                    <td><b>${i + 1}</b></td>
                                    <td><b>${p.name}</b></td>
                                    <td>${p.age}</td>
                                    <td>${p.gender}</td>
                                    <td>${p.berth || "Any"}</td>
                                    <td><span class="status" style="background:#e9fff5;color:#087c4e">CNF / ${b.seat}</span></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <!-- ===== FARE BREAKDOWN ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">💰 Fare Breakdown</h3>
                    <div style="margin-top:12px">
                        <div class="fare-row">
                            <span>Base Fare (${b.passengers.length} passenger${b.passengers.length > 1 ? "s" : ""})</span>
                            <b>₹${b.amount}</b>
                        </div>
                        <div class="fare-row">
                            <span>Reservation Charges</span>
                            <b>₹0</b>
                        </div>
                        <div class="fare-row">
                            <span>GST (5%)</span>
                            <b>₹${gst}</b>
                        </div>
                        <div class="fare-row total">
                            <b>Total Paid</b>
                            <b style="color:var(--green);font-size:20px">₹${total}</b>
                        </div>
                    </div>
                </div>

                <!-- ===== MEAL PREFERENCE ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">🍽️ Meal Preference</h3>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:10px">
                        <label class="feature" style="flex:1;cursor:pointer;text-align:center">
                            <input type="radio" name="meal" value="Veg" style="margin-right:6px">
                            🥗 Veg Meal
                        </label>
                        <label class="feature" style="flex:1;cursor:pointer;text-align:center">
                            <input type="radio" name="meal" value="NonVeg" style="margin-right:6px">
                            🍗 Non-Veg Meal
                        </label>
                        <label class="feature" style="flex:1;cursor:pointer;text-align:center">
                            <input type="radio" name="meal" value="None" checked style="margin-right:6px">
                            ❌ No Meal
                        </label>
                    </div>
                    <button class="btn btn-light" style="margin-top:10px;width:100%"
                        onclick="toast('Meal preference saved!')">
                        Save Preference
                    </button>
                </div>

                <!-- ===== BERTH UPGRADE ===== -->
                <div class="pnr-section">
                    <h3 class="pnr-heading">🛏️ Berth Upgrade</h3>
                    <div class="alert" style="margin-top:10px">
                        <b>💡 Upgrade Available</b><br>
                        <small>Aap apni seat ko <b>Lower Berth</b> me upgrade kar sakte hain ₹150 extra me.</small>
                    </div>
                    <button class="btn btn-primary" style="margin-top:10px;width:100%"
                        onclick="toast('Upgrade request sent! 💺')">
                        🆙 Upgrade to Lower Berth (₹150)
                    </button>
                </div>

                <!-- ===== ACTION BUTTONS ===== -->
                <div class="pnr-section" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
                    <button class="btn btn-primary" onclick="window.print()">🖨️ Print PNR</button>
                    <button class="btn btn-blue" onclick="viewBookingByPNR('${b.pnr}')">🎫 View Full Ticket</button>
                    <button class="btn btn-light" onclick="toast('E-Ticket sent to your email 📧')">
                        📧 Email Ticket
                    </button>
                    <button class="btn btn-light" onclick="toast('SMS sent to your mobile 📱')">
                        📱 SMS Alert
                    </button>
                    ${b.status === "CONFIRMED" ? `
                        <button class="btn btn-outline" onclick="cancelBookingByPNR('${b.pnr}')">
                            ❌ Cancel Booking
                        </button>
                    ` : ""}
                </div>

                <!-- ===== HELPLINE ===== -->
                <div class="pnr-section" style="background:#071a35;color:#fff;text-align:center">
                    <h3 style="color:#fff">📞 24x7 Helpline</h3>
                    <p style="margin-top:8px;color:#c9d7e8">
                        Railway Helpline: <b style="color:#ff9a42">139</b> •
                        IRCTC Support: <b style="color:#ff9a42">14646</b>
                    </p>
                    <p class="muted" style="margin-top:5px;color:#8899aa;font-size:12px">
                        This is a demo PNR. For real bookings, visit irctc.co.in
                    </p>
                </div>

                <!-- ===== QR + WARNING ===== -->
                <div class="pnr-section" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px;background:#f5f8fc">
                    <div>
                        <b>⚠️ Important Instructions</b>
                        <p class="muted" style="margin-top:5px">
                            Carry a valid photo ID (Aadhaar, PAN, Driving License) during your journey.
                            Reach station 30 mins before departure.
                        </p>
                    </div>
                    <div class="qr"></div>
                </div>

            </div>
        `;
    };
}

/* ============ PNR Action Helpers ============ */
function viewBookingByPNR(pnr) {
    const bookings = get("bookings") || [];
    const index = bookings.findIndex(x => x.pnr === pnr);
    if (index === -1) {
        toast("Booking not found");
        return;
    }
    set("currentBooking", bookings[index]);
    location.href = "ticket.html";
}

function cancelBookingByPNR(pnr) {
    let bookings = get("bookings") || [];
    const index = bookings.findIndex(x => x.pnr === pnr);
    if (index === -1) {
        toast("Booking not found");
        return;
    }
    if (confirm("Are you sure you want to cancel this booking?")) {
        bookings[index].status = "CANCELLED";
        set("bookings", bookings);
        toast("Booking cancelled. Refund initiated. 💸");
        setTimeout(() => location.reload(), 1000);
    }
}

/* ============ INIT (Page Load) ============ */
document.addEventListener("DOMContentLoaded", () => {
    setupNav();
    fillStations();
    renderTrains();
    renderDetails();
    renderSeats();
    renderPayment();
    renderTicket();
    renderHistory();
    renderPNR();

    const d = document.getElementById("date");
    if (d && !d.value) d.value = new Date().toISOString().slice(0, 10);

    const f = document.getElementById("searchForm");
    if (f) f.onsubmit = trainSearch;

    const a = document.getElementById("addPassenger");
    if (a) a.onclick = addPassenger;

    const sp = document.getElementById("savePassengers");
    if (sp) sp.onclick = savePassengers;

    const cs = document.getElementById("confirmSeats");
    if (cs) cs.onclick = confirmSeats;

    const pay = document.getElementById("payNow");
    if (pay) pay.onclick = payNow;
});