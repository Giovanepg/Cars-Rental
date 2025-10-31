import express from "express";
import fs from "fs";
import { promisify } from "util";
import cors from 'cors'

const server = express();
server.use(express.json())
server.use(cors())

const port = 8008;
const getFile = promisify(fs.readFile);
const updateFile = promisify(fs.writeFile);

server.get("/carros", async (req, res) => {
  try {
    const data = await getFile("./src/cars.json", "utf-8");
    const cars = JSON.parse(data);
    res.send(cars);
  } catch (error) {
    console.log(error);
  }
});

server.put("/carros/:id", async (req, res) => {
  const id = Number(req.params.id)
  try {
    const data = await getFile("./src/cars.json", "utf-8");
    const cars = JSON.parse(data);

    for (let i = 0; i < cars.length; i++) {
      let currentlyCar = cars[i]
      if (currentlyCar.id === id) {
        cars[i].status = 'unavailable'
        await updateFile("./src/cars.json", JSON.stringify(cars, null, 2))
        res.sendStatus(202);
        return
      }
    }
    res.sendStatus(404);
    
  } catch (error) {
    console.log(error);
  }
});

server.post('/carros/add', async (req, res) => {
  const payload = req.body
  console.log(payload)
  try {
    const data = await getFile("./src/cars.json", "utf-8");
    const cars = JSON.parse(data);

    await updateFile("./src/cars.json", JSON.stringify([...cars, {id: cars.length + 1, ...payload}], null, 2))
    res.sendStatus(201);
    
  } catch (error) {
    console.log(error);
  }
  res.send(payload)
})

server.delete('/carros/:id', async (req,res) => {
  const id = Number(req.params.id)
  try {
    const data = await getFile("./src/cars.json", "utf-8");
    const cars = JSON.parse(data);

    const updatedCars = []

    for(let i = 0; i < cars.length; i++) {
      let car = cars[i]
      if (car.id !== id) {
        updatedCars.push(car)
      }
    }

    await updateFile("./src/cars.json", JSON.stringify(updatedCars, null, 2))
    res.sendStatus(202)

  } catch (error) {
    
  }
})


server.listen(port, () => {
  console.log(`SERVER ONLINE`, port);
});
