import sequelize from "../models/connection.js";
import initModel from "../models/init-models.js";

const conn = initModel(sequelize);

export default conn;
