import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading(props) {
  const h = props?.h || 25;
  const w = props?.w || 25;
  const position = props?.position || "absolute";
  const color = props?.color || "var(--color-2)";
  const bgColor = props?.bgColor || "";
  const bgFilter = props?.bgFilter || "";

  return (
    <>
      <span style={{ color: "transparent" }}>Loading</span>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: position,
          top: 0,
          left: 0,
          background: bgColor,
          backdropFilter: bgFilter,
          borderRadius: "inherit",
          zIndex: 9999,
        }}
      >
        <CircularProgress
          style={{ color: color, height: h + "px", width: w + "px" }}
        />
      </Box>
    </>
  );
}
