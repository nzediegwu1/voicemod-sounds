import { existsOr404, ResolveHttp } from '../utils/http';
import { sound } from '../messages/success';
import { soundError } from '../messages/error';

export class SoundController {
  constructor(soundModel) {
    this.soundModel = soundModel;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.import = this.import.bind(this);
    this.play = this.play.bind(this);
  }

  @ResolveHttp
  async get(req) {
    const { soundId } = req.params;

    const data = await this.soundModel.findOne({ _id: soundId }).select('-__v');
    existsOr404(data, soundError[404]);
    return { message: sound.retrieved, data };
  }

  @ResolveHttp
  async getAll(req) {
    const { page = 1, limit = 10 } = req.query;
    const skip = (+page - 1) * +limit;

    const [result] = await this.soundModel.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [
            { $skip: skip },
            { $limit: +limit },
            { $project: { _id: 1, name: 1, icon: 1 } },
          ],
        },
      },
    ]);

    const { total, data } = result;

    const count = total[0]?.count || 0;
    const hasMore = skip + data.length < count;
    return {
      message: sound.fetched,
      data: {
        hasMore,
        data,
      },
    };
  }

  @ResolveHttp
  async import(req) {
    const { body } = req;

    await this.soundModel.deleteMany({});
    await this.soundModel.insertMany(body);
    return { message: sound.imported };
  }

  @ResolveHttp
  async play(req) {
    const { soundId } = req.params;

    const data = await this.soundModel.findOneAndUpdate(
      { _id: soundId },
      {
        $inc: { playbacks: 1, price: 0.01 },
      }
    );
    existsOr404(data, soundError[404]);
    return { code: 204 };
  }
}
