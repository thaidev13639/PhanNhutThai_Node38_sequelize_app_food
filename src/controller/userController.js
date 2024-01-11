import { checkResExsited, checkUserExsited } from "../config/configChecked.js";
import conn from "../config/conn.js";

const handldeListLikeByUser = async (req, res) => {
  try {
    let { userID } = req.params;
    let dataUser = await checkUserExsited(userID);

    if (dataUser) {
      let data = await conn.users.findOne({
        include: [
          {
            model: conn.like_res,
            attributes: ["user_id", "res_id", "date_like"],
            where: { user_id: userID },
          },
        ],
        where: {
          user_id: userID,
        },
      });

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("User didn't like");
      }
    } else {
      res.status(404).send("This user is not exsited on Database");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const handldeListRateByUser = async (req, res) => {
  try {
    let { userID } = req.params;
    let dataUser = await checkUserExsited(userID);

    if (dataUser) {
      let data = await conn.users.findOne({
        include: [
          {
            model: conn.rate_res,
            attributes: ["user_id", "res_id", "amount", "date_rate"],
            where: { user_id: userID },
          },
        ],
        where: {
          user_id: userID,
        },
      });

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("User is doesn't rate");
      }
    } else {
      res.status(404).send("This User is not avalible");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const handleOrderFood = async (req, res) => {
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;
    let dataUser = await checkUserExsited(user_id);
    let dataFood = await conn.foods.findOne({
      where: {
        food_id,
      },
    });

    if (dataUser && dataFood) {
      let dataOrder = await conn.orders.findOne({
        where: {
          user_id: user_id,
          food_id: food_id,
        },
      });

      if (dataOrder) {
        let newData = {
          user_id,
          food_id,
          amount: String(Number(dataOrder.amount) + Number(amount)),
          code,
          arr_sub_id,
        };
        await conn.orders.update(newData, {
          where: {
            user_id: user_id,
            food_id: food_id,
          },
        });
        res.status(201).send("Update Order Success");
      } else {
        let newData = {
          user_id,
          food_id,
          amount,
          code,
          arr_sub_id,
        };
        await conn.orders.create(newData);
        res.status(201).send("Create Order Success");
      }
    } else {
      res.status(404).send("User or Food is not exsited on Database");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const handleRateRes = async (req, res) => {
  try {
    let { user_id, res_id, amount, date_rate } = req.body;

    if (Number(amount) <= 5) {
      let dataUser = await checkUserExsited(user_id);
      let dataRes = await checkResExsited(res_id);

      if (dataUser && dataRes) {
        let dataRate = await conn.rate_res.findOne({
          where: {
            user_id,
            res_id,
          },
        });

        if (dataRate) {
          let newData = { user_id, res_id, amount, date_rate };
          await conn.rate_res.update(newData, {
            where: {
              user_id,
              res_id,
            },
          });
          res.status(201).send("Update Rate Restaurant Success");
        } else {
          let newData = { user_id, res_id, amount, date_rate };
          await conn.rate_res.create(newData);
          res.status(201).send("Create Rate Restaurant Success");
        }
      } else {
        res
          .status(404)
          .send("This User or Restaurant is not exsited on Database");
      }
    } else {
      res.status(404).send("valid amount cann't bigger than 5");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const handleLikeRes = async (req, res) => {
  try {
    let { user_id, res_id, date_like } = req.body;

    let dataUser = await checkUserExsited(user_id);
    let dataRes = await checkResExsited(res_id);

    if (dataUser && dataRes) {
      let data = await conn.like_res.findOne({
        where: {
          user_id,
          res_id,
        },
      });

      if (data) {
        await conn.like_res.destroy({
          where: {
            user_id,
            res_id,
          },
        });
        res.status(200).send("Unlike Success");
      } else {
        console.log(date_like);
        let newData = { user_id, res_id, date_like };
        await conn.like_res.create(newData);
        res.status(201).send("Like Success");
      }
    } else {
      res.status(404).send("User or Restaurant is not exsited on Database");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

export {
  handldeListLikeByUser,
  handldeListRateByUser,
  handleOrderFood,
  handleRateRes,
  handleLikeRes,
};
