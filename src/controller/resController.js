import conn from "../config/conn.js";

const handleListLikeByResID = async (req, res) => {
  try {
    let { resID } = req.params;
    let dataRes = await conn.restaurants.findOne({
      where: {
        res_id: resID,
      },
    });
    console.log(dataRes);
    if (dataRes) {
      let data = await conn.like_res.findAll({
        include: [
          {
            model: conn.restaurants,
            attributes: ["res_id", "res_name"],
            where: { res_id: resID },
          },
        ],
        where: {
          res_id: resID,
        },
      });
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("This Restaunrant nobody like");
      }
    } else {
      res.status(404).send("This Restaurant is not avalible in DataBase");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const handleListRateByResID = async (req, res) => {
  try {
    let { resID } = req.params;
    let dataRes = await conn.restaurants.findOne({
      where: {
        res_id: resID,
      },
    });
    console.log(dataRes);
    if (dataRes) {
      let data = await conn.rate_res.findAll({
        include: [
          {
            model: conn.restaurants,
            attributes: ["res_id", "res_name"],
            where: { res_id: resID },
          },
        ],
        where: {
          res_id: resID,
        },
      });
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("This Restaunrant nobody rate");
      }
    } else {
      res.status(404).send("This Restaurant is not avalible in DataBase");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

export { handleListLikeByResID, handleListRateByResID };
