const fs = require("fs");

const mat = [];
for(let i = 0; i<20; i++) {
    mat[i] = [];
}

function arrangeArrival(num, mat) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num - i - 1; j++) {
            if (mat[j][1] > mat[j + 1][1]) {
                for (let k = 0; k < 5; k++) {
                    let temp = mat[j][k];
                    mat[j][k] = mat[j + 1][k];
                    mat[j + 1][k] = temp;
                }
            }
        }
    }
}

function completionTime(num, mat) {
    let temp, val = -1;
    mat[0][3] = mat[0][1] + mat[0][2];
    mat[0][5] = mat[0][3] - mat[0][1];
    mat[0][4] = mat[0][5] - mat[0][2];

    for (let i = 1; i < num; i++) {
        temp = mat[i - 1][3];//11
        let low = mat[i][2];//2

        for (let j = i; j < num; j++) {
            if (temp >= mat[j][1] && low >= mat[j][2]) {
                low = mat[j][2];
                val = j;
            }
        }
        mat[val][3] = temp + mat[val][2];
        mat[val][5] = mat[val][3] - mat[val][1];
        mat[val][4] = mat[val][5] - mat[val][2];
        for (let k = 0; k < 6; k++) {
            let tem = mat[val][k];
            mat[val][k] = mat[i][k];
            mat[i][k] = tem;
        }
    }
    for (let i = 0; i < num; i++) {
        for (let j = i+1; j < num -i -1; j++) {
            if (mat[j][2] == mat[i][2]) {
            for (let k = 0; k < 5; k++) {
                let tg = mat[j][k];
                mat[j][k]=mat[i][k];
                mat[i][k] = tg;
            }
        }
        }
    }
}

function readFromFile() {
    let list = [];
    let data = fs.readFileSync("input.txt", {encoding:'utf8', flag:'r'});
    let strAr = data.split(/\r?\n/);
    for(let i = 0; i<strAr.length; i++) {
        let pro = strAr[i].split(";");
        list[i] = {
            proId: +pro[0],
            arrTime: +pro[1],
            burTime: +pro[2]
        };
    }
    return list;
}

let num = 0;
let total = 0;
let avgWaitingTime;

let list = readFromFile();
// console.log(list);

for(let i = 0; i < list.length; i++) {
    mat[i][0]=list[i].proId;
    mat[i][1]=list[i].arrTime;
    mat[i][2]=list[i].burTime;  
}
console.log("Truoc khi lap lich");
console.log("Process ID\tArrival Time\tBurst Time");

for(let i = 0; i<list.length; i++) {
    console.log(`${list[i].proId}\t\t${list[i].arrTime}\t\t${list[i].burTime}`);
}
arrangeArrival(list.length, mat);
completionTime(list.length, mat);

console.log("Ket qua: ");
console.log("Process ID\tArrival Time\tBurst Time\tWaiting Time\tTurnaround Time");

for(let i = 0; i< list.length; i++) {
    console.log(`${mat[i][0]}\t\t${mat[i][1]}\t\t${mat[i][2]}\t\t${mat[i][4]}\t\t${mat[i][5]}`);
}

for(let i = 0; i< list.length; i++) {
    total += mat[i][4];
}

avgWaitingTime = total/(list.length);

console.log(`Thoi gian cho trung binh: ${avgWaitingTime.toFixed(3)}`);