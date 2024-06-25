import { TakeNowSuccessModalProps } from '../lib/types';

import { MuiModal } from '~/shared/ui';
import {
  Mixpanel,
  MixpanelEvents,
  MixpanelPayload,
  MixpanelProps,
  useCustomTranslation,
} from '~/shared/utils';

export const TakeNowSuccessModal = ({
  isOpen,
  onClose,
  appletId,
  multiInformantAssessmentId,
  activityId,
  activityFlowId,
}: TakeNowSuccessModalProps) => {
  const { t } = useCustomTranslation();

  const handleReturnToAdminAppClick = () => {
    const analyticsPayload: MixpanelPayload = {
      [MixpanelProps.AppletId]: appletId,
    };

    if (activityId) {
      analyticsPayload[MixpanelProps.ActivityId] = activityId;
    } else if (activityFlowId) {
      analyticsPayload[MixpanelProps.ActivityFlowId] = activityFlowId;
    }

    analyticsPayload[MixpanelProps.Feature] = 'Multi-informant';

    if (multiInformantAssessmentId) {
      analyticsPayload[MixpanelProps.MultiInformantAssessmentId] = multiInformantAssessmentId;
    }

    Mixpanel.track(
      MixpanelEvents.ReturnToAdminApp,
      analyticsPayload,
      { send_immediately: true },
      () => {
        onClose?.();
        window.close();
      },
    );
  };

  return (
    <MuiModal
      isOpen={isOpen}
      title={t('takeNow.successModalTitle')}
      label={t('takeNow.successModalLabel')}
      footerPrimaryButton={t('takeNow.successModalPrimaryAction')}
      onPrimaryButtonClick={handleReturnToAdminAppClick}
      footerSecondaryButton={t('takeNow.successModalSecondaryAction')}
      onSecondaryButtonClick={onClose}
      DialogProps={{
        disableEscapeKeyDown: true,
      }}
    />
  );
};
