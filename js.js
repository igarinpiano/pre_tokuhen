
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
        ["12.01",0], //header
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
        ["12.02",1], //header
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

/////////////////

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

right.addEventListener("click",()=>{
    d++;
})
left.addEventListener("click",()=>{
    d--;
})


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

    date.textContent = dat[d][0][0]

    if(dat[d][0][1] == 0){
        add(1,classes[dat[d][koza_i][0]],false)
        add(2,classes[dat[d][kumi_i][1]],true)

        add(0,classes[20],false)
        add(4,classes[dat[d][koza_i][2]],false)
        add(5,classes[dat[d][kumi_i][3]],true)

    }else if(dat[d][0][1] == 1){
        add(1,classes[dat[d][kumi_i][0]],true)

        add(3,classes[dat[d][koza_i][1]],false)
        add(0,classes[20],false)
        add(4,classes[dat[d][koza_i][2]],false)
        add(5,classes[dat[d][koza_i][3]],false)
        add(6,classes[dat[d][koza_i][4]],false)
    }else if(dat[d][0][1] == 2){
        add(1,classes[dat[d][koza_i][0]],false)
        add(2,classes[dat[d][koza_i][1]],false)
        add(3,classes[dat[d][koza_i][2]],false)
        add(0,classes[20],false)
        add(4,classes[dat[d][kumi_i][3]],true)

        add(6,classes[dat[d][koza_i][4]],false)
    }
    
}

document.addEventListener("click",()=>{
    cal();
})

cal();

//console.log("A")
