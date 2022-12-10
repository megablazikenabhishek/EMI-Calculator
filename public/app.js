const form = document.querySelector("form");
const btn = document.querySelector(".block");
const hloan = document.querySelector(".hloan");
const cloan = document.querySelector(".cloan");
const ploan = document.querySelector(".ploan");
const year = document.querySelector(".year");
const month = document.querySelector(".month");
const display = document.getElementById("name");
const main = document.querySelector(".main");

const loan_amount = document.querySelector(".amount");
const intrest_rate = document.querySelector(".intrest_val");
const tenure_data = document.querySelector(".tenure");

let curr = {
    name: "Home Loan",
    tenure_type: "year",
    tenure_val: 1, 
    amount: null,
    intrest: null,
    tenure: null
};

//set up array of names for loans
const loan = [
    {
        name: "Home Loan",
        type: 1
    },{
        name: "Car Loan",
        type: 2
    },{
        name: "Personal Loan",
        type: 3
    }
];
const tenure = [
    {
        name: "year",
        val: 1
    },{
        name: "month",
        val: 0
    }
]

const setDefault = ()=>{
    hloan.classList.remove("setNormal");
    cloan.classList.remove("setNormal");
    ploan.classList.remove("setNormal");

    hloan.classList.add("setDefault");
    cloan.classList.add("setDefault");
    ploan.classList.add("setDefault");
}
hloan.addEventListener("click", ()=>{
    setDefault();
    hloan.classList.add("setNormal");
    curr.name = loan[0].name;
    display.textContent = `Enter the ${curr.name}`;
});
cloan.addEventListener("click", ()=>{
    setDefault();
    cloan.classList.add("setNormal");
    curr.name = loan[1].name;
    display.textContent = `Enter the ${curr.name}`;
});
ploan.addEventListener("click", ()=>{
    setDefault();
    ploan.classList.add("setNormal");
    curr.name = loan[2].name;
    display.textContent = `Enter the ${curr.name}`;
});

const setDefault1 = ()=>{
    year.classList.remove("setNormal");
    month.classList.remove("setNormal");
    year.classList.add("setDefault");
    year.classList.add("setDefault");
}
year.addEventListener("click", (e)=>{
    e.preventDefault();
    setDefault1();
    year.classList.add("setNormal");
    curr.tenure_type = tenure[0].name;
    curr.tenure_val = tenure[0].val;
})
month.addEventListener("click", (e)=>{
    e.preventDefault();
    setDefault1();
    month.classList.add("setNormal");
    curr.tenure_type = tenure[1].name;
    curr.tenure_val = tenure[1].val;
})

//imp
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    getData();
})
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    getData();
})
const getData = ()=>{
    if(checkEmpty()){
        let toDelete= document.querySelector(".result");
        if(toDelete)
            toDelete.remove();

        curr.amount = loan_amount.value;
        curr.intrest = intrest_rate.value;
        curr.tenure = tenure_data.value;

        let tenure_v;
        tenure.forEach((i)=>{
            if(i.name==curr.tenure_type)
                tenure_v = i.val;
        })
        var raw = JSON.stringify({
            "sucess": true,
            "data": {
                "name": curr.name,
                "loan_amount": Number(curr.amount),
                "intrest_rate": Number(curr.intrest),
                "tenure": {
                    "tenure_type": curr.tenure_type,
                    "type_val": Number(tenure_v),
                    "tenure_data": Number(curr.tenure)
                }
            }
        });
        // console.log(curr.amount, curr.intrest, tenure_v, curr.tenure_val, );   
        
        //         var raw = JSON.stringify({
        //   "sucess": true,
        //   "data": {
        //     "name": "Car Loan",
        //     "loan_amount": Number(curr.amount),
        //     "intrest_rate": Number(curr.intrest),
        //     "tenure": {
        //       "tenure_type": "month",
        //       "type_val": Number(tenure_v),
        //       "tenure_data": Number(curr.tenure)
        //     }
        //   }
        // });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        // console.log(raw);

        if(curr.name==="Home Loan"){
            fetch("/", requestOptions)
            .then(response => response.json())
            .then((result) => {
                // console.log(result);
                if(result.success===false)
                    alert("Invalid Input from server!!");
                else
                    displayResult(result);
            })
            .catch(error => console.log('error', error));
        }
        else if(curr.name === "Car Loan"){
            fetch("/car", requestOptions)
            .then(response => response.json())
            .then((result) => {
                // console.log(result);
                if(result.success===false)
                    alert("Invalid Input from server!!");
                else
                    displayResult(result);
            })
            .catch(error => console.log('error', error));
        }else{
            fetch("/personal", requestOptions)
            .then(response => response.json())
            .then((result) => {
                // console.log(result);
                if(result.success===false)
                    alert("Invalid Input from server!!");
                else
                    displayResult(result);
            })
            .catch(error => console.log('error', error));
        }
    }
    else{
        alert("Invalid Input!!");
    }
}
const checkEmpty = ()=>{
    if(loan_amount.value==""||intrest_rate.value==""||tenure_data.value=="")
        return false;
    else    
        return true;

}

//fetching
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//display
const displayResult = (result)=>{
    console.log(result);
    let {emi, intrest, total} = result;
    // console.log(emi, intrest, total);

    let elmt = document.createElement("div");
    elmt.classList.add("result");
    elmt.innerHTML = `
        <div class="result-part1">
          <div class="emi">
            <h3>Loan EMI</h3>
            <h3>${emi}/-</h3>
          </div>
          <div class="intrest">
            <h3>
              intrest
            </h3>
            <h3>${intrest}/-</h3>
          </div>
        </div>
        <div class="total">
          <h3 style="margin-bottom: 0;">total</h3>
          <h3 style="margin-top: 0;">(principle+payable)</h3>
          <h3>${total}/-</h3>
        </div>
    `;
    // console.log(main.innerHTML);
    main.appendChild(elmt);
}
