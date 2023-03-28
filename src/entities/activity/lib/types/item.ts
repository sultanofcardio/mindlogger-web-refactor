export type ActivityItemType =
  | "text"
  | "singleSelect"
  | "multiSelect"
  | "message"
  | "slider"
  | "numberSelect"
  | "timeRange"
  | "geolocation"
  | "drawing"
  | "photo"
  | "video"
  | "date"
  | "sliderRows"
  | "singleSelectRows"
  | "multiSelectRows"
  | "audio"
  | "audioPlayer"

export type ActivityItem = {
  id: string
  question: string

  responseType: ActivityItemType

  timer: number

  isSkippable: boolean
  isRandom: boolean
  isAbleToMoveToPrevious: boolean
  hasTextResponse: boolean
  ordering: number
}

export type ItemCardButtonsConfig = {
  isOnePageAssessment?: boolean
  isBackShown?: boolean
  isSubmitShown?: boolean
  isSkippable?: boolean
  isNextDisable?: boolean
}

export type BaseItem<Config, ResponseValues> = {
  id: string
  name: string
  question: string
  responseType: ActivityItemType
  responseValues: ResponseValues | null
  order: number
  config: Config
  answer: string[]
}

export type TextItemConfig = {
  maxResponseLength: number // default 300
  correctAnswerRequired: boolean // default false
  correctAnswer: string // default ""
  numericalResponseRequired: boolean // default false
  responseDataIdentifier: string // default ""
  responseRequired: boolean // default false
  removeBackButton: boolean
  skippableItem: boolean
}

export type CheckboxConfig = {
  removeBackButton: boolean
  skippableItem: boolean
  randomizeOptions: boolean
  timer: number | null
  addScores: boolean
  setAlerts: boolean
  addTooltip: boolean
  setPalette: boolean
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}

export type CheckboxValues = {
  options: [
    {
      text: string
      image: string
      score: number
      tooltip: string
      isHidden: boolean
    },
  ]
}
