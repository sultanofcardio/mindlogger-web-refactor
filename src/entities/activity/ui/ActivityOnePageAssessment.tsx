import { useActivityEventProgressState, useSaveActivityItemAnswer } from "../model/hooks"
import { ActivityCardItemList } from "./ActivityCardItemList"

type ActivityOnePageAssessmentProps = {
  eventId: string
  activityId: string
  invalidItemIds: Array<string>
  onSubmitButtonClick: () => void
  openInvalidAnswerModal: () => void
}

export const ActivityOnePageAssessment = ({
  eventId,
  activityId,
  invalidItemIds,
  onSubmitButtonClick,
  openInvalidAnswerModal,
}: ActivityOnePageAssessmentProps) => {
  const { currentActivityEventProgress } = useActivityEventProgressState({
    eventId,
    activityId,
  })

  const { saveActivityItemAnswer } = useSaveActivityItemAnswer({ eventId, activityId })

  const isSubmitShown = true // Always true when one page assessment
  const isBackShown = false // Always false when one page assessment

  return (
    <ActivityCardItemList
      items={currentActivityEventProgress}
      isOnePageAssessment={true}
      isBackShown={isBackShown}
      isSubmitShown={isSubmitShown}
      invalidItemIds={invalidItemIds}
      setValue={saveActivityItemAnswer}
      onSubmitButtonClick={onSubmitButtonClick}
      openInvalidAnswerModal={openInvalidAnswerModal}
    />
  )
}
