const express = require('express');
const app = express();

app.listen('8080', () => {
    console.log('successfully');
})

app.use(express.json())

// bắt đầu bằng "/" kết thúc k có dấu "/"
// req: nhận giá trị từ FE
// res: trả giá trị từ BE về FE

//GET
app.get("/test", (req, res) => {
    res.status(200).send("Hello world")
})

// GET value
app.get("/test/:hoTen/:lop", (req, res) => {
    const {
        hoTen,
        lop
    } = req.params;
    res.send([hoTen, lop])
})

const lstData = [{
    id: 1,
    hoTen: "Nguyen A",
    lop: "5A"
}, {
    id: 2,
    hoTen: "Nguyen C",
    lop: "2A"
}]

//POST
app.post("/insert", (req,res)=> {
    const {id,hoTen,lop} = req.body;
    lstData.push({id,hoTen,lop})
    res.send(lstData)
})

//PUT
app.put("/edit/:id", (req,res)=> {
    const {id} = req.params;
    const {hoTen, lop} = req.body;

    const editId = lstData.findIndex(item => item.id == id)
    lstData[editId].hoTen = hoTen;
    lstData[editId].lop = lop;

    res.send(lstData)
})

//DELETE
app.delete("/delete/:id", (req,res) => {
    const {id} = req.params;
    const index = lstData.findIndex(item => item.id == id)

    lstData.splice(index,1)
    res.send(lstData)
})