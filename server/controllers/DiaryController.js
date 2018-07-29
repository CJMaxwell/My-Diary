
class DiaryController {
  static async getEntries(req, res) {
    res.json({
      entries: diary,
    });
  }

  static async getEntry(req, res) {
    const { entryId } = req.params;
    const entry = diary[entryId - 1];

    if (entry) {
      res.json({
        entry,
      });
    } else {
      res.json({
        error: 'Entry doesn\'t exist',
      });
    }
  }

  static async createEntry(req, res) {
    const entries = diary;
    const { title, body } = req.body;
    const entry = {
      id: 40,
      title,
      body,
    };
    entries.push(entry);
    res.json({
      entry,
    });
  }

  static async updateEntry(req, res) {
    const { entryId } = req.params;
    const { title, body } = req.body;
    const entry = diary.find(existingEntry => existingEntry.id === Number(entryId));
    if (entry) {
      entry.title = title;
      entry.body = body;
      res.json({
        entry,
      });
    } else {
      res.json({
        error: 'Entry doesn\'t exist',
      });
    }
  }
}

export default DiaryController;
