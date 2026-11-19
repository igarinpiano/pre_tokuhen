
let tab = document.getElementById("tab");
let tr = document.getElementById("tr");
let tabbody = document.getElementById("tabbody");
let right = document.getElementById("m-right");
let left = document.getElementById("m-left");
let date = document.getElementById("date");
let koza = document.getElementById("koza");
let kumi = document.getElementById("kumi");


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
        "11.30",
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
        "12.01",
        [3,0,10,1], //1/A
        [3,0,10,1], //2/B
        [12,15,9,1], //3/B
        [7,15,8,0], //4/C
        [8,15,10,0], //5/O
        [7,1,8,15], //6/M
        [8,1,7,15], //7/L
        [8,1,7,15], //8/K
    ],
]

function add(i,content,doSpan){
    const tr1 = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
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


//for(let i=1; i<=3; i++){
//    add(i,classes[dat[0][1][i-1]])
//}
//add(0,"SHR")
//for(let i=4; i<=6; i++){
//    add(i,classes[dat[0][1][i-1]])
//}

function cal(){

    clear()
    let kumi_i = kumi.value;
    let koza_i = koza_val.indexOf(koza.value) + 1;
    
    date.textContent = dat[0][0]
    add(1,classes[dat[0][koza_i][0]],false)
    if(true){
        add(2,classes[dat[0][kumi_i][1]],true)
    }
    add(0,classes[20],false)
    add(4,classes[dat[0][koza_i][2]],false)
    add(5,classes[dat[0][kumi_i][3]],true)
}

document.addEventListener("click",()=>{
    cal();
})

cal();

//console.log("A")
