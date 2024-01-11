import conn from "../config/conn.js";

const handleListLikeByResID = async (req, res) => {
  try {
    let { resID } = req.params;
    let dataRes = await conn.restaurants.findOne({
      where: {
        res_id: resID,
      },
    });

    if (dataRes) {
      let data = await conn.restaurants.findOne({
        include: [
          {
            model: conn.like_res,
            attributes: ["user_id", "res_id", "date_like"],
            where: { res_id: resID },
          },
        ],
        where: {
          res_id: resID,
        },
      });

      if (data) {
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
      let data = await conn.restaurants.findAll({
        include: [
          {
            model: conn.rate_res,
            attributes: ["user_id", "res_id", "amount", "date_rate"],
            where: { res_id: resID },
          },
        ],
        where: {
          res_id: resID,
        },
      });
      if (data) {
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
