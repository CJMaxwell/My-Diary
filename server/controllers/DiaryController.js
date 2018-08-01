import models from '../models';

/**
 * @description: Controller for diary entry
 *
 * @class DiaryController
 *
 */

class DiaryController {
  /**
   * @static method to create entry by userid
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   *
  */

  static async createEntry(req, res) {
    try {
      const { title, body } = req.body;
      await models.query(`INSERT INTO diaryentry (title, body, userid)
        VALUES ('${title}', '${body}', '${req.user.id}')`);

      const entry = await models.query(`SELECT title, body, createdat, updatedat FROM diaryentry
        WHERE userid = ${req.user.id} ORDER BY id DESC`);

      res.json({
        entry: entry.rows[0],
      });
    } catch (err) {
      res.json({
        err,
      });
    }
  }

  /**
   * @static method to get all entries created by user
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   *
  */

  static async getEntries(req, res) {
    try {
      const entries = await models.query(`SELECT title, body, updatedat, createdat FROM diaryentry
        WHERE userid = ${req.user.id} ORDER BY createdat DESC`);
      res.json({
        entries: entries.rows,
      });
    } catch (err) {
      res.json({
        err,
      });
    }
  }

  /**
   * @static method to get an entry created by a user
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   *
  */

  static async getEntry(req, res) {
    try {
      const { entryId } = req.params;
      const entry = await models.query(`SELECT title, body, updatedat, createdat FROM diaryentry
        WHERE userid = ${req.user.id} AND id =${entryId}`);

      if (entry) {
        res.json({
          entry: entry.rows,
        });
      } else {
        res.json({
          error: 'Entry doesn\'t exist',
        });
      }
    } catch (err) {
      res.json({
        err,
      });
    }
  }

  /**
   * @static method to update an already created entry
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   *
  */

  static async updateEntry(req, res) {
    try {
      const { entryId } = req.params;
      const { title, body } = req.body;
      const updatedEntry = await models.query(`UPDATE diaryentry SET title = '${title}', body = '${body}'
        WHERE userid = ${req.user.id} AND id =${entryId} RETURNING title, body`);
      res.json({
        updatedEntry: updatedEntry.rows,
      });
    } catch (err) {
      res.json({
        err,
      });
    }
  }


  /**
   * @static method to delete an entry by the same user
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   *
  */

  static async deleteEntry(req, res) {
    try {
      const { entryId } = req.params;
      const result = await models.query(`DELETE FROM diaryentry WHERE userid = '${req.user.id}' AND id = '${entryId}'`);
      if (result) {
        res.json({
          message: 'Entry deleted successfully',
        });
      } else {
        res.json({
          error: 'Could not delete entry',
        });
      }
    } catch (err) {
      res.json({
        err,
      });
    }
  }
}

export default DiaryController;
