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
        `SELECT SUM(history_subtotal) AS todays_income FROM history WHERE DATE(history_created_at) = DATE(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getThisYearIncome: (year) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(history_subtotal) as this_years_income FROM history WHERE YEAR(history_created_at) = ${year}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTotalOrders: (perweek) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS orders FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK('${perweek}')`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getDataChart: (date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(history_created_at) AS date_chart, SUM(history_subtotal) AS sum_subtotal FROM history WHERE MONTH(history_created_at) = MONTH('${date}') AND YEAR(history_created_at) = YEAR('${date}') GROUP BY DATE(history_created_at)`,
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
