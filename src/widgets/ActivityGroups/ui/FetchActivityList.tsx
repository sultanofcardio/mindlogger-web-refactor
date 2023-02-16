import classNames from "classnames"
import { Container, Spinner } from "react-bootstrap"

import { useAppletByIdQuery } from "../api"
import { ActivityGroupList } from "./ActivityList"

interface FetchActivityListProps {
  appletId: string
}

export const FetchActivityList = ({ appletId }: FetchActivityListProps) => {
  const { isError, isLoading, data } = useAppletByIdQuery(appletId)

  if (isLoading) {
    return (
      <Container className={classNames("d-flex", "h-100", "w-100", "justify-content-center", "align-items-center")}>
        <Spinner as="div" animation="border" role="status" aria-hidden="true" />
      </Container>
    )
  }

  if (isError) {
    return (
      <Container className={classNames("d-flex", "h-100", "w-100", "justify-content-center", "align-items-center")}>
        <span>
          You have reached this URL in error. Please reach out to the organizer of this applet for further assistance.
        </span>
      </Container>
    )
  }

  return <ActivityGroupList appletDetails={data?.data?.result} />
}
