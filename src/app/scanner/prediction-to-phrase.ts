import { DetectedObject } from '@tensorflow-models/coco-ssd'
import { PREDICTION_TO_PHRASE } from './constants'

export function predictionToPhrase(prediction: DetectedObject): string {
  const phrase = PREDICTION_TO_PHRASE.get(prediction.class)

  if (phrase === undefined) {
    return 'I don\'t know how to recycle it. Maybe you should use the black trash pin for other non-recycle garbage but it is better to investigate further.'
  }

  if (prediction.score <= 0.5) {
    return 'I don\'t know how to recycle it. Maybe you should use the black trash pin for other non-recycle garbage but it is better to investigate further.'
  }

  if (prediction.score <= 0.9) {
    return `Seems like it is ${prediction.class}. ${phrase}`
  }

  return `It\'s ${prediction.class}. ${phrase}`
}
