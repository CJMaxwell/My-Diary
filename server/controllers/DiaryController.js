import models from '../models';

class DiaryController {
  static async createEntry(req, res) {
    try {
      const { title, body } = req.body;
      await models.query(`INSERT INTO diaryentry (title, body, userid) VALUES (${title}, ${body}, ${req.user.id})`);
      const entry = await models.query(`SELECT * FROM diaryentry WHERE userid = ${req.user.id}`);

      console.log(entry);
      res.json({
        entry,
      });
    } catch (err) {
      res.json({
        err,
      });
    }
  }
}

export default DiaryController;
