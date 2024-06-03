import { useEffect } from 'react';

import { appletModel } from '~/entities/applet';
import { TakeNowParams } from '~/features/TakeNow/lib/TakeNowParams.types';
import { useTakeNowValidation } from '~/features/TakeNow/lib/useTakeNowValidation';
import { useNotification } from '~/shared/ui';
import Loader from '~/shared/ui/Loader';
import { ActivityGroups } from '~/widgets/ActivityGroups';

function ValidateTakeNowParams({
  appletId,
  targetSubjectId,
  sourceSubjectId,
  startActivityOrFlow,
  respondentId,
}: TakeNowParams) {
  const { showErrorNotification } = useNotification();
  const { initiateTakeNow, isInMultiInformantFlow, getMultiInformantState } =
    appletModel.hooks.useMultiInformantState();

  const { isError, isLoading, isSuccess, error, data } = useTakeNowValidation({
    appletId,
    targetSubjectId,
    sourceSubjectId,
    startActivityOrFlow,
    respondentId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { currentUserSubject, sourceSubject, targetSubject } = data;

      const multiInformantState = getMultiInformantState();
      if (
        !isInMultiInformantFlow() ||
        currentUserSubject.id !== multiInformantState?.currentUserSubject?.id ||
        sourceSubject.id !== multiInformantState?.sourceSubject?.id ||
        targetSubject.id !== multiInformantState?.targetSubject?.id
      ) {
        initiateTakeNow({ currentUserSubject, sourceSubject, targetSubject });
      }
    }
  }, [data, initiateTakeNow, isInMultiInformantFlow, isSuccess]);

  useEffect(() => {
    if (error) {
      showErrorNotification(error, {
        allowDuplicate: false,
        duration: 15000,
      });
    }
  }, [error, showErrorNotification]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    // If there's no error message, then we fall back to the ActivityGroups error handling
    return <ActivityGroups isPublic={false} appletId={appletId} />;
  }

  if (isSuccess) {
    return (
      <ActivityGroups
        isPublic={false}
        appletId={appletId}
        startActivityOrFlow={startActivityOrFlow}
      />
    );
  }

  return null;
}

export default ValidateTakeNowParams;
