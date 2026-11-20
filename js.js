
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
const root = document.documentElement;


let koza_val=[
"a",
"b",
"c",
"o",
"n",
"m",
"l",
"k"
]

/*
type:
0: 1,23,4,56 type (most typical)
1: 12,3,4,5,6 (wed)
3: 1,2,3,45,6 (fri)
*/


let classes = [
"国語", //0

"数(1)", //1
"数(2)", //2

"理基AB", //3
"理基BC", //4
"生物基礎", //5
"地学基礎",//6
"物理",//7
"化学",//8
"生物",//9

"社ABN", //10
"社BCKL", //11
"地理", //12
"地理/政経", //13
"日本史", //14

"英語", //15

"情報",//16

"体AMO",//17
"体CKN",//18
"体BL",//19

"SHR",//20
"LHR",//21
]
const dat=[
    [
        ["11.30",0], //header
        [3,0,10,1], //1/A
        [3,0,10,1], //2/B
        [12,15,9,1], //3/B
        [7,15,8,0], //4/C
        [8,15,10,0], //5/O
        [7,1,8,15], //6/M
        [8,1,7,15], //7/L
        [8,1,7,15], //8/K
    ],
    [
        ["11.20",0], //header
        [14,15,17,0], //1/A
        [4,15,11,2], //2/B
        [4,15,11,0], //3/B
        [14,1,17,15], //4/C
        [8,1,9,15], //5/O
        [12,2,17,15], //6/M
        [8,0,11,2], //7/L
        [8,0,11,2], //8/K
    ],
    [
        ["12.2",1], //header
        [2,16,14,10,6], //1/A
        [1,16,4,10,19], //2/B
        [2,18,4,5,16], //3/B
        [0,7,16,8,13], //4/C
        [0,18,16,10,9], //5/O
        [0,12,8,7,16], //6/M
        [15,16,7,8,19], //7/L
        [15,18,7,8,16], //8/K
    ],
]




/////////////////

let d = 0;

let islightmode = false;
/////////////////

function add(i,content,doSpan,doGrayout){
    const tr1 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    if(doGrayout){
        td1.style.color = "var(--fc3)";
        td2.style.color = "var(--fc3)";
    }
    if(i==0){
        td1.textContent = "";
    }else{

    td1.textContent = String(i);
    }
    td2.textContent = content;
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
    d++;
})
left.addEventListener("click",()=>{
    d--;
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

    if(dat[d][0][1] == 0){
        add(1,classes[dat[d][koza_i][0]],false,isprev)
        add(2,classes[dat[d][kumi_i][1]],true,isprev)

        add(0,classes[20],false,isprev)
        add(4,classes[dat[d][koza_i][2]],false,isprev)
        add(5,classes[dat[d][kumi_i][3]],true,isprev)

    }else if(dat[d][0][1] == 1){
        add(1,classes[dat[d][kumi_i][0]],true,isprev)

        add(3,classes[dat[d][koza_i][1]],false,isprev)
        add(0,classes[20],false,isprev)
        add(4,classes[dat[d][koza_i][2]],false,isprev)
        add(5,classes[dat[d][koza_i][3]],false,isprev)
        add(6,classes[dat[d][koza_i][4]],false,isprev)
    }else if(dat[d][0][1] == 2){
        add(1,classes[dat[d][koza_i][0]],false,isprev)
        add(2,classes[dat[d][koza_i][1]],false,isprev)
        add(3,classes[dat[d][koza_i][2]],false,isprev)
        add(0,classes[20],false,isprev)
        add(4,classes[dat[d][kumi_i][3]],true,isprev)

        add(6,classes[dat[d][koza_i][4]],false,isprev)
    }

    cap.textContent = `${kumi.value}組 ${koza.value.toUpperCase()}講座　(下で設定)`

}

document.addEventListener("click",()=>{
    cal();
    document.cookie = `dat=${kumi.value}${koza.value}${lightmode.checked}`;
})
lightmode.addEventListener("click",()=>{
    if(lightmode.checked){
        console.log("a")
        root.style.setProperty("--bg", "#ece9d8");
        root.style.setProperty("--fc", "#000");
        root.style.setProperty("--bg2", "#aff");
        root.style.setProperty("--fc2", "#f00");
        root.style.setProperty("--fc3", "#666");
    }else{
        root.style.setProperty("--bg", "#000");
        root.style.setProperty("--fc", "#fff");
        root.style.setProperty("--bg2", "#400");
        root.style.setProperty("--fc2", "#0ff");
        root.style.setProperty("--fc3", "#aaa");
    }

})

if(document.cookie=="data=" || document.cookie==""){
    console.log("cookieない");
}else{
    console.log(document.cookie);

    let kumi_c = document.cookie[5]);
    let koza_c = document.cookie[6]);
    let lm_c = false;
    if(document.cookie.slice(7,-1)) == "true"){
        lm_c = true;
    }

    kumi.value = kumi_c;
    koza.value = koza_c;
    lightmode.checked = lm_c;


}



cal();

//console.log("A")
