import Box from "@mui/material/Box"
import { isIOS } from "react-device-detect"

import { ActivityListItem, ActivityStatus, useActivity } from "../../lib"
import { ActivityCardBase } from "./ActivityCardBase"
import { ActivityCardDescription } from "./ActivityCardDescription"
import { ActivityCardIcon } from "./ActivityCardIcon"
import { ActivityCardProgressBar } from "./ActivityCardProgressBar"
import { ActivityCardTitle } from "./ActivityCardTitle"
import { ActivityLabel } from "./ActivityLabel"
import TimeStatusLabel from "./TimeStatusLabel"

import { appletModel } from "~/entities/applet"
import { APPSTORE_LINK, GOOGLEPLAY_LINK } from "~/shared/constants"
import Loader from "~/shared/ui/Loader"
import { useCustomMediaQuery } from "~/shared/utils"

interface ActivityCardProps {
  activityListItem: ActivityListItem
  isPublic: boolean
  onActivityCardClick: () => void
}

export const ActivityCard = ({ activityListItem, onActivityCardClick, isPublic }: ActivityCardProps) => {
  const { lessThanSM } = useCustomMediaQuery()

  const { saveItemsRecord } = appletModel.hooks.useSaveActivityEventProgress()

  const { isLoading, activity } = useActivity({
    activityId: activityListItem.activityId,
    isPublic,
  })

  const { items, progress } = appletModel.hooks.useActivityEventProgressState({
    activityId: activityListItem.activityId,
    eventId: activityListItem.eventId,
  })

  const getCompletedActivitiesFromPosition = (position: number) => {
    return position - 1
  }

  const isStatusScheduled = activityListItem.status === ActivityStatus.Scheduled

  const isDisabled = isStatusScheduled

  const isFlow = Boolean(activityListItem.flowId)
  const activityFlowName = activityListItem.activityFlowDetails?.activityFlowName

  const isActivityInProgress = activityListItem.status === ActivityStatus.InProgress

  const countOfCompletedQuestions = items.filter(item => item.answer.length).length

  const activityLength = activity?.items.length || 0

  const numberOfActivitiesInFlow = activityListItem.activityFlowDetails?.numberOfActivitiesInFlow || 0

  const countOfCompletedActivities = getCompletedActivitiesFromPosition(
    activityListItem.activityFlowDetails?.activityPositionInFlow || 0,
  )

  const activityCardTitle = isFlow && activityFlowName ? activityFlowName : activityListItem.name

  const flowProgress = (countOfCompletedActivities / numberOfActivitiesInFlow) * 100

  const isActivitySupported = appletModel.helpers.isSupportedActivity(activity)

  const onActivityCardClickHandler = () => {
    if (isDisabled) {
      return
    }

    if (!isActivitySupported) {
      const storeLink = isIOS ? APPSTORE_LINK : GOOGLEPLAY_LINK
      return window.open(storeLink, "_blank", "noopener noreferrer")
    }

    const isActivityInProgress = activityListItem.status === ActivityStatus.InProgress
    const isFlow = Boolean(activityListItem.flowId)

    if (!isActivityInProgress && !isFlow && activity) {
      const initialStep = 1

      saveItemsRecord(activity, activityListItem.eventId, initialStep)
    }

    return onActivityCardClick()
  }

  if (isLoading) {
    return (
      <ActivityCardBase isFlow={isFlow}>
        <div className="activity-data">
          <Loader />
        </div>
      </ActivityCardBase>
    )
  }

  return (
    <ActivityCardBase onClick={onActivityCardClickHandler} isDisabled={isDisabled} isFlow={isFlow}>
      <Box
        display="flex"
        flex={1}
        gap={lessThanSM ? "8px" : "24px"}
        flexDirection={lessThanSM ? "column" : "row"}
        data-testid="activity-card-content-wrapper"
        sx={{ textTransform: "none" }}>
        <ActivityCardIcon src={isFlow ? null : activityListItem.image} isFlow={isFlow} />

        <Box display="flex" flex={1} justifyContent="center" alignItems="flex-start" flexDirection="column" gap="8px">
          <ActivityCardTitle title={activityCardTitle} isFlow={isFlow} />

          {isActivityInProgress && (
            <ActivityCardProgressBar percentage={isFlow ? flowProgress : progress} isFlow={isFlow} />
          )}

          <ActivityLabel
            isFlow={isFlow}
            activityLength={activityLength}
            isSupportedActivity={isActivitySupported}
            isActivityInProgress={isActivityInProgress}
            countOfCompletedQuestions={countOfCompletedQuestions}
            countOfCompletedActivities={countOfCompletedActivities}
            numberOfActivitiesInFlow={numberOfActivitiesInFlow}
          />

          <ActivityCardDescription description={activityListItem.description} isFlow={isFlow} />

          {isActivitySupported && <TimeStatusLabel activity={activityListItem} />}
        </Box>
      </Box>
    </ActivityCardBase>
  )
}
