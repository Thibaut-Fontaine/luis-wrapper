var requestPromise = require('request-promise');
var queryString = require('querystring');

class luis {
  appId: string;
  predictionKey: string;
  endpoint: string;
  query: string;
  topIntent: string;
  intents: object;
  entities: object;

  constructor(appId: string, predictionKey: string, endpoint: string) {
    this.appId = appId;
    this.predictionKey = predictionKey;
    this.endpoint = endpoint;
  }

  update = (type: string, data: string) => {
    if (type === "appId") {
      this.appId = data;
    } else if (type === "predictionKey") {
      this.predictionKey = data;
    } else if (type === "endpoint") {
      this.endpoint = data;
    } else {
      throw new Error(`Expected "appId", "predictionKey" or "endpoint", got '${type}'.`);
    }
  }

  analyse = async (utterance: string, showAllIntents?: boolean, verbose?: boolean) => {
      const queryParams = {
          "show-all-intents": showAllIntents || true,
          "verbose":  verbose || true,
          "query": utterance,
          "subscription-key": this.predictionKey
      }
      const URI = `${this.endpoint}luis/prediction/v3.0/apps/${this.appId}/slots/production/predict?${queryString.stringify(queryParams)}`
      const res = await requestPromise(URI);
      const p = JSON.parse(res);
      this.query = p.query;
      this.topIntent = p.prediction.topIntent;
      this.intents = p.prediction.intents;
      this.entities = p.prediction.entities;
      return res;
  }
}

export = luis;
