const UserLogo = ({ name, size, marginRight, background, color }) => {
  const arr = (name || "").split(" ");
  const style = {
    background: background || "var(--color-2)",
    color: color || "var(--color-5)",
    display: "inline-flex",
    height: size || 40,
    width: size || 40,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size ? size / 2 : 20,
    letterSpacing: 0.2,
    marginRight: marginRight || 10,
    cursor: "default",
  };

  return (
    <div style={style}>
      {arr[0][0]}
      {arr[1] && arr[1][0]}
    </div>
  );
};

export default UserLogo;
