/* =========================================
   RAILSETU - Train Status (Simple Working)
   ========================================= */

let liveInterval = null;
let currentTrainId = null;
let currentIndex = 1;
let isPaused = false;

/* ===== Routes Data ===== */
const routes = {
    "12951": [
        { name: "New Delhi", code: "NDLS", arr: "--", dep: "16:55", dist: 0, pf: 5 },
        { name: "Mathura Jn", code: "MTJ", arr: "18:20", dep: "18:22", dist: 141, pf: 2 },
        { name: "Agra Cantt", code: "AGC", arr: "19:05", dep: "19:07", dist: 195, pf: 3 },
        { name: "Gwalior", code: "GWL", arr: "20:23", dep: "20:25", dist: 305, pf: 1 },
        { name: "Jhansi", code: "JHS", arr: "21:40", dep: "21:45", dist: 415, pf: 4 },
        { name: "Bhopal Jn", code: "BPL", arr: "01:30", dep: "01:40", dist: 703, pf: 2 },
        { name: "Itarsi", code: "ET", arr: "03:15", dep: "03:20", dist: 795, pf: 3 },
        { name: "Bhusaval", code: "BSL", arr: "07:35", dep: "07:40", dist: 1098, pf: 1 },
        { name: "Surat", code: "ST", arr: "12:45", dep: "12:50", dist: 1424, pf: 4 },
        { name: "Mumbai Central", code: "MMCT", arr: "08:35", dep: "--", dist: 1384, pf: 2 }
    ],
    "12017": [
        { name: "New Delhi", code: "NDLS", arr: "--", dep: "06:45", dist: 0, pf: 12 },
        { name: "Ghaziabad", code: "GZB", arr: "07:15", dep: "07:17", dist: 45, pf: 3 },
        { name: "Meerut City", code: "MTC", arr: "08:05", dep: "08:07", dist: 110, pf: 2 },
        { name: "Muzaffarnagar", code: "MZN", arr: "08:50", dep: "08:52", dist: 175, pf: 1 },
        { name: "Roorkee", code: "RK", arr: "10:15", dep: "10:17", dist: 280, pf: 3 },
        { name: "Haridwar Jn", code: "HW", arr: "10:55", dep: "11:00", dist: 320, pf: 5 },
        { name: "Dehradun", code: "DDN", arr: "12:35", dep: "--", dist: 375, pf: 1 }
    ],
    "52451": [
        { name: "Kalka", code: "KLK", arr: "--", dep: "05:30", dist: 0, pf: 1 },
        { name: "Taksal", code: "TSL", arr: "05:50", dep: "05:52", dist: 8, pf: 1 },
        { name: "Gumman", code: "GMM", arr: "06:10", dep: "06:12", dist: 14, pf: 1 },
        { name: "Koti", code: "KOTI", arr: "06:40", dep: "06:42", dist: 25, pf: 1 },
        { name: "Sonwara", code: "SWO", arr: "07:05", dep: "07:07", dist: 33, pf: 1 },
        { name: "Dharampur", code: "DMP", arr: "07:35", dep: "07:37", dist: 42, pf: 1 },
        { name: "Barog", code: "BOG", arr: "08:15", dep: "08:17", dist: 55, pf: 1 },
        { name: "Solan", code: "SOL", arr: "08:40", dep: "08:42", dist: 60, pf: 1 },
        { name: "Shimla", code: "SML", arr: "10:15", dep: "--", dist: 96, pf: 1 }
    ]
};

function getRoute(trainId) {
    if (routes[trainId]) return routes[trainId];
    const t = (typeof trains !== "undefined") ? trains.find(x => x.id === trainId) : null;
    if (!t) return null;
    return [
        { name: t.from, code: "SRC", arr: "--", dep: t.dep, dist: 0, pf: 3 },
        { name: "Junction 1", code: "JN1", arr: "10:00", dep: "10:05", dist: 150, pf: 2 },
        { name: "Junction 2", code: "JN2", arr: "12:30", dep: "12:35", dist: 350, pf: 1 },
        { name: "Junction 3", code: "JN3", arr: "15:00", dep: "15:05", dist: 550, pf: 4 },
        { name: t.to, code: "DST", arr: t.arr, dep: "--", dist: 800, pf: 1 }
    ];
}

function trackTrain() {
    const input = document.getElementById("trainInput").value.trim();
    if (!input) { if (typeof toast === "function") toast("Train number daalein"); return; }
    const t = (typeof trains !== "undefined") ? trains.find(x => x.id === input) : null;
    if (!t) {
        document.getElementById("status").innerHTML =
            '<div class="alert"><b>❌ Train Not Found</b><br>Try: 12951, 12017, 52451, 12301</div>';
        return;
    }
    currentTrainId = t.id;
    currentIndex = 1;
    isPaused = false;
    renderUI();
    if (liveInterval) clearInterval(liveInterval);
    liveInterval = setInterval(() => {
        if (isPaused) return;
        const route = getRoute(currentTrainId);
        if (currentIndex < route.length - 1) {
            currentIndex++;
            if (typeof toast === "function") toast("🚆 Pahunchi: " + route[currentIndex].name);
            renderUI();
        } else {
            clearInterval(liveInterval);
            if (typeof toast === "function") toast("🎉 Destination reached!");
        }
    }, 5000);
}

function quickTrack(id) {
    document.getElementById("trainInput").value = id;
    trackTrain();
}

function togglePause() {
    isPaused = !isPaused;
    if (typeof toast === "function") toast(isPaused ? "⏸️ Paused" : "▶️ Resumed");
    renderUI();
}

function renderUI() {
    const t = (typeof trains !== "undefined") ? trains.find(x => x.id === currentTrainId) : null;
    const route = getRoute(currentTrainId);
    if (!t || !route) return;

    const cur = route[currentIndex];
    const next = route[currentIndex + 1] || route[route.length - 1];
    const progress = Math.round((currentIndex / (route.length - 1)) * 100);

    const delays = [0, 0, 5, 10, 15];
    const delay = delays[Math.floor(Math.random() * delays.length)];
    const statusText = delay === 0 ? "ON TIME" : "DELAYED " + delay + "m";
    const statusColor = delay === 0 ? "#087c4e" : "#e5484d";
    const statusBg = delay === 0 ? "#e9fff5" : "#ffe9ea";

    const clock = new Date().toTimeString().slice(0, 8);
    const eta = Math.floor(Math.random() * 13) + 2;
    const speed = Math.floor(Math.random() * 40) + 80;

    document.getElementById("status").innerHTML = `
        <div class="panel" style="padding:0;overflow:hidden">

            <div style="background:linear-gradient(90deg,#e5484d,#ff7a18);color:#fff;padding:10px 20px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-size:13px;font-weight:900">
                <span style="width:10px;height:10px;border-radius:50%;background:#fff"></span>
                LIVE TRACKING
                <span style="margin-left:auto">🕐 ${clock}</span>
                <span style="background:rgba(255,255,255,0.25);padding:4px 10px;border-radius:999px;cursor:pointer" onclick="togglePause()">
                    ${isPaused ? "▶️ Resume" : "⏸️ Pause"}
                </span>
            </div>

            <div style="background:linear-gradient(135deg,#071a35,#0c2d58);color:#fff;padding:25px;display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap">
                <div>
                    <div style="font-size:12px;color:#ffd19e;font-weight:800;letter-spacing:1.5px">TRAIN STATUS</div>
                    <div style="font-size:26px;font-weight:900;margin-top:5px">${t.name}</div>
                    <div style="font-size:14px;color:#c9d7e8;margin-top:3px">Train No. ${t.id}</div>
                </div>
                <div style="text-align:right">
                    <span style="display:inline-block;padding:8px 18px;border-radius:999px;background:${statusBg};color:${statusColor};font-weight:900;font-size:14px">
                        ${delay === 0 ? "✅" : "⚠️"} ${statusText}
                    </span>
                    <div style="font-size:13px;color:#c9d7e8;margin-top:6px">📍 ${cur.name} (${cur.code})</div>
                </div>
            </div>

            <div style="padding:22px;border-bottom:1px solid var(--border)">
                <h3 style="font-size:16px;font-weight:900;margin-bottom:15px">📍 Live Position</h3>
                <div style="display:flex;gap:15px;align-items:center;justify-content:center;flex-wrap:wrap">
                    <div style="flex:1;min-width:150px;text-align:center;padding:15px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:11px;color:#667085;font-weight:800;text-transform:uppercase">Current</div>
                        <div style="font-size:18px;font-weight:900;margin-top:5px">${cur.name}</div>
                        <div style="font-size:12px;color:#ff7a18;font-weight:800;margin-top:3px">${cur.code} • PF ${cur.pf}</div>
                    </div>
                    <div style="font-size:28px;color:#ff7a18;font-weight:900">→</div>
                    <div style="flex:1;min-width:150px;text-align:center;padding:15px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:11px;color:#667085;font-weight:800;text-transform:uppercase">Next (ETA ${eta}m)</div>
                        <div style="font-size:18px;font-weight:900;margin-top:5px">${next.name}</div>
                        <div style="font-size:12px;color:#ff7a18;font-weight:800;margin-top:3px">${next.code} • PF ${next.pf}</div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px">
                    <div style="text-align:center;padding:12px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:18px">⚡</div>
                        <div style="font-size:18px;font-weight:900">${speed}</div>
                        <div style="font-size:10px;color:#667085;font-weight:800;text-transform:uppercase">km/h</div>
                    </div>
                    <div style="text-align:center;padding:12px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:18px">🟢</div>
                        <div style="font-size:18px;font-weight:900">GREEN</div>
                        <div style="font-size:10px;color:#667085;font-weight:800;text-transform:uppercase">Signal</div>
                    </div>
                    <div style="text-align:center;padding:12px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:18px">🛤️</div>
                        <div style="font-size:18px;font-weight:900">${cur.dist}</div>
                        <div style="font-size:10px;color:#667085;font-weight:800;text-transform:uppercase">km</div>
                    </div>
                    <div style="text-align:center;padding:12px;background:#f5f8fc;border-radius:12px;border:2px solid var(--border)">
                        <div style="font-size:18px">🎯</div>
                        <div style="font-size:18px;font-weight:900">${progress}%</div>
                        <div style="font-size:10px;color:#667085;font-weight:800;text-transform:uppercase">Done</div>
                    </div>
                </div>
            </div>

            <div style="padding:22px;border-bottom:1px solid var(--border)">
                <h3 style="font-size:16px;font-weight:900;margin-bottom:15px">📊 Journey Progress</h3>
                <div style="position:relative;height:14px;background:#eef4fb;border-radius:999px;margin:20px 0">
                    <div style="height:100%;background:linear-gradient(90deg,#0b63ce,#ff7a18);border-radius:999px;width:${progress}%;transition:width 1s"></div>
                    <div style="position:absolute;top:-16px;left:${progress}%;transform:translateX(-50%);font-size:22px;transition:left 1s">🚆</div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:#667085">
                    <span>${route[0].name}</span>
                    <span><b>${progress}%</b></span>
                    <span>${route[route.length - 1].name}</span>
                </div>
            </div>

            <div style="padding:22px;border-bottom:1px solid var(--border)">
                <h3 style="font-size:16px;font-weight:900;margin-bottom:15px">🚉 Station Status</h3>
                ${route.map((s, i) => {
                    let cls = "upcoming";
                    let txt = "Upcoming";
                    let icon = "⚪";
                    if (i < currentIndex) { cls = "departed"; txt = "Departed"; icon = "✅"; }
                    else if (i === currentIndex) { cls = "current"; txt = "Current"; icon = "🟠"; }
                    const bg = cls === "current" ? "#fff7e8" : cls === "departed" ? "#eafff5" : "#f5f8fc";
                    const brd = cls === "current" ? "#ff7a18" : cls === "departed" ? "#087c4e" : "#c8d5e4";
                    return `
                        <div style="display:flex;gap:12px;align-items:center;padding:12px 15px;border-radius:10px;background:${bg};border-left:4px solid ${brd};margin-bottom:6px">
                            <div style="font-size:18px">${icon}</div>
                            <div style="flex:1">
                                <div style="font-weight:800;font-size:14px">${s.name} <span style="color:#667085;font-weight:400">(${s.code})</span></div>
                                <div style="font-size:12px;color:#667085;margin-top:3px">
                                    Arr: <b>${s.arr}</b> • Dep: <b>${s.dep}</b> • ${s.dist} km • PF ${s.pf}
                                </div>
                            </div>
                            <div style="font-size:11px;font-weight:900;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:#fff;border:1px solid #dbe4ef">${txt}</div>
                        </div>
                    `;
                }).join("")}
            </div>

            <div style="padding:22px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
                <button class="btn btn-primary" onclick="renderUI()">🔄 Refresh</button>
                <button class="btn btn-light" onclick="if(typeof toast==='function')toast('SMS activated 📱')">📱 SMS Alerts</button>
                <button class="btn btn-light" onclick="window.print()">🖨️ Print</button>
            </div>

            <div style="padding:22px;background:#071a35;color:#fff;text-align:center">
                <h3 style="color:#fff">📞 Helpline</h3>
                <p style="margin-top:8px;color:#c9d7e8">Railway: <b style="color:#ff9a42">139</b> • IRCTC: <b style="color:#ff9a42">14646</b></p>
            </div>

        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const inp = document.getElementById("trainInput");
    if (inp) {
        inp.addEventListener("keypress", (e) => {
            if (e.key === "Enter") trackTrain();
        });
    }
});

window.addEventListener("beforeunload", () => {
    if (liveInterval) clearInterval(liveInterval);
});