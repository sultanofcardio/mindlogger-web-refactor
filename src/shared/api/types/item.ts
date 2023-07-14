import { ConditionalLogic } from "./conditionalLogiс"

export type ItemResponseTypeDTO =
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
  | "time"

export interface ItemDetailsBaseDTO {
  id: string
  name: string
  question: string
  order: number
  isHidden: boolean
  responseType: ItemResponseTypeDTO
  config: ConfigDTO
  responseValues: ResponseValuesDTO
  conditionalLogic: ConditionalLogic | null
}

export type ConfigDTO =
  | TextItemConfigDTO
  | CheckboxItemConfigDTO
  | RadioItemConfigDTO
  | SliderItemConfigDTO
  | SelectorItemConfigDTO
  | MessageItemConfigDTO
  | DateItemConfigDTO
  | TimeItemConfigDTO
  | TimeRangeItemConfigDTO

export type ResponseValuesDTO =
  | TextItemResponseValuesDTO
  | CheckboxItemResponseValuesDTO
  | RadioItemResponseValuesDTO
  | SliderItemResponseValuesDTO
  | SelectorItemResponseValues
  | MessageItemResponseValuesDTO
  | DateItemResponseValuesDTO
  | TimeItemResponseValuesDTO
  | TimeRangeItemResponseValuesDTO

export interface TextItemDTO extends ItemDetailsBaseDTO {
  responseType: "text"
  config: TextItemConfigDTO
  responseValues: TextItemResponseValuesDTO
}

export type TextItemConfigDTO = {
  maxResponseLength: number // default 300
  correctAnswerRequired: boolean // default false
  correctAnswer: string // default ""
  numericalResponseRequired: boolean // default ""
  responseDataIdentifier: boolean // default ""
  responseRequired: boolean // default false
  removeBackButton: boolean
  skippableItem: boolean
}

export type TextItemResponseValuesDTO = null

export interface CheckboxItemDTO extends ItemDetailsBaseDTO {
  responseType: "multiSelect"
  config: CheckboxItemConfigDTO
  responseValues: CheckboxItemResponseValuesDTO
}

export type CheckboxItemConfigDTO = {
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

export type CheckboxItemResponseValuesDTO = {
  options: Array<{
    id: string
    text: string
    image: string | null
    score: number | null
    tooltip: string | null
    color: string | null
    isHidden: boolean
    value: number
  }>
}

export interface RadioItemDTO extends ItemDetailsBaseDTO {
  responseType: "singleSelect"
  config: RadioItemConfigDTO
  responseValues: RadioItemResponseValuesDTO
}

export type RadioItemConfigDTO = {
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

export type RadioItemResponseValuesDTO = {
  options: Array<{
    id: string
    text: string
    image: string | null
    score: number | null
    tooltip: string | null
    color: string | null
    isHidden: boolean
    value: number
  }>
}

export interface SliderItemDTO extends ItemDetailsBaseDTO {
  responseType: "slider"
  config: SliderItemConfigDTO
  responseValues: SliderItemResponseValuesDTO
}

export type SliderItemConfigDTO = {
  addScores: boolean
  setAlerts: boolean
  showTickMarks: boolean
  showTickLabels: boolean
  continuousSlider: boolean
  removeBackButton: boolean
  skippableItem: boolean
  timer: number | null
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}

export type SliderItemResponseValuesDTO = {
  minLabel: string | null
  maxLabel: string | null
  minValue: number
  maxValue: number
  minImage: string | null
  maxImage: string | null
}

export interface SelectorItemDTO extends ItemDetailsBaseDTO {
  responseType: "numberSelect"
  config: SelectorItemConfigDTO
  responseValues: SelectorItemResponseValues
}

export type SelectorItemConfigDTO = {
  removeBackButton: boolean
  skippableItem: boolean
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}

export type SelectorItemResponseValues = {
  minValue: number
  maxValue: number
}

export interface MessageItemDTO extends ItemDetailsBaseDTO {
  responseType: "message"
  config: MessageItemConfigDTO
  responseValues: MessageItemResponseValuesDTO
}

export type MessageItemConfigDTO = {
  removeBackButton: boolean
  timer: number | null
}
export type MessageItemResponseValuesDTO = null

export interface DateItemDTO extends ItemDetailsBaseDTO {
  responseType: "date"
  config: DateItemConfigDTO
  responseValues: DateItemResponseValuesDTO
}

export type DateItemConfigDTO = {
  removeBackButton: boolean
  skippableItem: boolean
  timer: number | null
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}
export type DateItemResponseValuesDTO = null

export interface TimeItemDTO extends ItemDetailsBaseDTO {
  responseType: "time"
  config: TimeItemConfigDTO
  responseValues: TimeItemResponseValuesDTO
}

export type TimeItemConfigDTO = {
  removeBackButton: boolean
  skippableItem: boolean
  timer: number | null
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}

export type TimeItemResponseValuesDTO = null

export interface TimeRangeItemDTO extends ItemDetailsBaseDTO {
  responseType: "timeRange"
  config: TimeRangeItemConfigDTO
  responseValues: TimeRangeItemResponseValuesDTO
}

export type TimeRangeItemConfigDTO = {
  removeBackButton: boolean
  skippableItem: boolean
  timer: number | null
  additionalResponseOption: {
    textInputOption: boolean
    textInputRequired: boolean
  }
}

export type TimeRangeItemResponseValuesDTO = null
