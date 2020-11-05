import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import StyleGuide from "../components/StyleGuide";
import { MenuItem } from "./MenuItem";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

// export const CalculateMenuHeight = (itemLength: number) =>
//   (StyleGuide.spacing * 2 * 2 + StyleGuide.typography.callout.lineHeight) *
//   itemLength;
export const CalculateMenuHeight = (itemLength: number) => 240;

export interface MenuProps {
  toggle: boolean;
  rtl: boolean;
  itemHeight: number;
}

const MenuItems = [
  {
    id: 1,
    title: "Star",
    icon: "star",
  },
  {
    id: 2,
    title: "Answer",
    icon: "corner-up-left",
  },
  {
    id: 3,
    title: "Forward",
    icon: "corner-up-right",
  },
  {
    id: 4,
    title: "Copy",
    icon: "copy",
  },
  {
    id: 5,
    title: "Info",
    icon: "info",
  },
  {
    id: 6,
    title: "Delete",
    icon: "trash",
  },
];

export const Menu = ({ itemHeight, toggle, rtl }: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(MenuItems.length);
  const transition = useTiming(toggle, { duration: 200 });
  const leftOrRight = rtl ? { right: 0 } : { left: 0 };

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: (MENU_WIDTH / 2) * (rtl ? 1 : -1) },
        { translateY: (-1 * MenuHeight) / 2 },
        { scale: transition.value },
        { translateX: (MENU_WIDTH / 2) * (rtl ? -1 : 1) },
        { translateY: MenuHeight / 2 },
      ],
    };
  });

  return (
    <View
      style={[
        styles.wrapper,
        {
          ...leftOrRight,
          top: itemHeight + 8,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          { height: MenuHeight, ...leftOrRight },
          { ...style },
        ]}
      >
        {MenuItems.map((item, index) => {
          return <MenuItem key={index} item={item} />;
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: StyleGuide.dimensionWidth - StyleGuide.spacing * 4,
    zIndex: 10,
  },
  container: {
    position: "absolute",
    width: MENU_WIDTH,
    borderRadius: StyleGuide.spacing * 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.common.white,
    overflow: "hidden",
  },
});
