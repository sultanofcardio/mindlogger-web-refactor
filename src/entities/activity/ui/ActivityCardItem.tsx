import { ItemCardButtonsConfig } from "../lib"
import { ActivityEventProgressRecord } from "../model/types"
import { ItemCardButton } from "./ItemCardButtons"
import { ItemPicker } from "./items/ItemPicker"

import { CardItem } from "~/shared/ui"

type ActivityCardItemProps = {
  activityItem: ActivityEventProgressRecord
  isOnePageAssessment: boolean
  isBackShown: boolean
  isSubmitShown: boolean

  isActive: boolean
  onSubmitButtonClick: () => void
  toNextStep?: () => void
  toPrevStep?: () => void
  values: string[]
  setValue: (itemId: string, answer: string[]) => void
}

export const ActivityCardItem = ({
  activityItem,
  isOnePageAssessment,
  isBackShown,
  isSubmitShown,
  toNextStep,
  toPrevStep,
  isActive,
  values,
  setValue,
  onSubmitButtonClick,
}: ActivityCardItemProps) => {
  const buttonConfig: ItemCardButtonsConfig = {
    isNextDisable: !values || !values.length,
    isSkippable: activityItem.config.skippableItem && !isSubmitShown,
    isBackShown: isBackShown && !activityItem.config.removeBackButton,
  }

  const onNextButtonClick = () => {
    if (toNextStep) {
      toNextStep()
    }
  }

  const onBackButtonClick = () => {
    if (toPrevStep) {
      toPrevStep()
    }
  }

  const onItemValueChange = (value: string[]) => {
    setValue(activityItem.id, value)
  }

  return (
    <CardItem
      markdown={activityItem.question}
      buttons={
        isActive ? (
          <ItemCardButton
            config={buttonConfig}
            isOnePageAssessment={isOnePageAssessment}
            isSubmitShown={isSubmitShown}
            onNextButtonClick={onNextButtonClick}
            onBackButtonClick={onBackButtonClick}
            onSubmitButtonClick={onSubmitButtonClick}
          />
        ) : (
          <></>
        )
      }>
      <ItemPicker item={activityItem} values={values} onValueChange={onItemValueChange} isDisabled={!isActive} />
    </CardItem>
  )
}
