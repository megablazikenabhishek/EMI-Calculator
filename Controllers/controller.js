const emi = require("emi-calc");

const postHome = (req, res)=>{
    let {loan_amount, intrest_rate, tenure} = req.body.data;
    let {tenure_data} = tenure ;

    // console.log(req.body);

    if(tenure.type_val==1){
        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_year(loan_amount, intrest_rate, tenure_data);

            // console.log(calucalte_year(loan_amount, intrest_rate, tenure_data));


        if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
    else if(tenure.type_val==0){
        intrest_rate = req.body.data.intrest_rate;
        // console.log(loan_amount, intrest_rate, tenure_data);

        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_month(loan_amount, intrest_rate, tenure_data);
            
            if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
}

const postCar = (req, res)=>{
    let result;
    let {loan_amount, intrest_rate, tenure} = req.body.data;
    let {tenure_data} = tenure ;

    if(tenure.type_val==1){
        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_year(loan_amount, intrest_rate, tenure_data);

        if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
    else{
        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_month(loan_amount, intrest_rate, tenure_data);

        if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
}

const postPersonal = (req, res)=>{
    let result;
    let {loan_amount, intrest_rate, tenure} = req.body.data;
    let {tenure_data} = tenure ;

    if(tenure.type_val==1){
        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_year(loan_amount, intrest_rate, tenure_data);

        if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
    else{
        let {loan_emi, 
            total_intrest,
            total_payment,
            result} = calucalte_month(loan_amount, intrest_rate, tenure_data);

        if(!loan_emi)
            res.status(400).json({
                success:false
            });//The server cannot or will not process the request due to something that is perceived to be a client error
        else   
            res.status(201).json({
                success:true,
                "emi": loan_emi,
                "intrest": total_intrest,
                "total": total_payment,
                data: [...result]
            });
    }
}

// caluculating functions
const calucalte_year = (amount, intrest, tenure)=>{

    const result = emi(amount, 12*tenure, intrest);

    if(!result){
        return{
            success : false
        }
    }

    let loan_emi =  Math.round(Number(result[0].EMI));

    let total_intrest = 0;
    let total_payment = 0;
    result.map((i)=>{
        total_intrest += Number(i.Interest);
        total_payment += Number(i.EMI);
    })


    total_intrest = Math.round(total_intrest);
    total_payment = Math.round(total_payment);

    return {
        loan_emi, 
        total_intrest,
        total_payment,
        result
    };
}

const calucalte_month = (amount, intrest, tenure)=>{

    const result = emi(amount, tenure, intrest);
    // const result = emi(50000, 12, 5);

    // console.log(amount, tenure, intrest)

    if(!result){
        return{
            success : false
        }
    }

    let loan_emi =  Math.round(Number(result[0].EMI));

    let total_intrest = 0;
    let total_payment = 0;
    result.map((i)=>{
        total_intrest += Number(i.Interest);
        total_payment += Number(i.EMI);
    })


    total_intrest = Math.round(total_intrest);
    total_payment = Math.round(total_payment);

    return {
        loan_emi, 
        total_intrest,
        total_payment,
        result
    };
}

module.exports = {
    postHome,
    postCar, 
    postPersonal
}