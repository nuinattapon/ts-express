import * as express from "express"
import * as mongoose from "mongoose"
import * as path from "path"
import * as logger from "morgan"

import routes from "./src/routes/crmRoutes"
import { Settings } from "./settings"

const dataConnection = (user: string, pass: string, url: string): string => {
  return `mongodb+srv://${user}:${pass}@${url}?retryWrites=true`
}

let database: string = dataConnection(
  Settings.atlasUser,
  Settings.atlasPass,
  Settings.atlasURL
)

// mongoose connection
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10
})

const app = express()
app.disable("x-powered-by")
app.use(logger("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)

// generics
function nameCreator<T>(name: T): T {
  return name
}

let myName = nameCreator<string>("Manny,")

// declaration merging
interface Warriors {
  weapon: string
  skills: number
}

interface Warriors {
  name: string
}

let ninja: Warriors = { weapon: "Shuriken", skills: 5, name: "Nui" }

// serving static files
const sharedDir = path.join(__dirname, "public")
console.log(sharedDir)
app.use("/", express.static(path.join(__dirname, "public")))
app.get("/", (req, res) => res.send(ninja))

app.listen(Settings.PORT, () =>
  console.log(`Node and express server is running on port ${Settings.PORT}`)
)
