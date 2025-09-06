import { Platform, StyleSheet } from "react-native";
import { COLORS } from "./colors";

/** Type scale tuned for mobile readability (roughly Material/HIG) */
export const typography = {
  h1: { fontSize: 32, lineHeight: 38, fontWeight: "700", color: COLORS.text }, // page titles
  h2: { fontSize: 24, lineHeight: 30, fontWeight: "700", color: COLORS.text }, // section titles
  h3: { fontSize: 20, lineHeight: 26, fontWeight: "600", color: COLORS.text },
  body: { fontSize: 16, lineHeight: 22, fontWeight: "400", color: COLORS.text },
  label: { fontSize: 14, lineHeight: 18, fontWeight: "500", color: COLORS.text },
  small: { fontSize: 12, lineHeight: 16, color: COLORS.textMuted },
};

export const spacing = (n:number) => 4 * n; // 4px grid (8/12 works too)

/** Reusable screen + form styles */
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, padding: spacing(5) },
  centeredStack: { gap: spacing(3), alignItems: "stretch" },
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
  },

  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: spacing(3),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing(2),
    ...Platform.select({ ios: { shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width:0, height:4 } }, android: { elevation: 3 } }),
  },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  linkBtn: { marginTop: spacing(2), alignItems: "center" },
  link: { color: COLORS.secondary, fontWeight: "600" },
});
