import { existsOr404, ResolveHttp } from '../utils/http';
import { sound } from '../messages/success';
import { sound as error } from '../messages/error';

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
    existsOr404(data, error[404]);
    return { message: sound.retrieved, data };
  }

  @ResolveHttp
  async getAll(req) {
    const { page = 1, limit = 10 } = req.query;

    const [result] = await this.soundModel.aggregate([
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [
            { $skip: (+page - 1) * +limit },
            { $limit: +limit },
            { $project: { _id: 1, name: 1, icon: 1 } },
          ],
        },
      },
    ]);

    const { total, data } = result;
    return {
      message: sound.fetched,
      data: {
        total: total[0]?.count || 0,
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
        $inc: {
          playbacks: 1,
        },
      }
    );
    existsOr404(data, error[404]);
    return { code: 204 };
  }
}
