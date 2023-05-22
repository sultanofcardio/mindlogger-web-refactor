import classNames from "classnames"
import { Button } from "react-bootstrap"

import { ActivityListItem, ActivityStatus, useSupportableActivity } from "../lib"
import { MobileOnlyLabel } from "./MobileOnlyLabel"
import TimeStatusLabel from "./TimeStatusLabel"

import { Loader } from "~/shared/ui"
import "./style.scss"

interface ActivityCardProps {
  activity: ActivityListItem
  isPublic: boolean
  onActivityCardClick: () => void

  disabled?: boolean
}

export const ActivityCard = ({ activity, disabled, onActivityCardClick, isPublic }: ActivityCardProps) => {
  const { isSupportedActivity, isLoading } = useSupportableActivity({ activityId: activity.activityId, isPublic })

  const isDisabled = disabled || activity.status === ActivityStatus.Scheduled || !isSupportedActivity

  if (isLoading) {
    return (
      <Button className="ds-activity-button w-100" variant="link" disabled={isLoading}>
        <div className="activity-data">
          <Loader />
        </div>
      </Button>
    )
  }

  return (
    <Button
      className={classNames("ds-activity-button", "w-100")}
      variant="link"
      disabled={isDisabled}
      onClick={onActivityCardClick}>
      {activity.image && <img className="activity-image" src={activity.image} />}

      <div className="activity-data">
        <div
          className={classNames(
            "activity-name-date",
            { "activity-title-active": !isDisabled },
            { "activity-title-disabled": isDisabled },
          )}>
          {activity.name}
        </div>

        {activity.description && <div className="activity-description">{activity.description}</div>}

        {isSupportedActivity && <TimeStatusLabel activity={activity} />}

        {!isSupportedActivity && <MobileOnlyLabel />}
      </div>
    </Button>
  )
}
