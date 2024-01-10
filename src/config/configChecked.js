import conn from "./conn.js";

const checkUserExsited = async (userID) => {
  let dataUser = await conn.users.findOne({
    where: {
      user_id: userID,
    },
  });
  return dataUser;
};

const checkResExsited = async (resID) => {
  let dataRes = await conn.restaurants.findOne({
    where: {
      res_id: resID,
    },
  });
  return dataRes;
};

export { checkUserExsited, checkResExsited };
