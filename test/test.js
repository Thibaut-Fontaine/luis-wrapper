const  assert = require('assert');
const luis = require('../src/luis.js');

const appId = "e7543db3-4c11-4064-9dd9-183ff2b01c16";
const predictionKey = "25608c1a7d614a58a9924ac930f36f12";
const endpoint = "https://westus.api.cognitive.microsoft.com/";

let l = new luis(appId, predictionKey, endpoint);

beforeEach(async function () {
  //
});

describe('luis', function () {
  describe('#analyse()', function () {
    it('should get the prediction and return it as a JSON string', async function () {
      let t = await l.analyse("I want two large pepperoni pizzas on thin crust please", true, true);
      assert.match(t, /\{.*\:\{.*\:.*\}\}/g);
    });
  });
});
