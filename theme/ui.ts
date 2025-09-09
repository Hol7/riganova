import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "./colors";

/** Type scale tuned for mobile readability (roughly Material/HIG) */
export const typography = {
  h1: { fontSize: 32, lineHeight: 38, fontWeight: "700", color: COLORS.text } as TextStyle,
  h2: { fontSize: 24, lineHeight: 30, fontWeight: "700", color: COLORS.text } as TextStyle,
  h3: { fontSize: 20, lineHeight: 26, fontWeight: "600", color: COLORS.text } as TextStyle,
  body: { fontSize: 16, lineHeight: 22, fontWeight: "400", color: COLORS.text } as TextStyle,
  label: { fontSize: 14, lineHeight: 18, fontWeight: "500", color: COLORS.text } as TextStyle,
  small: { fontSize: 12, lineHeight: 16, color: COLORS.textMuted } as TextStyle,
};

export const spacing = (n:number) => 4 * n; // 4px grid (8/12 works too)

/** Reusable screen + form styles */
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: spacing(5),
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  
  centeredStack: { 
    gap: spacing(3), 
    alignItems: "stretch" 
  } as ViewStyle,
  
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  body: typography.body,

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(4),
    borderRadius: 12,
    marginBottom: spacing(3),
    fontSize: 16,
    color: COLORS.text,
    width: "100%",
    maxWidth: 400,
  },

  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: spacing(4),
    paddingHorizontal: spacing(6),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing(4),
    width: "100%",
    maxWidth: 400,
    minHeight: 50,
    ...Platform.select({ 
      ios: { 
        shadowColor: "#000", 
        shadowOpacity: 0.15, 
        shadowRadius: 8, 
        shadowOffset: { width: 0, height: 4 } 
      }, 
      android: { 
        elevation: 3 
      } 
    }),
  } as ViewStyle,
  
  primaryBtnText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 16 
  } as TextStyle,
  
  linkBtn: { 
    marginTop: spacing(3), 
    alignItems: "center",
    paddingVertical: spacing(2),
  } as ViewStyle,
  
  link: { 
    color: COLORS.secondary, 
    fontWeight: "600",
    fontSize: 16,
  } as TextStyle,
});

// Modern UI components for the new screens
export const UI = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  } as ViewStyle,
  
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  } as ViewStyle,
  
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.secondary,
  } as TextStyle,
  
  textLarge: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  } as TextStyle,
  
  textMedium: {
    fontSize: 16,
    color: COLORS.text,
  } as TextStyle,
  
  textSmall: {
    fontSize: 14,
    color: COLORS.textMuted,
  } as TextStyle,
  
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
    }),
  } as ViewStyle,
});
