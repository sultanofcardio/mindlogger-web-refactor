import { BannerType, actions } from '..';

import { BannerProps } from '~/shared/ui/Banners/Banner';
import { useAppDispatch } from '~/shared/utils';

// Convenience type for adding banners using just a string, as well as a full BannerProps object.
// Supports null as well to accommodate t() return type.
type BannerContent = string | null | BannerProps;

export const useBanners = () => {
  const dispatch = useAppDispatch();

  /** Displays a banner having the given key, and content text or BannerProps */
  const addBanner = (key: BannerType, banner: BannerContent) => {
    const bannerProps =
      banner === null || typeof banner === 'string' ? { children: banner } : banner;

    dispatch(actions.addBanner({ key, bannerProps }));
  };

  /** Shorthand function for adding a success banner */
  const addSuccessBanner = (banner: BannerContent) => {
    addBanner('SuccessBanner', banner);
  };

  /** Shorthand function for adding an error banner */
  const addErrorBanner = (banner: BannerContent) => {
    addBanner('ErrorBanner', banner);
  };

  /** Shorthand function for adding a warning banner */
  const addWarningBanner = (banner: BannerContent) => {
    addBanner('WarningBanner', banner);
  };

  /** Shorthand function for adding an info banner */
  const addInfoBanner = (banner: BannerContent) => {
    addBanner('InfoBanner', banner);
  };

  const removeBanner = (key: BannerType) => {
    dispatch(actions.removeBanner({ key }));
  };

  const removeSuccessBanner = () => {
    removeBanner('SuccessBanner');
  };

  const removeErrorBanner = () => {
    removeBanner('ErrorBanner');
  };

  const removeWarningBanner = () => {
    removeBanner('WarningBanner');
  };

  const removeInfoBanner = () => {
    removeBanner('InfoBanner');
  };

  const removeAllBanners = () => {
    dispatch(actions.removeAllBanners());
  };

  return {
    addBanner,
    addSuccessBanner,
    addErrorBanner,
    addWarningBanner,
    addInfoBanner,
    removeBanner,
    removeSuccessBanner,
    removeErrorBanner,
    removeWarningBanner,
    removeInfoBanner,
    removeAllBanners,
  };
};
