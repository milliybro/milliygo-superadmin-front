import { ThemeConfig, theme } from 'antd'
import { colors } from '../config/colors'

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    fontFamily: 'Onest, Arimo',
    fontSize: 16,
    colorText: colors.primary_dark,
    colorPrimary: colors.primary,

    colorBorder: colors.border,
    colorBorderSecondary: colors.border,

    fontSizeLG: 15,
    colorTextPlaceholder: colors.secondary,
    controlHeight: 38,
    controlHeightLG: 47,

    boxShadowSecondary: `0 0 0 1px ${colors.border}`,
  },
  components: {
    Steps: {
      iconSize: 28,
      iconFontSize: 12,
      titleLineHeight: 28,
      fontSizeLG: 16,
      //   icon: colors.primary,
    },
    Card: {
      borderRadiusLG: 16,
      headerFontSize: 18,
      fontWeightStrong: 500,
      headerHeight: 71,
      actionsLiMargin: '24px',
    },
    Button: {
      dangerShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      colorPrimary: colors.primary,

      borderRadius: 8,
      contentLineHeight: 1.2, // 19px
      fontSize: 15,
    },
    Input: {
      controlHeight: 38,
      borderRadius: 8,
      fontSize: 15,
      colorTextPlaceholder: colors.secondary,
    },
    DatePicker: {
      borderRadius: 8,
      fontSize: 15,
      colorTextPlaceholder: colors.secondary,
      borderRadiusSM: 200,
      // cellHeight: 35,
      // cellWidth: 35,
    },
    Select: {
      borderRadius: 8,
      fontSize: 15,
      optionSelectedBg: colors.secondary_light,
      optionSelectedFontWeight: 'inherit',
      optionFontSize: 14,
      boxShadow: '0px 1px 2px 0px #0000000D',
    },
    Tag: {
      fontWeightStrong: 500,
      lineHeightSM: 2.12,
      fontSizeSM: 12,
      borderRadiusSM: 8,
    },
    Avatar: {
      borderRadius: 8,
    },
    Divider: { colorSplit: colors.border },
    Breadcrumb: {
      iconFontSize: 12,
      itemColor: colors.primary_dark,
      lastItemColor: colors.secondary,
      separatorMargin: 16,
    },
    Table: {
      headerBorderRadius: 0,
      headerColor: colors.secondary,
      headerBg: 'white',
      cellFontSize: 14,
    },
    Form: {
      labelColor: colors.primary_dark,
      labelFontSize: 14,
      verticalLabelPadding: '0 0 5px',
      itemMarginBottom: 0,
    },
    Pagination: {
      itemActiveBg: colors.border,
      itemSize: 38,
      borderRadius: 8,
      colorPrimary: colors.secondary,
      colorPrimaryHover: colors.secondary,
    },
    Modal: {
      borderRadiusLG: 16,
      colorIcon: 'white',
      colorIconHover: 'white',
      borderRadiusSM: 8,
      boxShadow: '0px 8px 5px 0px #00000014, 0px 20px 13px 0px #00000008',
    },
    Notification: {
      boxShadow: `0 0 0 1px ${colors.border}`,
      borderRadiusLG: 12,
      paddingMD: 20,
    },
    Tabs: {
      titleFontSize: 14,
      horizontalMargin: '0 0 24px 0',
      horizontalItemPadding: '12px 24px',
      horizontalItemGutter: 0,
    },
    Switch: {
      handleSize: 24,
      trackHeight: 28.2,
      trackMinWidth: 50,
      handleShadow: '0px 1px 1px 0px #0000000F, 0px 1px 2px 0px #0000001A',
      colorTextQuaternary: 'red',
      colorTextTertiary: '#F3F4F6',
    },
    Drawer: {
      footerPaddingBlock: 16,
    },
    Collapse: {
      headerPadding: '24px 24px',
      borderRadiusLG: 0,
    },
  },
}

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontFamily: 'Onest, Arimo',
    fontSize: 16,
    colorText: 'white',
    colorPrimary: colors.primary,

    colorBgContainer: colors.primary_dark,
    colorBgElevated: colors.darkBg,

    colorBorder: colors.secondary_dark,

    colorBorderSecondary: colors.secondary_dark,

    fontSizeLG: 15,
    colorTextPlaceholder: colors.secondary,
    controlHeight: 38,
    controlHeightLG: 47,

    boxShadowSecondary: `0 0 0 1px ${colors.secondary_dark}`,
  },
  components: {
    Steps: {
      iconSize: 28,
      iconFontSize: 12,
      titleLineHeight: 28,
      fontSizeLG: 16,
      //   finishIconBorderColor: colors.primary,
    },
    Card: {
      borderRadiusLG: 16,
      headerFontSize: 18,
      fontWeightStrong: 500,
      headerHeight: 71,
      actionsLiMargin: '24px',
      colorBgContainer: colors.primary_dark,
    },
    Button: {
      dangerShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      colorPrimary: colors.primary,

      borderRadius: 8,
      contentLineHeight: 1.2, // 19px
      fontSize: 15,
    },
    Input: {
      controlHeight: 38,
      borderRadius: 8,
      fontSize: 15,
      colorTextPlaceholder: colors.secondary,
      colorBgContainer: colors.darkBg,
    },
    DatePicker: {
      borderRadius: 8,
      fontSize: 15,
      borderRadiusSM: 200,
      colorBgContainer: colors.darkBg,
      colorTextPlaceholder: colors.secondary,
      cellActiveWithRangeBg: colors.secondary_dark,
      colorIcon: colors.secondary_dark,

      // cellHeight: 35,
      // cellWidth: 35,
    },
    Select: {
      borderRadius: 8,
      fontSize: 15,
      optionSelectedBg: colors.primary_dark,
      optionSelectedFontWeight: 'inherit',
      optionFontSize: 14,
      boxShadow: '0px 1px 2px 0px #0000000D',
      colorBgContainer: colors.darkBg,
      optionActiveBg: colors.primary_dark,
    },
    Tag: {
      fontWeightStrong: 500,
      lineHeightSM: 2.12,
      fontSizeSM: 12,
      borderRadiusSM: 8,
    },
    Avatar: {
      borderRadius: 8,
    },
    Divider: { colorSplit: colors.secondary_dark },
    Breadcrumb: {
      iconFontSize: 12,
      itemColor: colors.secondary_dark,
      lastItemColor: colors.secondary,
      separatorMargin: 16,
    },
    Table: {
      headerBorderRadius: 0,
      headerColor: colors.secondary,
      // headerBg: 'white',
      cellFontSize: 14,
    },
    Form: {
      labelColor: colors.secondary,
      labelFontSize: 14,
      verticalLabelPadding: '0 0 5px',
      itemMarginBottom: 0,
    },
    Pagination: {
      itemActiveBg: colors.secondary_dark,
      itemSize: 38,
      borderRadius: 8,
      colorPrimary: colors.secondary,
      colorPrimaryHover: colors.secondary,
    },
    Modal: {
      borderRadiusLG: 16,
      colorIcon: 'white',
      colorIconHover: 'white',
      borderRadiusSM: 8,
      boxShadow: '0px 8px 5px 0px #00000014, 0px 20px 13px 0px #00000008',
      contentBg: colors.primary_dark,
    },
    Notification: {
      boxShadow: `0 0 0 1px ${colors.border}`,
      borderRadiusLG: 12,
      paddingMD: 20,
    },
    Tabs: {
      titleFontSize: 14,
      horizontalMargin: '0 0 24px 0',
      horizontalItemPadding: '12px 24px',
      horizontalItemGutter: 0,
    },
    Switch: {
      handleSize: 24,
      trackHeight: 28.2,
      trackMinWidth: 50,
      handleShadow: '0px 1px 1px 0px #0000000F, 0px 1px 2px 0px #0000001A',
      colorTextQuaternary: 'red',
      colorTextTertiary: '#F3F4F6',
    },
    Drawer: {
      footerPaddingBlock: 16,
    },
    Collapse: {
      headerPadding: '24px 24px',
      borderRadiusLG: 0,
    },
  },
}
