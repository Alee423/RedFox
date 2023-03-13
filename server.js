const express = require("express")
const cors = require("cors")
const app = express();
const PORT = 5000
app.use(express.json())
app.use(cors())
const Pool = require("pg").Pool
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

const pool = new Pool({
    "user": "postgres",
    "password": "12345",
    "host": "localhost",
    "port": "5432",
    "database": "redfox"
})

app.post("/signup", (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.passsword;
    let confirmpassword = req.body.confirmpassword;

    pool.query(`INSERT INTO signup (username,email,password,confirmpassword) VALUES ($1,$2,$3,$4)`, [username, email, password, confirmpassword], (err, result) => {
        if (err) {
            res.send({
                isAccountCreated: false,
            })
        } else {
            res.send({
                isAccountCreated: true,
            })
        }

    }
    )

})

app.post("/signin", (req, res) => {
    let username = req.body.username;
    let password = req.body.passsword;

    pool.query(`select * from signup where username=$1 and password=$2`, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        if (result.rows.length > 0) {
            res.send({
                isLogenSuccessfull: true
            })
        } else {
            res.send({
                isLogenSuccessfull: false
            })
        }

    }
    )

})

app.post("/adddata", (req, res) => {

    let serial_number = req.body.serial_number;
    let title = req.body.title;
    let due_date = req.body.due_date;
    let description = req.body.description;
    console.log(description)
    pool.query(`INSERT INTO task (serial_number,title,due_date,description) VALUES ($1,$2,$3,$4)`, [serial_number, title, due_date, description], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        res.send({
            querResult: result,
            msg: "data added successfully",
            responseCode: 445
        });


    }
    )
});

app.post("/getdata", (req, res) => {
    // const data = [
    //     ["1", "Front-End Web Developer", "31/01/2023","ab fkjwbef fbh "],
    //     ["2", "Web Designer","5/02/2023","slkwj lqnd "],
    //     ["3","Full-Stack Developer","8/02/2023","kfgw ufv"],
    //     ["4","WordPress Developer ","25/03/2023","fjg jfbb uwgf "]
    //     ];

    pool.query(`select * from task`, [], (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(result.fields);

        // to Change array into array 
        // const input = [
        // 	{
        // 		serial_number: 95,
        // 		title: "Web Designer",
        // 		due_date: "2023-03-07T19:00:00.000Z",
        // 		description: "ahu hie hfi kubf"
        // 	},
        // 	{
        // 		serial_number: 95,
        // 		title: "Web Designer",
        // 		due_date: "2023-03-07T19:00:00.000Z",
        // 		description: "ahu hie hfi kubf"
        // 	},
        // 	{
        // 		serial_number: 95,
        // 		title: "Web Designer",
        // 		due_date: "2023-03-07T19:00:00.000Z",
        // 		description: "ahu hie hfi kubf"
        // 	},
        // 	{
        // 		serial_number: 1,
        // 		title: "fjdslk",
        // 		due_date: "2023-04-04T19:00:00.000Z",
        // 		description: null
        // 	},
        // 	{
        // 		serial_number: 2,
        // 		title: "322`",
        // 		due_date: "2023-04-02T19:00:00.000Z",
        // 		description: null
        // 	},
        // 	{
        // 		serial_number: 5,
        // 		title: "nldjlsk",
        // 		due_date: "2023-02-27T19:00:00.000Z",
        // 		description: "DEFAULT DESCRIPTION"
        // 	}
        // ];
        let output = [];
        result.rows.forEach((record) => {
            console.log(record)
            output.push([record.serial_number, record.title, record.due_date, record.description])
        })

        res.send({
            querResult: output,
            msg: "data added successfully",
            responseCode: 445
        });


    }
    )

})
app.get("/", (req, res) => {
    res.send({
        msg: "Hi"
    })
})
app.listen(PORT, () => console.log('Server has started on port:${port}'))   