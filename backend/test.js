import pnrData from "./models/pnrData.js"
import trainData from "./models/trains.js"
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
        employeeId:"E1234",
        name:"Ramesh Kumar",
        age:29,
        designation:"Testing Engineer" ,
        phone:"987456987",
        complaints:[]   
    }
// const pdata=new employeeData(obj3)
// await pdata.save()
const adata=new pnrData(obj)
adata.save()
const bdata= new trainData(obj2)
bdata.save()
// let all=await employeeData.find()
// console.log(all)
}
// putData()

