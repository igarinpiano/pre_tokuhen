let tab = document.getElementById("tab");
let tr = document.getElementById("tr");
let tabbody = document.getElementById("tabbody");
let right = document.getElementById("m-right");
let left = document.getElementById("m-left");
let date = document.getElementById("date");
let koza = document.getElementById("koza");
let kumi = document.getElementById("kumi");
let cap = document.getElementById("cap");
let lightmode = document.getElementById("lightmode");
let capbar = document.getElementById("capbar");
const root = document.documentElement;


console.log(dat[0][0][0])




/////////////////

let d = 0;

/////////////////

function add(i,class_i,doSpan,doGrayout){
    const tr1 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    if(i==0){
        td1.textContent = "";
    }else{

    td1.textContent = String(i);
    }
    if(doGrayout){
        td1.style.color = "var(--fc3)";
        td2.style.color = "var(--fc3)";
    }else if(typeof class_i == "number"){
        td2.style.color = `var(--${color[class_i]}${Number(lightmode.checked)})`;
    }

    td2.textContent = typeof class_i == "number" ? classes[class_i] : class_i;
    tr1.append(td1);
    tr1.append(td2);
    tabbody.append(tr1);

    if(doSpan){
        const tr1_p = document.createElement("tr");
        const td1_p = document.createElement("td");
        const td2_p = td2.cloneNode(true);

        if(doGrayout){
            td1_p.style.color = "var(--fc3)";
            td2_p.style.color = "var(--fc3)";
        }

        td1_p.textContent = String(i+1);
        tr1_p.append(td1_p);
        tr1_p.append(td2_p);
        tabbody.append(tr1_p);

        td2.rowSpan = 2;
        td2_p.remove();
    }
}
function clear(){
    tabbody.innerHTML = "";
}

right.addEventListener("click",()=>{
    if(d < dat.length-1) d++;
})
left.addEventListener("click",()=>{
    if(d > 0) d--;
})

/////////////           today

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

let todaystr = `${month}.${day}`;

let today_i = 0;

for(let i =0;i<dat.length;i++){
    if(dat[i][0][0] == todaystr){
        today_i = i;
        break;
    }
}

////            cal

function cal(){

    clear()

    let kumi_i = kumi.value;
    let koza_i = koza_val.indexOf(koza.value) + 1;

    date.textContent = dat[d][0][0]

    let isprev = false;
    if(d < today_i){
        isprev = true;
    }

    let koza_a = dat[d][koza_i];
    let kumi_a = dat[d][kumi_i];

    // types (dat.js): per type, the blocks as [first period, length, 0 = 講座 / 1 = 組]
    types[dat[d][0][1]].forEach(([p,len,by],j)=>{
        let class_i = by == 1 ? kumi_a[j] : koza_a[j];
        add(p,class_i,len == 2,isprev)
        if(p+len-1 == 3){
            add(0,classes.indexOf("SHR"),false,isprev)
        }
    })
    if(dat[d][0][2]){
        add(0,dat[d][0][2],false,isprev)  // all-day event
    }

    cap.textContent = `${kumi.value}組 ${koza.value.toUpperCase()}講座　(下で設定)`

}

document.addEventListener("click",()=>{
    cal();
    document.cookie = `dat=${kumi.value}${koza.value}${lightmode.checked}`;
})
function updatetheme(){

    if(lightmode.checked){
        root.style.setProperty("--bg", "#ece9d8");
        root.style.setProperty("--fc", "#000");
        root.style.setProperty("--bg2", "#aff");
        root.style.setProperty("--fc2", "#f00");
        root.style.setProperty("--fc3", "#666");
        capbar.style.backgroundColor = "#ece9d8";
    }else{
        root.style.setProperty("--bg", "#000");
        root.style.setProperty("--fc", "#fff");
        root.style.setProperty("--bg2", "#400");
        root.style.setProperty("--fc2", "#0ff");
        root.style.setProperty("--fc3", "#aaa");
        capbar.style.backgroundColor = "#013e3d";
    }
}
lightmode.addEventListener("click",()=>{
    updatetheme();
})

if(document.cookie=="dat=" || document.cookie==""){
    console.log("cookieない");
}else{
    console.log(document.cookie);

    let kumi_c = document.cookie[4];
    let koza_c = document.cookie[5];
    let lm_c = false;
    if(document.cookie.slice(6) == "true"){
        lm_c = true;
    }

    if(1 <= parseInt(kumi_c,10) && parseInt(kumi_c,10) <= 8){
        kumi.value = kumi_c;
    }
    if(koza_val.indexOf(koza_c) != -1){
        koza.value = koza_c;
    }
    lightmode.checked = lm_c;


    updatetheme();
}

document.addEventListener("keydown",(e)=>{
    switch (e.key){
        case "ArrowLeft":
        case "h":
            left.click();
            break;
        case "ArrowRight":
        case "l":
            right.click();
            break;
    }
})


d = today_i;

cal();

//console.log("A")
