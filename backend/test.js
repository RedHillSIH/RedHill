import pnrData from "./models/pnrData.js"
import trainData from "./models/trains.js"
import trainstatus from "./models/trainstatus.js"
import employeeData from "./models/employee.js"
export default async function putData(){
    let obj={
        pnrNumber: "1234",
        trainCode:"12986",
        trainName:"Jaipur Double Decker",
        trainDepartureDate: Date(2024,10,30,0,0,0,0),
        passangers: [
            {
                "name":"Mihir Bairathi",
                "gender":"M",
                "age":"19"
            },
            {
                "name":"Arshaan Parvez",
                "gender":"M",
                "age":"19"            
            }
        ]  
    }
    let obj2={
        trainCode:"12986",
        trainDepartureDate: Date(2024,10,30,0,0,0,0),
        "ML WORK 1":
            {
                "ML WORK 2":"E1234"
            }
    }
    let obj3={
        employeeId:"E001",
        name:"Ramesh Kumar",
        age:29,
        designation:"DEMO EMP 1" ,
        phone:"987456987",
        complaints:[]   
    }
    let obj4={
        employeeId:"E002",
        name:"Hemant Dubey",
        age:35,
        designation:"DEMO EMP 2" ,
        phone:"74554345667",
        complaints:[]   
    }
    let obj5={
        employeeId:"E003",
        name:"pankaj jha",
        age:32,
        designation:"DEMO EMP 3" ,
        phone:"83334464462",
        complaints:[]   
    }
    let obj6={
        employeeId:"E004",
        name:"Maneesh Meena",
        age:25,
        designation:"DEMO EMP 4" ,
        phone:"9087456987",
        complaints:[]   
    }
    let obj7={
        employeeId:"E005",
        name:"Rakesh Pandey",
        age:30,
        designation:"DEMO EMP 5" ,
        phone:"887456987",
        complaints:[]   
    }
// const pdata=new employeeData(obj3)
// await pdata.save()
// const adata=new pnrData(obj)
// adata.save()
// const bdata= new trainData(obj2)
// bdata.save()
let dat=new employeeData(obj3)
await dat.save()
dat=new employeeData(obj4)
await dat.save()
dat=new employeeData(obj5)
await dat.save()
dat=new employeeData(obj6)
await dat.save()
dat=new employeeData(obj7)
await dat.save()

// let all=await employeeData.find()
// console.log(all)
}
// putData()

