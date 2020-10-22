const connection = require("../config/mysql");

module.exports = {
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM history`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO history SET ?`,
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE history SET ? WHERE history_id = ?`,
        [setData, id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM orders WHERE order_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTodaysIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(history_subtotal) AS todays_income FROM history WHERE DATE(history_created_at) = CURDATE()`,
        (error, result) => {
          if (!result[0].todays_income) {
            result[0].todays_income = 0
            resolve(result)
          } else if (!error) {
            resolve(result)
          } reject(error)
        }
      );
    });
  },
  getThisYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(history_subtotal) as this_years_income FROM history WHERE YEAR(history_created_at) = YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTotalOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS orders FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getDataChart: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(history_created_at) AS date_chart, SUM(history_subtotal) AS sum_subtotal FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW()) GROUP BY DATE(history_created_at)`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRecentOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE DAY(history_created_at) = DAY(NOW()) AND YEAR(history_created_at) & YEAR(history_created_at) = YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
