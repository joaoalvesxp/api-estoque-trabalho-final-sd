const uuid = require("uuid");
const uuid4 = uuid.v4();
const fs = require('fs');
const { data } = require("../database/loadDatabase");
const { Stock } = require("../models/Stock");