import { useCallback, useEffect } from 'react';

import { ActivityPipelineType } from '~/abstract/lib';
import { appletModel } from '~/entities/applet';
import { CompletedEntitiesDTO, CompletedEntityDTO } from '~/shared/api';

type FilterCompletedEntitiesProps = {
  completedEntities: CompletedEntitiesDTO | undefined;
};

export const useEntitiesSync = (props: FilterCompletedEntitiesProps) => {
  const { saveGroupProgress, getGroupProgress } = appletModel.hooks.useGroupProgressStateManager();

  const syncEntity = useCallback(
    (entity: CompletedEntityDTO) => {
      const hoursMinutes = entity.localEndTime.split(':');
      const endAtDate = new Date(entity.localEndDate).setHours(
        Number(hoursMinutes[0]),
        Number(hoursMinutes[1]),
      );

      const entityId = entity.id;
      const eventId = entity.scheduledEventId;
      const targetSubjectId = entity.targetSubjectId;

      const groupProgress = getGroupProgress({
        entityId,
        eventId,
        targetSubjectId,
      });

      if (!groupProgress) {
        return saveGroupProgress({
          activityId: entityId,
          eventId,
          targetSubjectId,
          progressPayload: {
            type: ActivityPipelineType.Regular,
            startAt: null,
            endAt: new Date(endAtDate).getTime(),
            context: {
              summaryData: {},
            },
          },
        });
      }

      if (groupProgress.endAt) {
        const isServerEndAtBigger = endAtDate > new Date(groupProgress.endAt).getTime();

        if (!isServerEndAtBigger) {
          return;
        }

        return saveGroupProgress({
          activityId: entityId,
          eventId,
          targetSubjectId,
          progressPayload: {
            ...groupProgress,
            endAt: new Date(endAtDate).getTime(),
          },
        });
      }
    },
    [getGroupProgress, saveGroupProgress],
  );

  useEffect(() => {
    if (!props.completedEntities) {
      return;
    }

    const completedEntities = [
      ...props.completedEntities.activities,
      ...props.completedEntities.activityFlows,
    ];

    completedEntities.forEach(syncEntity);
  }, [props.completedEntities, syncEntity]);
};
