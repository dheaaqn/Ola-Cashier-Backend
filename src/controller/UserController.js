const bcrypt = require("bcrypt");
const helper = require("../helper/product.js");
const jwt = require("jsonwebtoken");
const { postUser, checkUser } = require("../model/Users");

module.exports = {
  registerUser: async (req, res) => {
    const { user_email, user_password, user_name, user_role } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);

    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role,
      user_status: 0,
      user_created_at: new Date(),
    };

    try {
      const checkDataUser = await checkUser(user_email);
      if (checkDataUser.length > 0) {
        return helper.response(res, 400, "Email already registered");
      } else if (
        req.body.user_password.length < 8 ||
        req.body.user_password.length > 16
      ) {
        return helper.response(res, 400, "password must be 8-16 characters");
      } else {
        const result = await postUser(setData);
        return helper.response(res, 200, "Success Register User");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Request");
    }
  },
  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const checkDataUser = await checkUser(user_email);

      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUser[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          };
          const token = jwt.sign(payload, "Secret", { expiresIn: "1h" });
          payload = { ...payload, token };
          return helper.response(res, 200, "Success Login", payload);
        } else {
          return helper.response(res, 400, "Invalid Password");
        }
      } else {
        return helper.response(res, 400, "Account not Registed");
      }
    } catch (error) {
      return helper.response(res, 400, "Bad Requuest");
    }
  },
};
