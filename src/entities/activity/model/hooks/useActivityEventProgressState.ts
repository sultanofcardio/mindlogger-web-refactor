import { useMemo } from "react"

import { useSelector } from "react-redux"

import { conditionalLogicBuilder, getActivityEventProgressId } from "../../lib"
import { activityEventProgressSelector } from "../selectors"

type UseActivityEventProgressStateProps = {
  activityId: string
  eventId: string
}

export const useActivityEventProgressState = (props: UseActivityEventProgressStateProps) => {
  const activityEventProgressState = useSelector(activityEventProgressSelector)

  const currentActivityEventStateProgress = useMemo(() => {
    const activityEventId = getActivityEventProgressId(props.activityId, props.eventId)
    return activityEventProgressState[activityEventId]
  }, [activityEventProgressState, props.activityId, props.eventId])

  const activitiesProgress = useMemo(() => {
    const activityEventProgress = currentActivityEventStateProgress

    if (!activityEventProgress?.activityEvents) {
      return []
    }

    return activityEventProgress.activityEvents
  }, [currentActivityEventStateProgress])

  const activitiesProgressWithConditionalLogic = conditionalLogicBuilder.process(activitiesProgress)

  const lastActivityEventWithAnswerIndex = useMemo(() => {
    const activityEventProgress = currentActivityEventStateProgress
    const step = activityEventProgress?.step ?? 1

    // -1 === not foind
    // 0 === start index
    // If not found return start index
    if (step > 1) {
      return step - 1
    }

    return step
  }, [currentActivityEventStateProgress])

  const progress = useMemo(() => {
    const defaultProgressPercentage = 0

    const activityEventRecords = currentActivityEventStateProgress

    if (!activityEventRecords?.activityEvents) {
      return defaultProgressPercentage
    }

    const activityEventLength = activitiesProgressWithConditionalLogic.length
    const lastStep = activityEventRecords?.step

    // Step always start from 1, but we want to paint progress when we pass some item
    return ((lastStep - 1) / activityEventLength) * 100
  }, [activitiesProgressWithConditionalLogic.length, currentActivityEventStateProgress])

  return {
    currentActivityEventStateProgress,
    currentActivityEventProgress: activitiesProgressWithConditionalLogic,
    lastActivityEventWithAnswerIndex,
    progress,
    userEvents: currentActivityEventStateProgress?.userEvents ?? [],
    activityEvents: currentActivityEventStateProgress?.activityEvents ?? [],
  }
}
